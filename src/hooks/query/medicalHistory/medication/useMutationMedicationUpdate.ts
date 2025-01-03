import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';
import { QUERY_KEYS } from 'constants/query/queryKeys';

import { useToast } from '../../../useToast';
import { useCommonMethods } from '../../useCommonMethods';
import type { Medication, Medications } from '../../../../model/api/medicalHistory/Medications';
import { medicationsClient } from '../../../../services/http/ApiServices';

export const useMutationMedicationUpdate = (
  options?: UseMutationOptions<void, ErrorResponse, Medication>,
): UseMutationResult<void, ErrorResponse, Medication> => {
  const { showToast } = useToast();
  const { onErrorCommon } = useCommonMethods();
  const queryClient = useQueryClient();
  const queryListKey = [QUERY_KEYS.MEDICAL_HISTORY_MEDICATIONS_GET];
  const queryElemKey = QUERY_KEYS.MEDICAL_HISTORY_MEDICATION_GET;

  return useMutation<void, ErrorResponse, Medication, { previousMedication?: Medication; previousList: Medications }>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_HISTORY_MEDICATION_UPDATE],
    mutationFn: (variables) => medicationsClient.putUserMedication(variables),
    onMutate: async (values): Promise<{ previousMedication?: Medication; previousList: Medications }> => {
      await queryClient.cancelQueries({ queryKey: [queryElemKey, values.userMedicationId] });
      await queryClient.cancelQueries({ queryKey: queryListKey });

      const previousMedication = queryClient.getQueryData<Medication>([queryElemKey, values.userMedicationId]);
      const previousList = queryClient.getQueryData<Medications>(queryListKey) ?? [];
      const newList = [...previousList];
      const itemIndex = previousList.findIndex(
        (elem) => elem.userMedicationId === previousMedication?.userMedicationId,
      );
      newList[itemIndex] = { ...previousMedication, ...values };

      queryClient.setQueryData<Medication>([queryElemKey, values.userMedicationId], values);
      queryClient.setQueryData(queryListKey, newList);

      return { previousMedication, previousList };
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData<Medication>([queryElemKey, variables.userMedicationId], context?.previousMedication);
      queryClient.setQueryData(queryListKey, context?.previousList);

      onErrorCommon();
    },
    onSuccess: (_, variables) => {
      showToast({
        text1: `${variables.medicationName} has been successfully updated`,
      });
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [queryElemKey, variables.userMedicationId] });
      // queryClient.invalidateQueries({ queryKey: queryListKey });

      options?.onSettled?.(data, error, variables, context);
    },
  });
};
