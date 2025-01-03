import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { NewWeightLog, WeightApiLog, WeightLogs } from '../../../../model/api/medicalLogs/Weight';
import { weightClient } from '../../../../services/http/ApiServices';
import { useLogsMutationAddMethods } from '../useLogsMutationAddMethods';

export function useMutationWeightAdd(
  redirect?: string,
  redirectScreen?: keyof AddMedicalDataNavigationParamsList,
  days?: number,
  options?: UseMutationOptions<string, ErrorResponse, NewWeightLog, { prevData: WeightLogs; newData: WeightApiLog }>,
): UseMutationResult<string, ErrorResponse, NewWeightLog, { prevData: WeightLogs; newData: WeightApiLog }> {
  const mutationMethods = useLogsMutationAddMethods<string, ErrorResponse, NewWeightLog, WeightApiLog>({
    keys: {
      listAll: [QUERY_KEYS.MEDICAL_LOGS_WEIGHT_LIST_ALL_GET],
      list: [QUERY_KEYS.MEDICAL_LOGS_WEIGHT_LIST_GET],
      dashboard: [QUERY_KEYS.DASHBOARD_WEIGHT],
    },
    redirectScreen: redirectScreen ?? 'Weight',
    type: redirect === 'personal' ? 'weightPersonal' : 'weight',
    days,
  });

  return useMutation<string, ErrorResponse, NewWeightLog, { prevData: WeightLogs; newData: WeightApiLog }>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_LOGS_WEIGHT_ADD],
    mutationFn: (variables) => weightClient.postWeight(variables),
    ...mutationMethods,
    onSuccess: (data, variables, context) => {
      mutationMethods?.onSuccess?.(data, variables, context, `New Weight log has been added to your list.`);
    },
  });
}
