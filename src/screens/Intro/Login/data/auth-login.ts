import { Alert } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { handleError } from 'utils/helpers';
import { http } from 'services/http/ApiServices';
import { validatedApi } from 'services/api-request';
import { useSignupStore } from 'screens/Intro/Signup/store';
import type { ILoginRequest } from 'services/api-request/request-types';
import type { ILoginResponse } from 'services/api-request/response-types';
import { useAuthResendOtp } from 'screens/Intro/Signup/data/auth-resendOtp';
import type { AuthNavigationParamsList } from 'components/Navigation/AuthNavigation';

export const useAuthLogin = () => {
  const setIsLogged = useSignupStore((store) => store.setIsLogged);
  const { mutate: authResendOtp } = useAuthResendOtp();
  const navigation = useNavigation<StackNavigationProp<AuthNavigationParamsList>>();

  return useMutation({
    mutationFn: (variables: ILoginRequest) => validatedApi.post<ILoginResponse>('/user/login', variables),
    onSuccess: (response) => {
      // eslint-disable-next-line eqeqeq
      if (response.data.data?.user?.is_verified == 1) {
        SecureStore.setItem('id-token', response.data.data?.user?.token ?? '');
        SecureStore.setItem('refresh-token', response.data.data?.user?.token ?? '');
        http.addHeader('Authorization', `Bearer ${response.data.data?.user?.token ?? ''}`);
        setIsLogged(true);
      } else {
        Alert.alert(
          'Account Unverified',
          'Please complete your profile first in order to login.',
          [
            {
              text: 'Continue',
              onPress: () => {
                authResendOtp();
                SecureStore.setItem('id-token', response.data.data?.user?.token ?? '');
                navigation.navigate('Verify');
              },
            },
            { text: 'Cancel', style: 'cancel' },
          ],
          { cancelable: false },
        );
      }
    },
    onError: (error: unknown) => {
      handleError(error);
    },
  });
};
