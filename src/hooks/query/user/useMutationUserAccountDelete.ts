import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

import type { ErrorResponse } from '../../../model/api/common/Error';
import { QUERY_KEYS } from '../../../constants/query/queryKeys';
import { userClient } from '../../../services/http/ApiServices';
import { useAlert } from '../../useAlert';

export const useMutationUserAccountDelete = (
  options?: UseMutationOptions<void, ErrorResponse, void>,
): UseMutationResult<void, ErrorResponse, void> => {
  const { showErrorAlert } = useAlert();

  return useMutation<void, ErrorResponse, void>({
    ...options,
    mutationKey: [QUERY_KEYS.USER_ACCOUNT_DELETE],
    mutationFn: () => userClient.deleteAccount(),
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (data, variables, context) => {
      options?.onError?.(data, variables, context);
      showErrorAlert({
        description:
          'Currently, we are unable to process your request to delete your account. \n\nPlease try again later. To ensure a smooth experience, make sure your app is updated or contact support for further assistance.',
      });
    },
  });
};
