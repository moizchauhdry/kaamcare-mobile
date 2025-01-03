import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';
import type { Medication, Medications } from 'model/api/medicalHistory/Medications';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { useCommonMethods } from '../../useCommonMethods';
import { useToast } from '../../../useToast';
import { medicationsClient } from '../../../../services/http/ApiServices';

export const useMutationMedicationDelete = (
  id: string,
  options?: UseMutationOptions<void, ErrorResponse, string>,
): UseMutationResult<void, ErrorResponse, string> => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const mutationKey = [QUERY_KEYS.MEDICAL_HISTORY_MEDICATION_DELETE];
  const listKey = [QUERY_KEYS.MEDICAL_HISTORY_MEDICATIONS_GET];

  return useMutation<void, ErrorResponse, string, { prevData: Medications; name: string }>({
    ...options,
    mutationKey,
    mutationFn: (medicationId) => medicationsClient.deleteUserMedication(medicationId),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({ queryKey: mutationKey });
      const prevData = queryClient.getQueryData<Medications>(listKey) ?? [];
      const currentItem = queryClient.getQueryData<Medication>([QUERY_KEYS.MEDICAL_HISTORY_MEDICATION_GET, id]);
      const newData = prevData.filter((elem) => elem.userMedicationId !== id);
      queryClient.setQueryData(listKey, newData);
      options?.onMutate?.(variables);

      return { prevData, name: currentItem!.medicationName };
    },
    onSuccess: (data, variables, context) => {
      options?.onSuccess?.(data, variables, context);
      showToast({
        text1: `${context.name} has been successfully deleted from your list.`,
      });
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
      queryClient.setQueryData(listKey, context?.prevData);
      onErrorCommon();
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: mutationKey });
      options?.onSettled?.(data, error, variables, context);
    },
  });
};
