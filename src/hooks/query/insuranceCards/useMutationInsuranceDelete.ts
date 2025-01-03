import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';
import type { InsuranceCards } from '../../../model/api/insurance/Insurance';
import { insuranceClient } from '../../../services/http/ApiServices';
import { useCommonMethods } from '../useCommonMethods';
import { useToast } from '../../useToast';

type MutateReturnType = {
  previousList: InsuranceCards | undefined;
};

export function useMutationInsuranceDelete(
  id: string,
  options?: UseMutationOptions<void, ErrorResponse, string, MutateReturnType>,
): UseMutationResult<void, ErrorResponse, string, MutateReturnType> {
  const queryClient = useQueryClient();
  const { onErrorCommon } = useCommonMethods();
  const { showToast } = useToast();

  return useMutation<void, ErrorResponse, string, MutateReturnType>({
    ...options,
    mutationKey: [QUERY_KEYS.INSURANCE_CARDS_DELETE],
    mutationFn: (deletionId) => insuranceClient.deleteInsuranceCard(deletionId),
    onMutate: async (): Promise<MutateReturnType> => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.INSURANCE_CARDS_GET] });

      const previousList = queryClient.getQueryData<InsuranceCards>([QUERY_KEYS.INSURANCE_CARDS_GET]) ?? [];
      queryClient.setQueryData(
        [QUERY_KEYS.INSURANCE_CARDS_GET],
        previousList.filter((elem) => elem.id !== id),
      );

      return { previousList };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData([QUERY_KEYS.INSURANCE_CARDS_GET], context?.previousList);
      onErrorCommon();
      options?.onError?.(error, variables, context);
    },
    onSuccess: () => {
      showToast({
        text1: `Item has been deleted from your Insurance Cards`,
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.INSURANCE_CARDS_GET] });
    },
  });
}
