import { useMutation, useQueryClient } from '@tanstack/react-query';

import { handleError } from 'utils/helpers';
import { validatedApi } from 'services/api-request';
import type { ILoginRequest } from 'services/api-request/request-types';
import type { ILoginResponse } from 'services/api-request/response-types';

export const useAuthLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: ILoginRequest) => validatedApi.post<ILoginResponse>('/user/login', variables),
    onSuccess: (response) => {
      console.log('response', response);
    },
    onError: (error: unknown) => handleError(error),
  });
};
