import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { bloodPressureClient } from '../../../../services/http/ApiServices';
import type { BloodPressureLog } from '../../../../model/api/medicalLogs/BloodPressure';
import { useLogsMutationDeleteMethods } from '../useLogsMutationDeleteMethods';
import type { MutationReturnType } from '../../useMutationUpdateMethods';

export function useMutationBloodPressureLogDelete(
  id: string,
  days?: number,
  options?: UseMutationOptions<void, ErrorResponse, string>,
): UseMutationResult<void, ErrorResponse, string> {
  const mutationMethods = useLogsMutationDeleteMethods<
    void,
    ErrorResponse,
    string,
    BloodPressureLog,
    MutationReturnType<BloodPressureLog>
  >({
    keys: {
      listAll: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_PRESSURE_LOGS_LIST_ALL_GET],
      list: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_PRESSURE_LOGS_LIST_GET],
      single: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_PRESSURE_LOG_SINGLE_GET, id],
      delete: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_PRESSURE_LOG_DELETE],
      dashboard: [QUERY_KEYS.DASHBOARD_BLOOD_PRESSURE],
    },
    id,
    redirectScreen: 'BloodPressure',
    days,
  });
  return useMutation<void, ErrorResponse, string, MutationReturnType<BloodPressureLog>>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_PRESSURE_LOG_DELETE],
    mutationFn: (deletionId) => bloodPressureClient.deleteBloodPressure(deletionId),
    ...mutationMethods,
    onSuccess: (data, variables, context) => {
      mutationMethods.onSuccess?.(
        data,
        variables,
        context,
        'Blood pressure log has been successfully deleted from your list.',
      );
    },
  });
}
