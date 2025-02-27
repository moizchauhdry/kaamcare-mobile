import { useMutation, type UseMutationOptions, type UseMutationResult, useQueryClient } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';
import { QUERY_KEYS } from 'constants/query/queryKeys';

import type { Medication, NewMedication } from '../../../../model/api/medicalHistory/Medications';
import { useMutationAddMethods } from '../../useMutationAddMethods';
import { medicationsClient } from '../../../../services/http/ApiServices';

export const useMutationMedicationAdd = (
  options?: UseMutationOptions<void, ErrorResponse, NewMedication, Medication[]>,
): UseMutationResult<void, ErrorResponse, NewMedication, Medication[]> => {
  const queryClient = useQueryClient();
  const mutationMethods = useMutationAddMethods<void, ErrorResponse, NewMedication, Medication>({
    keys: {
      list: [QUERY_KEYS.MEDICAL_HISTORY_MEDICATIONS_GET],
      mutation: [QUERY_KEYS.MEDICAL_HISTORY_MEDICATION_ADD],
      single: [QUERY_KEYS.MEDICAL_HISTORY_MEDICATION_GET],
    },
    options: {
      onSettled: options?.onSettled,
    },
    idKey: 'userMedicationId',
  });

  return useMutation<void, ErrorResponse, NewMedication, Medication[]>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_HISTORY_MEDICATION_ADD],
    mutationFn: (variables) => medicationsClient.postUserMedication(variables),
    ...mutationMethods,
    onSuccess: (data, variables, context) => {
      mutationMethods?.onSuccess?.(
        data,
        variables,
        context,
        `${variables.medication_name} has been added to your medications list.`,
      );
    },
    onSettled: (data, error, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MEDICAL_HISTORY_MEDICATIONS_GET] });

      mutationMethods?.onSettled?.(data, error, variables, context);
    },
  });
};
