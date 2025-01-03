import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ErrorResponse } from '../../../model/api/common/Error';
import { profileClient } from '../../../services/http/ApiServices';
import { QUERY_KEYS } from '../../../constants/query/queryKeys';
import type { CustomRelationship } from '../../../model/api/ProfileInformation';
import { useCommonMethods } from '../useCommonMethods';

export const useMutationCustomRelationship = (options?: UseMutationOptions<void, ErrorResponse, string>) => {
  const queryClient = useQueryClient();
  const { onErrorCommon } = useCommonMethods();
  const mutationKey = [QUERY_KEYS.CUSTOM_RELATIONSHIP_POST];
  const queryKey = [QUERY_KEYS.CUSTOM_RELATIONSHIP_GET];

  return useMutation<void, ErrorResponse, string>({
    ...options,
    mutationKey,
    mutationFn: (value) => profileClient.postCustomRelationship(value),
    onMutate: async (value: string): Promise<CustomRelationship[]> => {
      await queryClient.cancelQueries({ queryKey: mutationKey });
      const prevData = queryClient.getQueryData<CustomRelationship[]>(queryKey) ?? [];
      queryClient.setQueryData(queryKey, [...prevData, { customRelationshipName: value }]);

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
