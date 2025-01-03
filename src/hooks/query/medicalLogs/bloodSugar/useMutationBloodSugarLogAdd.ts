import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { BloodSugarLog, BloodSugarLogs, NewBloodSugarLog } from '../../../../model/api/medicalLogs/BloodSugar';
import { bloodSugarClient } from '../../../../services/http/ApiServices';
import { useLogsMutationAddMethods } from '../useLogsMutationAddMethods';
import { parseBloodSugarToDisplay } from '../../../../model/parsers/medicalLogs/BloodSugarParser';

export function useMutationBloodSugarLogAdd(
  days?: number,
  options?: UseMutationOptions<
    string,
    ErrorResponse,
    NewBloodSugarLog,
    { prevData: BloodSugarLogs; newData: BloodSugarLog }
  >,
): UseMutationResult<string, ErrorResponse, NewBloodSugarLog, { prevData: BloodSugarLogs; newData: BloodSugarLog }> {
  const mutationMethods = useLogsMutationAddMethods<string, ErrorResponse, NewBloodSugarLog, BloodSugarLog>({
    keys: {
      list: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_SUGAR_LOGS_LIST_GET],
      dashboard: [QUERY_KEYS.DASHBOARD_BLOOD_SUGAR],
      listAll: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_SUGAR_LOGS_LIST_ALL_GET],
    },
    redirectScreen: 'BloodSugar',
    parser: parseBloodSugarToDisplay,
    days,
  });

  return useMutation<string, ErrorResponse, NewBloodSugarLog, { prevData: BloodSugarLogs; newData: BloodSugarLog }>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_SUGAR_LOG_ADD],
    mutationFn: (variables) => bloodSugarClient.postBloodSugar(variables),
    ...mutationMethods,
    onSuccess: (data, variables, context) => {
      mutationMethods?.onSuccess?.(data, variables, context, `New Blood Sugar log has been added to your list.`);
    },
  });
}
