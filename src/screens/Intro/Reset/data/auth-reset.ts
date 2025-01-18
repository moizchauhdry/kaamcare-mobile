import { useMutation } from '@tanstack/react-query';

import { handleError } from 'utils/helpers';
import { validatedApi } from 'services/api-request';
import { useSignupStore } from 'screens/Intro/Signup/store';
import type { IResetPassRequest } from 'services/api-request/request-types';
import type { IResetPassResponse } from 'services/api-request/response-types';

export const useAuthResetPass = () => {
  const setIsLogged = useSignupStore((store) => store.setIsLogged);

  return useMutation({
    mutationFn: (variables: IResetPassRequest) =>
      validatedApi.post<IResetPassResponse>('/user/reset-password', variables),
    onSuccess: () => {
      setIsLogged(true);
    },
    onError: (error: unknown) => {
      handleError(error);
    },
  });
};
