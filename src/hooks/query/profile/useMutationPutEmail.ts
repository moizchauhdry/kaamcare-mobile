import {
  onlineManager,
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';

import { QUERY_KEYS } from 'constants/query/queryKeys';
import type { ErrorResponse } from 'model/api/common/Error';
import { profileClient } from 'services/http/ApiServices';

import type { ProfileInformation } from '../../../model/api/ProfileInformation';
import { useAlert } from '../../useAlert';

export const useMutationPutEmail = (
  options?: UseMutationOptions<void, ErrorResponse, string>,
): UseMutationResult<void, ErrorResponse, string> => {
  const queryClient = useQueryClient();
  const { showErrorAlert } = useAlert();
  const mutationKey = [QUERY_KEYS.PROFILE_INFORMATION_EMAIL_PUT];
  const queryKey = [QUERY_KEYS.PROFILE_INFORMATION_GET];

  return useMutation<void, ErrorResponse, string>({
    ...options,
    mutationKey: [QUERY_KEYS.PROFILE_INFORMATION_EMAIL_PUT],
    mutationFn: (value) => profileClient.putEmail(value),
    onMutate: async (values: string): Promise<string | undefined> => {
      await queryClient.cancelQueries({ queryKey: mutationKey });
      const prevData = queryClient.getQueryData<ProfileInformation>(queryKey);
      const newData = {
        ...prevData,
        email: values,
      };

      queryClient.setQueryData(queryKey, newData);
      options?.onMutate?.(values);

      return prevData?.email;
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (data, variables, context) => {
      options?.onError?.(data, variables, context);
      // back to previous values
      queryClient.setQueryData(queryKey, context);
      if (onlineManager.isOnline()) {
        showErrorAlert({
          description:
            'Currently, we are unable to process your request to change your email address. \n\nPlease try again later. To ensure a smooth experience, make sure your app is updated or contact support for further assistance.',
        });
      }
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey });
      options?.onSettled?.(data, error, variables, context);
    },
  });
};
