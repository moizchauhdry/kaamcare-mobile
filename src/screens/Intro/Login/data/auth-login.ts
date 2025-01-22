import { useMutation } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { useToast } from 'hooks/useToast';
import { handleError } from 'utils/helpers';
import { http } from 'services/http/ApiServices';
import { validatedApi } from 'services/api-request';
import { useSignupStore } from 'screens/Intro/Signup/store';
import type { ILoginRequest } from 'services/api-request/request-types';
import type { ILoginResponse } from 'services/api-request/response-types';
import type { AuthNavigationParamsList } from 'components/Navigation/AuthNavigation';

export const useAuthLogin = () => {
  const { showToast } = useToast();
  const setIsLogged = useSignupStore((store) => store.setIsLogged);
  const navigation = useNavigation<StackNavigationProp<AuthNavigationParamsList>>();

  return useMutation({
    mutationFn: (variables: ILoginRequest) => validatedApi.post<ILoginResponse>('/user/login', variables),
    onSuccess: (response) => {
      // eslint-disable-next-line eqeqeq
      if (response.data.data?.user?.is_verified == 1) {
        SecureStore.setItem('id-token', response.data.data?.user?.token ?? '');
        SecureStore.setItem('refresh-token', response.data.data?.user?.token ?? '');
        http.addHeader('Authorization', `Bearer ${response.data.data?.user?.token ?? ''}`);
        SecureStore.setItem('user-email', response.data.data?.user?.email ?? '');
        setIsLogged(true);
      } else {
        showToast({
          text1: response.data?.message,
        });
        navigation.navigate('SignUp');
      }
    },
    onError: (error: unknown) => {
      handleError(error);
    },
  });
};
