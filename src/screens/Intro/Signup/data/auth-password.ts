import { useMutation } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';

import { handleError } from 'utils/helpers';
import { http } from 'services/http/ApiServices';
import { validatedApi } from 'services/api-request';
import type { IPasswordRequest } from 'services/api-request/request-types';
import type { IPasswordResponse } from 'services/api-request/response-types';

import { useSignupStore } from '../store';

export const useAuthPassword = () => {
  const setIsLogged = useSignupStore((store) => store.setIsLogged);

  return useMutation({
    mutationFn: (variables: IPasswordRequest) => validatedApi.post<IPasswordResponse>('/user/add-password', variables),
    onSuccess: (response) => {
      SecureStore.setItem('id-token', response.data.data?.token ?? '');
      SecureStore.setItem('refresh-token', response.data.data?.token ?? '');
      http.addHeader('Authorization', `Bearer ${response.data.data?.token ?? ''}`);
      SecureStore.setItem('user-email', response.data.data?.email ?? '');
      setIsLogged(true);
    },
    onError: (error: unknown) => {
      handleError(error);
    },
  });
};
