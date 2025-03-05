import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { useToast } from 'hooks/useToast';
import { handleError } from 'utils/helpers';
import { validatedApi } from 'services/api-request';
import type { IResetPassRequest } from 'services/api-request/request-types';
import type { IResetPassResponse } from 'services/api-request/response-types';
import type { AuthNavigationParamsList } from 'components/Navigation/AuthNavigation';

export const useAuthResetPass = () => {
  const { showToast } = useToast();
  const navigation = useNavigation<StackNavigationProp<AuthNavigationParamsList>>();

  return useMutation({
    mutationFn: (variables: IResetPassRequest) =>
      validatedApi.post<IResetPassResponse>('/user/reset-password', variables),
    onSuccess: (data, variables) => {
      const { shouldNavigateToLogin = true } = variables; // Default to true if flag is not provided
      if (shouldNavigateToLogin) {
        navigation.navigate('LogIn'); // Navigate to Login screen if flag is true
      } else {
        navigation.goBack(); // Navigate back if flag is false
      }
      showToast({
        text1: 'Password reset successfully',
      });
    },
    onError: (error: unknown) => {
      handleError(error);
    },
  });
};
