import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import type { BloodPressureLog } from '../../../../model/api/medicalLogs/BloodPressure';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { bloodPressureClient } from '../../../../services/http/ApiServices';
import { useLogsMutationUpdateMethods } from '../useLogsMutationUpdateMethods';
import type { MutationReturnType } from '../../useMutationUpdateMethods';
import { parseBloodPressureToDisplayData } from '../../../../model/parsers/medicalLogs/BloodPressureParser';

export function useMutationBloodPressureLogUpdate(
  id: string,
  days?: number,
  options?: UseMutationOptions<void, ErrorResponse, BloodPressureLog>,
): UseMutationResult<void, ErrorResponse, BloodPressureLog> {
  const keys = {
    listAll: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_PRESSURE_LOGS_LIST_ALL_GET],
    list: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_PRESSURE_LOGS_LIST_GET],
    single: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_PRESSURE_LOG_SINGLE_GET, id],
    dashboard: [QUERY_KEYS.DASHBOARD_BLOOD_PRESSURE],
  };
  const mutationMethods = useLogsMutationUpdateMethods<
    void,
    ErrorResponse,
    BloodPressureLog,
    MutationReturnType<BloodPressureLog>
  >({
    id,
    keys,
    redirectScreen: 'BloodPressure',
    parser: parseBloodPressureToDisplayData,
    days,
  });

  return useMutation<void, ErrorResponse, BloodPressureLog, MutationReturnType<BloodPressureLog>>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_PRESSURE_LOG_UPDATE],
    mutationFn: (variables) => bloodPressureClient.putBloodPressure(variables.id, variables),
    ...mutationMethods,
    onSuccess: (data, variables, context) => {
      mutationMethods?.onSuccess?.(data, variables, context, 'Blood pressure log has been successfully updated.');
    },
  });
}
