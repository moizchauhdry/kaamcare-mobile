import { useMutation } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { handleError } from 'utils/helpers';
import { validatedApi } from 'services/api-request';
import type { IVerifyOtpRequest } from 'services/api-request/request-types';
import type { IVerifyOtpResponse } from 'services/api-request/response-types';
import type { AuthNavigationParamsList } from 'components/Navigation/AuthNavigation';

export const useAuthVerifyOtp = (screenOrigin?: string) => {
  const navigation = useNavigation<StackNavigationProp<AuthNavigationParamsList>>();

  return useMutation({
    mutationFn: (variables: IVerifyOtpRequest) => validatedApi.post<IVerifyOtpResponse>('/user/verify-otp', variables),
    onSuccess: (response) => {
      SecureStore.setItem('id-token', response.data.data?.user?.token ?? '');
      SecureStore.setItem('refresh-token', response.data.data?.user?.token ?? '');

      if (screenOrigin === 'resetPassword') {
        navigation.navigate('ResetPassword');
      } else {
        navigation.navigate('Password');
      }
    },
    onError: (error: unknown) => {
      handleError(error);
    },
  });
};
