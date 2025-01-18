import { useMutation } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { handleError } from 'utils/helpers';
import { http } from 'services/http/ApiServices';
import { validatedApi } from 'services/api-request';
import type { ISignupRequest } from 'services/api-request/request-types';
import type { ISignupResponse } from 'services/api-request/response-types';
import type { AuthNavigationParamsList } from 'components/Navigation/AuthNavigation';

import { useSignupStore } from '../store';

export const useAuthSignup = (screenOrigin?: string) => {
  const setIsLogged = useSignupStore((store) => store.setIsLogged);
  const setUserEmail = useSignupStore((store) => store.setUserEmail);
  const navigation = useNavigation<StackNavigationProp<AuthNavigationParamsList>>();

  return useMutation({
    mutationFn: (variables: ISignupRequest) => validatedApi.post<ISignupResponse>('/user/register', variables),
    onSuccess: (response) => {
      setUserEmail(response.data.data?.email);
      if (screenOrigin === 'socialLogin') {
        SecureStore.setItem('id-token', response.data.data?.user?.token ?? '');
        SecureStore.setItem('refresh-token', response.data.data?.user?.token ?? '');
        SecureStore.setItem('user-email', response.data.data?.user?.email ?? '');
        http.addHeader('Authorization', `Bearer ${response.data.data?.user?.token}`);
        setIsLogged(true);
      } else {
        navigation.navigate('Verify');
      }
    },
    onError: (error: unknown) => {
      handleError(error);
    },
  });
};
