import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import type {
  BloodPressureLog,
  BloodPressureLogs,
  NewBloodPressureLog,
} from '../../../../model/api/medicalLogs/BloodPressure';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { bloodPressureClient } from '../../../../services/http/ApiServices';
import { useLogsMutationAddMethods } from '../useLogsMutationAddMethods';
import { parseBloodPressureToDisplayData } from '../../../../model/parsers/medicalLogs/BloodPressureParser';

export function useMutationBloodPressureLogAdd(
  days?: number,
  options?: UseMutationOptions<
    string,
    ErrorResponse,
    NewBloodPressureLog,
    { prevData: BloodPressureLogs; newData: BloodPressureLog }
  >,
): UseMutationResult<
  string,
  ErrorResponse,
  NewBloodPressureLog,
  { prevData: BloodPressureLogs; newData: BloodPressureLog }
> {
  const keys = {
    mutation: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_PRESSURE_LOG_ADD],
  };

  const mutationMethods = useLogsMutationAddMethods<string, ErrorResponse, NewBloodPressureLog, BloodPressureLog>({
    keys: {
      listAll: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_PRESSURE_LOGS_LIST_ALL_GET],
      list: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_PRESSURE_LOGS_LIST_GET],
      dashboard: [QUERY_KEYS.DASHBOARD_BLOOD_PRESSURE],
    },
    redirectScreen: 'BloodPressure',
    parser: parseBloodPressureToDisplayData,
    days,
  });

  return useMutation<
    string,
    ErrorResponse,
    NewBloodPressureLog,
    { prevData: BloodPressureLogs; newData: BloodPressureLog }
  >({
    ...options,
    mutationKey: keys.mutation,
    mutationFn: (variables) => bloodPressureClient.postBloodPressure(variables),
    ...mutationMethods,
    onSuccess: (data, variables, context) => {
      mutationMethods?.onSuccess?.(data, variables, context, 'New Blood Pressure log has been added to your list.');
    },
  });
}
