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
    promptLoginAsync({ createTask: Platform.OS === 'ios' }).then((codeResponse) => {
      if (loginRequest && codeResponse?.type === 'success' && discoverySignIn && codeResponse.params.code) {
        fetch(discoverySignIn.tokenEndpoint!, {
          method: 'POST',
          body: getTokenFormData(codeResponse.params.code),
        }).then(async (res) => {
          const parsedData = parseTokenResponse(await res.json());
          SecureStore.setItem('id-token', parsedData.idToken ?? '');
          SecureStore.setItem('refresh-token', parsedData.refreshToken ?? '');
          SecureStore.setItem('expires-on', parsedData.expiresOn.toString());
          SecureStore.setItem('refresh-token-expires-on', parsedData.refreshTokenExpiresOn.toString());
          SecureStore.setItem('b2c_type', 'b2c_1_signupsignin');
          http.addHeader('Authorization', `Bearer ${parsedData.idToken}`);
          setIsLogged(true);
        });
      }
    });
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
