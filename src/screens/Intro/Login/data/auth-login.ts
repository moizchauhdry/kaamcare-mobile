import { useMutation } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';

import { handleError } from 'utils/helpers';
import { http } from 'services/http/ApiServices';
import { validatedApi } from 'services/api-request';
import { useSignupStore } from 'screens/Intro/Signup/store';
import type { ILoginRequest } from 'services/api-request/request-types';
import type { ILoginResponse } from 'services/api-request/response-types';

export const useAuthLogin = () => {
  const setIsLogged = useSignupStore((store) => store.setIsLogged);

  return useMutation({
    mutationFn: (variables: ILoginRequest) => validatedApi.post<ILoginResponse>('/user/login', variables),
    onSuccess: (response) => {
      SecureStore.setItem('id-token', response.data.data?.user?.token ?? '');
      SecureStore.setItem('refresh-token', response.data.data?.user?.token ?? '');
      http.addHeader('Authorization', `Bearer ${response.data.data?.user?.token}`);
      setIsLogged(true);
    },
    onError: (error: unknown) => {
      handleError(error);
    },
  });
};
