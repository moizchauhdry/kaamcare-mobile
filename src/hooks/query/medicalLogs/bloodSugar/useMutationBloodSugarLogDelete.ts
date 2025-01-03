import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';
import type { MutationReturnType } from 'hooks/query/useMutationUpdateMethods';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { BloodSugarLog } from '../../../../model/api/medicalLogs/BloodSugar';
import { useLogsMutationDeleteMethods } from '../useLogsMutationDeleteMethods';
import { bloodSugarClient } from '../../../../services/http/ApiServices';

export function useMutationBloodSugarLogDelete(
  id: string,
  days?: number,
  options?: UseMutationOptions<void, ErrorResponse, string>,
): UseMutationResult<void, ErrorResponse, string> {
  const mutationMethods = useLogsMutationDeleteMethods<
    void,
    ErrorResponse,
    string,
    BloodSugarLog,
    MutationReturnType<BloodSugarLog>
  >({
    keys: {
      listAll: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_SUGAR_LOGS_LIST_ALL_GET],
      list: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_SUGAR_LOGS_LIST_GET],
      delete: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_SUGAR_LOG_DELETE],
      single: [QUERY_KEYS.MEDICAL_LOGS_WEIGHT_GET, id],
      dashboard: [QUERY_KEYS.DASHBOARD_BLOOD_SUGAR],
    },
    id,
    redirectScreen: 'BloodSugar',
    days,
  });

  return useMutation<void, ErrorResponse, string, MutationReturnType<BloodSugarLog>>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_SUGAR_LOG_DELETE],
    mutationFn: (deletionId) => bloodSugarClient.deleteBloodSugar(deletionId),
    ...mutationMethods,
    onSuccess: (data, variables, context) => {
      mutationMethods?.onSuccess?.(data, variables, context, `Item has been successfully deleted from your list.`);
    },
  });
}
