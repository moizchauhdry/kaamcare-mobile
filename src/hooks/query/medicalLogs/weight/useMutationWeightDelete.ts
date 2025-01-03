import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';
import type { MutationReturnType } from 'hooks/query/useMutationUpdateMethods';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { weightClient } from '../../../../services/http/ApiServices';
import { useLogsMutationDeleteMethods } from '../useLogsMutationDeleteMethods';
import type { WeightApiLog } from '../../../../model/api/medicalLogs/Weight';

export function useMutationWeightDelete(
  id: string,
  isNewest?: boolean,
  days?: number,
  redirectScreen?: keyof AddMedicalDataNavigationParamsList,
  options?: UseMutationOptions<void, ErrorResponse, string>,
): UseMutationResult<void, ErrorResponse, string> {
  const mutationMethods = useLogsMutationDeleteMethods<
    void,
    ErrorResponse,
    string,
    WeightApiLog,
    MutationReturnType<WeightApiLog>
  >({
    keys: {
      listAll: [QUERY_KEYS.MEDICAL_LOGS_WEIGHT_LIST_ALL_GET],
      list: [QUERY_KEYS.MEDICAL_LOGS_WEIGHT_LIST_GET],
      delete: [QUERY_KEYS.MEDICAL_LOGS_WEIGHT_DELETE],
      single: [QUERY_KEYS.MEDICAL_LOGS_WEIGHT_GET, id],
      dashboard: [QUERY_KEYS.DASHBOARD_WEIGHT],
    },
    id,
    isNewest,
    type: 'weight',
    redirectScreen: redirectScreen ?? 'Weight',
    days,
  });

  return useMutation<void, ErrorResponse, string, MutationReturnType<WeightApiLog>>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_LOGS_WEIGHT_DELETE],
    mutationFn: (deletionId) => weightClient.deleteWeight(deletionId),
    ...mutationMethods,
    onSuccess: (data, variables, context) => {
      mutationMethods?.onSuccess?.(data, variables, context, `Item has been successfully deleted from your list.`);
    },
  });
}
