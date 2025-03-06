import { useMutation } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { handleError } from 'utils/helpers';
import { validatedApi } from 'services/api-request';
import type { ISignupRequest } from 'services/api-request/request-types';
import type { ISignupResponse } from 'services/api-request/response-types';
import type { AuthNavigationParamsList } from 'components/Navigation/AuthNavigation';

import { useSignupStore } from '../store';

export const useAuthSignup = (screenOrigin?: string) => {
  const setUserEmail = useSignupStore((store) => store.setUserEmail);
  const navigation = useNavigation<StackNavigationProp<AuthNavigationParamsList>>();
  const setIsLogged = useSignupStore((store) => store.setIsLogged);

  return useMutation({
    mutationFn: (variables: ISignupRequest) => validatedApi.post<ISignupResponse>('/user/register', variables),
    onSuccess: (response) => {
      if (screenOrigin === 'socialLogin') {
        SecureStore.setItem('id-token', response.data.data?.user?.token ?? '');
        SecureStore.setItem('refresh-token', response.data.data?.user?.token ?? '');
        if (response.data.data?.email) {
          setUserEmail(response.data.data?.email);
        } else {
          setUserEmail(response.data.data.user?.email);
        }
        setIsLogged(true);
      } else {
        SecureStore.setItem('id-token', response.data.data?.token ?? '');
        navigation.navigate('Verify');
      }
    },
    onError: (error: unknown) => {
      handleError(error);
    },
  });
};
