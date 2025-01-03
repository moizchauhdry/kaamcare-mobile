import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import type { MutationReturnType } from '../../useMutationUpdateMethods';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { weightClient } from '../../../../services/http/ApiServices';
import { useLogsMutationUpdateMethods } from '../useLogsMutationUpdateMethods';
import type { WeightApiLog } from '../../../../model/api/medicalLogs/Weight';

export function useMutationWeightUpdate(
  id: string,
  isNewest?: boolean,
  days?: number,
  redirectScreen?: keyof AddMedicalDataNavigationParamsList,
  options?: UseMutationOptions<void, ErrorResponse, WeightApiLog>,
): UseMutationResult<void, ErrorResponse, WeightApiLog> {
  const mutationMethods = useLogsMutationUpdateMethods<
    void,
    ErrorResponse,
    WeightApiLog,
    MutationReturnType<WeightApiLog>
  >({
    keys: {
      listAll: [QUERY_KEYS.MEDICAL_LOGS_WEIGHT_LIST_ALL_GET],
      list: [QUERY_KEYS.MEDICAL_LOGS_WEIGHT_LIST_GET],
      single: [QUERY_KEYS.MEDICAL_LOGS_WEIGHT_GET, id],
      dashboard: [QUERY_KEYS.DASHBOARD_WEIGHT],
    },
    id,
    isNewest,
    type: 'weight',
    redirectScreen: redirectScreen ?? 'Weight',
    days,
  });

  return useMutation<void, ErrorResponse, WeightApiLog, MutationReturnType<WeightApiLog>>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_LOGS_WEIGHT_UPDATE],
    mutationFn: (variables) => weightClient.putWeight(id, variables),
    ...mutationMethods,
    onSuccess: (data, variables, context) => {
      mutationMethods?.onSuccess?.(data, variables, context, `This log has been successfully updated.`);
    },
  });
}
