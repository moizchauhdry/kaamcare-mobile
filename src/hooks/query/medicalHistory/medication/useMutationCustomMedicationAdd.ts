import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from 'constants/query/queryKeys';

import { medicationsClient } from '../../../../services/http/ApiServices';
import { useCommonMethods } from '../../useCommonMethods';
import type { ErrorResponse } from '../../../../model/api/common/Error';
import type { MedicationsSelectModels } from '../../../../model/api/medicalHistory/Medications';

export const useMutationCustomMedicationAdd = (options?: UseMutationOptions<string, ErrorResponse, string>) => {
  const queryClient = useQueryClient();
  const { onErrorCommon } = useCommonMethods();
  const mutationKey = [QUERY_KEYS.MEDICAL_HISTORY_CUSTOM_MEDICATION_ADD];
  const listKey = [QUERY_KEYS.MEDICAL_HISTORY_CUSTOM_MEDICATIONS_GET];

  return useMutation<any, ErrorResponse, string>({
    ...options,
    mutationKey,
    mutationFn: (value) => medicationsClient.postCustomMedication(value),
    onMutate: async (value: string): Promise<MedicationsSelectModels> => {
      await queryClient.cancelQueries({ queryKey: mutationKey });
      const prevData = queryClient.getQueryData<MedicationsSelectModels>(listKey) ?? {
        dynamic: [],
        custom: [],
        common: [],
      };
      queryClient.setQueryData(listKey, { ...prevData, custom: [...prevData.custom, { allergyName: value }] });

      options?.onMutate?.(value);

      return prevData;
    },
    onSuccess: (data, variables, context) => {
      queryClient.refetchQueries({ queryKey: listKey });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (data, variables, context) => {
      options?.onError?.(data, variables, context);
      // back to previous values
      queryClient.setQueryData(listKey, context);
      onErrorCommon();
    },
    onSettled: (data, error, variables, context) => {
      options?.onSettled?.(data, error, variables, context);
    },
  });
};
