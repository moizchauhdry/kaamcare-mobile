import { useMutation } from '@tanstack/react-query';

import { useToast } from 'hooks/useToast';
import { handleError } from 'utils/helpers';
import { validatedApi } from 'services/api-request';
import type { IResendOtpResponse } from 'services/api-request/response-types';

export const useAuthResendOtp = () => {
  const { showToast } = useToast();

  return useMutation({
    mutationFn: () => validatedApi.post<IResendOtpResponse>('/user/resend-otp'),
    onSuccess: () => {
      showToast({
        text1: 'Please check your email for new otp code',
      });
    },
    onError: (error: unknown) => {
      handleError(error);
    },
  });
};
