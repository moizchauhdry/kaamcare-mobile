import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { handleError } from 'utils/helpers';
import { validatedApi } from 'services/api-request';
import { useSignupStore } from 'screens/Intro/Signup/store';
import type { IForgotPassRequest } from 'services/api-request/request-types';
import type { IForgotPassResponse } from 'services/api-request/response-types';
import type { AuthNavigationParamsList } from 'components/Navigation/AuthNavigation';

export const useAuthForgotPass = () => {
  const setUserEmail = useSignupStore((store) => store.setUserEmail);
  const navigation = useNavigation<StackNavigationProp<AuthNavigationParamsList>>();

  return useMutation({
    mutationFn: (variables: IForgotPassRequest) =>
      validatedApi.post<IForgotPassResponse>('/user/forget-password', variables),
    onSuccess: (response) => {
      setUserEmail(response.data.data?.email);
      navigation.navigate('ResetVerify');
    },
    onError: (error: unknown) => {
      handleError(error);
    },
  });
};
