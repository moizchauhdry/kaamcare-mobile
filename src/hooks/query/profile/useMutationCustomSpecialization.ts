import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ErrorResponse } from '../../../model/api/common/Error';
import { profileClient } from '../../../services/http/ApiServices';
import { QUERY_KEYS } from '../../../constants/query/queryKeys';
import type { CustomSpecialization } from '../../../model/api/ProfileInformation';
import { useCommonMethods } from '../useCommonMethods';

export const useMutationCustomSpecialization = (options?: UseMutationOptions<void, ErrorResponse, string>) => {
  const queryClient = useQueryClient();
  const { onErrorCommon } = useCommonMethods();
  const mutationKey = [QUERY_KEYS.CUSTOM_SPECIALIZATION_POST];
  const queryKey = [QUERY_KEYS.CUSTOM_SPECIALIZATION_GET];

  return useMutation<void, ErrorResponse, string>({
    ...options,
    mutationKey,
    mutationFn: (value) => profileClient.postCustomSpecialization(value),
    onMutate: async (value: string): Promise<CustomSpecialization[]> => {
      await queryClient.cancelQueries({ queryKey: mutationKey });
      const prevData = queryClient.getQueryData<CustomSpecialization[]>(queryKey) ?? [];
      queryClient.setQueryData(queryKey, [...prevData, { customSpecializationName: value }]);

      options?.onMutate?.(value);

      return prevData;
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
    },
    onError: (data, variables, context) => {
      options?.onError?.(data, variables, context);
      // back to previous values
      queryClient.setQueryData(queryKey, context);
      onErrorCommon();
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey });
      options?.onSettled?.(data, error, variables, context);
    },
  });
};
