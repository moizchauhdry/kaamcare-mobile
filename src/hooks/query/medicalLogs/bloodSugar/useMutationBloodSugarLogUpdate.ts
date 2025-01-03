import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import type { MutationReturnType } from '../../useMutationUpdateMethods';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { BloodSugarLog } from '../../../../model/api/medicalLogs/BloodSugar';
import { useLogsMutationUpdateMethods } from '../useLogsMutationUpdateMethods';
import { bloodSugarClient } from '../../../../services/http/ApiServices';
import { parseBloodSugarToDisplay } from '../../../../model/parsers/medicalLogs/BloodSugarParser';

export function useMutationBloodSugarLogUpdate(
  id: string,
  days?: number,
  options?: UseMutationOptions<void, ErrorResponse, BloodSugarLog>,
): UseMutationResult<void, ErrorResponse, BloodSugarLog> {
  const mutationMethods = useLogsMutationUpdateMethods<
    void,
    ErrorResponse,
    BloodSugarLog,
    MutationReturnType<BloodSugarLog>
  >({
    keys: {
      listAll: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_SUGAR_LOGS_LIST_ALL_GET],
      list: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_SUGAR_LOGS_LIST_GET],
      single: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_SUGAR_LOG_SINGLE_GET, id],
      dashboard: [QUERY_KEYS.DASHBOARD_BLOOD_SUGAR],
    },
    id,
    parser: parseBloodSugarToDisplay,
    redirectScreen: 'BloodSugar',
    days,
  });

  return useMutation<void, ErrorResponse, BloodSugarLog, MutationReturnType<BloodSugarLog>>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_SUGAR_LOG_UPDATE],
    mutationFn: (variables) => bloodSugarClient.putBloodSugar(variables),
    ...mutationMethods,
    onSuccess: (data, variables, context) => {
      mutationMethods?.onSuccess?.(data, variables, context, `Blood sugar log has been successfully updated.`);
    },
  });
}
