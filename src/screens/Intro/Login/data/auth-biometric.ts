import { useMutation } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';

import { handleError } from 'utils/helpers';
import { http } from 'services/http/ApiServices';
import { validatedApi } from 'services/api-request';
import { useSignupStore } from 'screens/Intro/Signup/store';
import type { ILoginResponse } from 'services/api-request/response-types';

export const useAuthBiometric = () => {
  const setIsLogged = useSignupStore((store) => store.setIsLogged);

  return useMutation({
    mutationFn: () => validatedApi.post<ILoginResponse>('/user/biometric-login'),
    onSuccess: (response) => {
      SecureStore.setItem('id-token', response.data.data?.user?.token ?? '');
      SecureStore.setItem('refresh-token', response.data.data?.user?.token ?? '');
      http.addHeader('Authorization', `Bearer ${response.data.data?.user?.token ?? ''}`);
      SecureStore.setItem('user-email', response.data.data?.user?.email ?? '');
      setIsLogged(true);
    },
    onError: (error: unknown) => {
      handleError(error);
    },
  });
};
