import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import type { SaturationLogs, NewSaturationLog, SaturationApiLog } from '../../../../model/api/medicalLogs/Saturation';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { saturationClient } from '../../../../services/http/ApiServices';
import { useLogsMutationAddMethods } from '../useLogsMutationAddMethods';

export function useMutationSaturationLogAdd(
  days?: number,
  options?: UseMutationOptions<
    string,
    ErrorResponse,
    NewSaturationLog,
    { prevData: SaturationLogs; newData: SaturationApiLog }
  >,
): UseMutationResult<string, ErrorResponse, NewSaturationLog, { prevData: SaturationLogs; newData: SaturationApiLog }> {
  const mutationMethods = useLogsMutationAddMethods<string, ErrorResponse, NewSaturationLog, SaturationApiLog>({
    keys: {
      listAll: [QUERY_KEYS.MEDICAL_LOGS_SATURATION_LOGS_LIST_ALL_GET],
      list: [QUERY_KEYS.MEDICAL_LOGS_SATURATION_LOGS_LIST_GET],
      dashboard: [QUERY_KEYS.DASHBOARD_SATURATION],
    },
    redirectScreen: 'Saturation',
    days,
  });

  return useMutation<string, ErrorResponse, NewSaturationLog, { prevData: SaturationLogs; newData: SaturationApiLog }>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_LOGS_SATURATION_LOG_ADD],
    mutationFn: (variables) => saturationClient.postSaturation(variables),
    ...mutationMethods,
    onSuccess: (data, variables, context) => {
      mutationMethods?.onSuccess?.(data, variables, context, `New Saturation log has been added to your list.`);
    },
  });
}
