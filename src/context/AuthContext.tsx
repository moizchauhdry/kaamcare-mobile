import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { dismiss, makeRedirectUri, Prompt, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import { useQueryClient } from '@tanstack/react-query';
import { Platform } from 'react-native';

import { http } from '../services/http/ApiServices';
import { AuthService } from '../services/AuthService';

type TokenResponse = {
  id_token: string;
  id_token_expires_in: number;
  not_before: number;
  profile_info: string;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
  token_type: string;
};

type ParsedToken = {
  idToken: string;
  expiresIn: number;
  expiresOn: number;
  refreshTokenExpiresOn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
};

type AuthContextState = {
  isLogged: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
  handleDeleteAccount: () => void;
  handlePasswordReset: () => void;
  handleRegister: () => void;
};

export const AuthContext = createContext<AuthContextState>({
  isLogged: false,
  handleLogin: () => {},
  handleLogout: () => {},
  handleDeleteAccount: () => {},
  handlePasswordReset: () => {},
  handleRegister: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isLogged, setIsLogged] = useState(false);
  const queryClient = useQueryClient();
  const b2cName = process.env.EXPO_PUBLIC_B2C_NAME as string;

  const discoverySignIn = useAutoDiscovery(
    `https://${b2cName}.b2clogin.com/${b2cName}.onmicrosoft.com/B2C_1_SignUpSignIn/v2.0/`,
  );
  const discoverySignUp = useAutoDiscovery(
    `https://${b2cName}.b2clogin.com/${b2cName}.onmicrosoft.com/B2C_1_SignUp/v2.0/`,
  );
  const discoveryPasswordReset = useAutoDiscovery(
    `https://${b2cName}.b2clogin.com/${b2cName}.onmicrosoft.com/B2C_1_PasswordReset/v2.0/`,
  );
  const clientId = process.env.EXPO_PUBLIC_CLIENT_ID as string;

  const redirectUri = makeRedirectUri({
    scheme: 'kaamcare',
  });

  const [loginRequest, loginResponse, promptLoginAsync] = useAuthRequest(
    {
      codeChallenge: undefined,
      codeChallengeMethod: undefined,
      usePKCE: false,
      state: undefined,
      responseType: 'code',
      prompt: Prompt.Login,
      clientId,
      scopes: ['openid', 'offline_access', `https://${b2cName}.onmicrosoft.com/${clientId}`],
      redirectUri: 'kaamcare://auth',
      extraParams: {
        p: 'B2C_1_SignUpSignIn',
      },
    },
    discoverySignIn,
  );
  // eslint-disable-next-line
  const [passwordRequest, _passwordResponse, promptPasswordAsync] = useAuthRequest(
    {
      responseType: 'code',
      clientId,
      prompt: Prompt.Login,
      scopes: ['openid', 'offline_access', clientId],
      redirectUri: 'kaamcare://auth',
      extraParams: {
        p: 'B2C_1_PasswordReset',
      },
    },
    discoveryPasswordReset,
  );
  // eslint-disable-next-line
  const [registerRequest, _registerResponse, promptRegisterAsync] = useAuthRequest(
    {
      responseType: 'code',
      clientId,
      prompt: Prompt.Login,
      scopes: ['openid', 'offline_access', clientId],
      redirectUri: 'kaamcare://auth',
      extraParams: {
        p: 'B2C_1_SignUp',
      },
    },
    discoverySignUp,
  );

  const handleRefreshToken = async () => {
    const refreshToken = SecureStore.getItem('refresh-token');
    const refreshTokenExpiresOn = SecureStore.getItem('refresh-token-expires-on');
    const b2cType = SecureStore.getItem('b2c_type');

    if (refreshToken && refreshTokenExpiresOn && b2cType) {
      if (AuthService.isTokenValid(parseInt(refreshTokenExpiresOn, 10))) {
        const data = await AuthService.getNewToken(b2cName, b2cType, refreshToken, clientId, handleLogout);
        const parsedData = parseTokenResponse(data);
        SecureStore.setItem('id-token', parsedData.idToken ?? '');
        SecureStore.setItem('refresh-token', parsedData.refreshToken ?? '');
        SecureStore.setItem('expires-on', parsedData.expiresOn.toString());
        SecureStore.setItem('refresh-token-expires-on', parsedData.refreshTokenExpiresOn.toString());
        SecureStore.setItem('b2c_type', b2cType ?? '');
        http.addHeader('Authorization', `Bearer ${parsedData.idToken}`);
        setIsLogged(true);
      }
    } else {
      handleLogout();
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = SecureStore.getItem('id-token');
      const expiresOn = SecureStore.getItem('expires-on');

      if (token && expiresOn) {
        if (AuthService.isTokenValid(parseInt(expiresOn, 10))) {
          setIsLogged(true);
          http.addHeader('Authorization', `Bearer ${token}`);
        } else {
          await handleRefreshToken();
        }
      } else {
        handleLogout();
      }
    };

    http.extend({
      hooks: {
        afterResponse: [
          async (_, __, response) => {
            if (response.status === 401 || response.status === 403) {
              await checkToken();
            }
          },
        ],
      },
    });

    checkToken();

    /* eslint-disable-next-line */
  }, []);

  const getTokenFormData = (code: string, codeVerifier?: string) => {
    const formData = new FormData();
    formData.append('grant_type', 'authorization_code');
    formData.append('client_id', clientId);
    formData.append('redirect_uri', redirectUri);
    formData.append('code', code);

    if (codeVerifier) {
      formData.append('code_verifier', codeVerifier);
    }

    return formData;
  };

  const parseTokenResponse = (tokenResponse: TokenResponse): ParsedToken => ({
    expiresIn: tokenResponse.id_token_expires_in,
    refreshToken: tokenResponse.refresh_token,
    idToken: tokenResponse.id_token,
    refreshTokenExpiresIn: tokenResponse.refresh_token_expires_in,
    expiresOn: tokenResponse.not_before + tokenResponse.id_token_expires_in,
    refreshTokenExpiresOn: tokenResponse.not_before + tokenResponse.refresh_token_expires_in,
  });

  const handleLogin = async () => {
    SecureStore.setItem(
      'id-token',
      'eyJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3MzY2ODA0MjQsIm5iZiI6MTczNjU5NDAyNCwidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9rYWFtY2FyZXByb2QuYjJjbG9naW4uY29tLzAzMDJiNzMyLTE1OWMtNDIyNy1iNTZkLTY3ZDdlZDQyM2Y5My92Mi4wLyIsInN1YiI6IjBhZWFhNTVkLTI2NWYtNDU0OC1hYzU5LTg2Yjk4ZTUzZTJmYiIsImF1ZCI6IjQ2OWJmYjI0LWMzMDMtNGNjMy1hOGVkLWU3OGZhYTc2NDBlMiIsImlhdCI6MTczNjU5NDAyNCwiYXV0aF90aW1lIjoxNzM2NTk0MDIzLCJvaWQiOiIwYWVhYTU1ZC0yNjVmLTQ1NDgtYWM1OS04NmI5OGU1M2UyZmIiLCJlbWFpbHMiOlsiWmFpbi5haG1hZEBuZXh0YnJpZGdlc3lzdGVtLmNvbSJdLCJ0ZnAiOiJCMkNfMV9TaWduVXBTaWduSW4ifQ.ZN_RChEh4WNjGygOSumP-_A9459rmjph-BjI5wNM5Pfds0T8lGgSYwRJnJbjztAOlMPPbOn7bf6zDAiz5MI7ppcGfRMxzofRaiBZ8y2J52kV7diwf7BtThicF1QGbwqjpSZmvn-htkqTBPVmI0Eu06rXQi64NjQa3vE3zip-xpyOF9EZ9P09d8O7uqkt-1dhE16ya-AyWHptIYfqdP28Al4e2EmDqAND7IGAPlz3e2Ea4PvLyE7sHY1NQsHChf5wnhNA9ae_NNPXUDRR8n71DgjiES5zN3gtw3XKu6vQUhgeTlQzhgATZx_W-sFyysKc26SkqzxcMPOMm6e_t0iWhg',
    );
    SecureStore.setItem(
      'refresh-token',
      'eyJraWQiOiJjcGltY29yZV8wOTI1MjAxNSIsInZlciI6IjEuMCIsInppcCI6IkRlZmxhdGUiLCJzZXIiOiIxLjAifQ..5P6UIm_KDFJdlFom.247xseSuCFitNi2SzSKln0Bbpi9sJf5LZPTKlpH_1yVGzWFmCtBpeQl5HpB_2rnjOnqBzn9MsoDuz_W0tzO-cS0YZH-5pwxIS0aVJzNvz5bwgl-hn03WZKYLhHy6IZ68CTiXXDhBUC5TeB_eNFSNqaTXUna9UpjHhqHh7EF6foW-ss9mv__5JYoa2b5QZA59_DncWKMhuvhdglqmrw4ARHWnO_AJcGCA5-MI2WM5cSP3TfT-dS2OKRyXSntJ5cC1JvqQMtZDxPdv2N2PAiiKqlCZhD4CNqADerCUVCaiFO1cM-Dj7bJJ1e83w9MSYOsa0ztWCEe9I2_kVBFQnsR48FpqWFhO01GMfgPld948_ySTUrKJVMnJZEj5qj536m7oh-mtn1R7whEBoMKinW0azoYt3U1DoZ2rMYzNL3wHSyApNsn2J67JpuS9RxcHhNUO2QWCGA0gEj5zh3qp1m4nxcA9iJF4QSpfffoBspUiGlmSzKUsWM2RFIbuJfbpPuzwP0M9QY5f6EnrPXxrkfOt3BTgBL7-O2Q4yuc6qvXzL_XnzKyoxLI24yAfhHlADGL4Q0gAwA.u5BeZVxOroIWxgU8a2Ipog',
    );
    SecureStore.setItem('expires-on', '1736680424');
    SecureStore.setItem('refresh-token-expires-on', '1737803624');
    SecureStore.setItem('b2c_type', 'b2c_1_signupsignin');
    http.addHeader(
      'Authorization',
      `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ilg1ZVhrNHh5b2pORnVtMWtsMll0djhkbE5QNC1jNTdkTzZRR1RWQndhTmsiLCJ0eXAiOiJKV1QifQ.eyJleHAiOjE3MzY2Nzk1MjcsIm5iZiI6MTczNjU5MzEyNywidmVyIjoiMS4wIiwiaXNzIjoiaHR0cHM6Ly9rYWFtY2FyZXByb2QuYjJjbG9naW4uY29tLzAzMDJiNzMyLTE1OWMtNDIyNy1iNTZkLTY3ZDdlZDQyM2Y5My92Mi4wLyIsInN1YiI6IjBhZWFhNTVkLTI2NWYtNDU0OC1hYzU5LTg2Yjk4ZTUzZTJmYiIsImF1ZCI6IjQ2OWJmYjI0LWMzMDMtNGNjMy1hOGVkLWU3OGZhYTc2NDBlMiIsImlhdCI6MTczNjU5MzEyNywiYXV0aF90aW1lIjoxNzM2NTkzMTI1LCJvaWQiOiIwYWVhYTU1ZC0yNjVmLTQ1NDgtYWM1OS04NmI5OGU1M2UyZmIiLCJlbWFpbHMiOlsiWmFpbi5haG1hZEBuZXh0YnJpZGdlc3lzdGVtLmNvbSJdLCJ0ZnAiOiJCMkNfMV9TaWduVXBTaWduSW4ifQ.bJ3YePMRRV5rIuSV0LJ1i3XxHwof79N9ARpnhl8ioK5bQi7n89eQd0KmeiA0Sn6xBPkrHew6oAJslH7TyzGOiOiISqk_AXB6qobkHtO1evgOXqDdvftup8dW6J727l-6QTNEsgf0mZi34hWCrHY7ZwMp7el5Ubsrp0KASRiMxhOids5Nz_Op0ftXU6hN755d70KnPVVFo_Qxdsq7TxsxcpBRyc5c6NzeUcuR_O7d59ZANGJB9ub7B-Ebc3lSoUIg_KdCijioOcWTtNbXt094VckV52cTxMDQNIdFL0NIbxJdyCOrKKCZsZF4_7JPuZEJqbVD7qLRIo0LCSnHhkIgqw`,
    );
    setIsLogged(true);

    // promptLoginAsync({ createTask: Platform.OS === 'ios' }).then((codeResponse) => {
    //   if (loginRequest && codeResponse?.type === 'success' && discoverySignIn && codeResponse.params.code) {
    //     fetch(discoverySignIn.tokenEndpoint!, {
    //       method: 'POST',
    //       body: getTokenFormData(codeResponse.params.code),
    //     }).then(async (res) => {
    //       const parsedData = parseTokenResponse(await res.json());
    //       console.log('parsedData', parsedData);
    //       SecureStore.setItem('id-token', parsedData.idToken ?? '');
    //       SecureStore.setItem('refresh-token', parsedData.refreshToken ?? '');
    //       SecureStore.setItem('expires-on', parsedData.expiresOn.toString());
    //       SecureStore.setItem('refresh-token-expires-on', parsedData.refreshTokenExpiresOn.toString());
    //       SecureStore.setItem('b2c_type', 'b2c_1_signupsignin');
    //       http.addHeader('Authorization', `Bearer ${parsedData.idToken}`);
    //       setIsLogged(true);
    //     });
    //   }
    // });
  };

  const handlePasswordReset = () => {
    promptPasswordAsync({ createTask: Platform.OS === 'ios' }).then((codeResponse) => {
      if (passwordRequest && codeResponse?.type === 'success' && discoveryPasswordReset && codeResponse.params.code) {
        if (Platform.OS === 'ios') {
          dismiss();
        }
        handleLogout();
        // fetch(discoveryPasswordReset.tokenEndpoint!, {
        //   method: 'POST',
        //   body: getTokenFormData(codeResponse.params.code),
        // }).then(async (res) => {
        //   const parsedData = parseTokenResponse(await res.json());
        //   SecureStore.setItem('id-token', parsedData.idToken ?? '');
        //   SecureStore.setItem('refresh-token', parsedData.refreshToken ?? '');
        //   SecureStore.setItem('expires-on', parsedData.expiresOn.toString());
        //   SecureStore.setItem('refresh-token-expires-on', parsedData.refreshTokenExpiresOn.toString());
        //   SecureStore.setItem('b2c_type', 'b2c_1_passwordreset');
        //   http.addHeader('Authorization', `Bearer ${parsedData.idToken}`);
        //   setIsLogged(true);
        // });
      }
    });
  };

  const handleRegister = () => {
    if (Platform.OS === 'ios') {
      dismiss();
    }

    promptRegisterAsync({ createTask: Platform.OS === 'ios' }).then((codeResponse) => {
      if (registerRequest && codeResponse?.type === 'success' && discoverySignUp && codeResponse.params.code) {
        fetch(discoverySignUp.tokenEndpoint!, {
          method: 'POST',
          body: getTokenFormData(codeResponse.params.code, registerRequest.codeVerifier),
        }).then(async (res) => {
          const parsedData = parseTokenResponse(await res.json());
          SecureStore.setItem('id-token', parsedData.idToken ?? '');
          SecureStore.setItem('refresh-token', parsedData.refreshToken ?? '');
          SecureStore.setItem('expires-on', parsedData.expiresOn.toString());
          SecureStore.setItem('refresh-token-expires-on', parsedData.refreshTokenExpiresOn.toString());
          SecureStore.setItem('b2c_type', 'b2c_1_signup');
          http.addHeader('Authorization', `Bearer ${parsedData.idToken}`);
          setIsLogged(true);
        });
      }
    });
  };

  const handleLogout = () => {
    const b2cType = SecureStore.getItem('b2c_type');
    fetch(
      `https://${b2cName}.b2clogin.com/${b2cName}.onmicrosoft.com/${b2cType ?? 'B2C_1_SignUpSignIn'}/oauth2/v2.0/logout`,
      {
        method: 'GET',
      },
    ).then(() => {
      SecureStore.deleteItemAsync('id-token');
      SecureStore.deleteItemAsync('refresh-token');
      SecureStore.deleteItemAsync('expires-on');
      SecureStore.deleteItemAsync('refresh-token-expires-on');
      SecureStore.deleteItemAsync('b2c_type');
      http.removeHeader('Authorization');
      queryClient.removeQueries();
      setIsLogged(false);

      if (loginResponse?.type === 'success' || _registerResponse?.type === 'success') {
        dismiss();
      }
    });
  };

  const handleDeleteAccount = () => {
    SecureStore.deleteItemAsync('refresh-token');
    SecureStore.deleteItemAsync('id-token');
    SecureStore.deleteItemAsync('expires-on');
    SecureStore.deleteItemAsync('refresh-token-expires-on');
    SecureStore.deleteItemAsync('b2c_type');
    http.removeHeader('Authorization');
    queryClient.removeQueries();
    setIsLogged(false);

    if (loginResponse?.type === 'success' || _registerResponse?.type === 'success') {
      if (Platform.OS === 'ios') {
        dismiss();
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        handleLogin,
        handleLogout,
        handleDeleteAccount,
        handlePasswordReset,
        handleRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('AuthContext must be used within a AuthProvider');
  }

  return context;
};
