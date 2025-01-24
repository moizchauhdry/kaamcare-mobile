import { useMutation } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { handleError } from 'utils/helpers';
import { validatedApi } from 'services/api-request';
import type { IForgotPassRequest } from 'services/api-request/request-types';
import type { IForgotPassResponse } from 'services/api-request/response-types';
import type { AuthNavigationParamsList } from 'components/Navigation/AuthNavigation';

export const useAuthForgotPass = () => {
  const navigation = useNavigation<StackNavigationProp<AuthNavigationParamsList>>();

  return useMutation({
    mutationFn: (variables: IForgotPassRequest) =>
      validatedApi.post<IForgotPassResponse>('/user/forget-password', variables),
    onSuccess: (response) => {
      SecureStore.setItem('id-token', response.data.data?.token ?? '');
      navigation.navigate('ResetVerify');
    },
    onError: (error: unknown) => {
      handleError(error);
    },
  });
};
