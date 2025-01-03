import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import type { MutationReturnType } from '../../useMutationUpdateMethods';
import type { SaturationLog } from '../../../../model/api/medicalLogs/Saturation';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { saturationClient } from '../../../../services/http/ApiServices';
import { useLogsMutationUpdateMethods } from '../useLogsMutationUpdateMethods';

export function useMutationSaturationLogUpdate(
  id: string,
  days?: number,
  options?: UseMutationOptions<void, ErrorResponse, SaturationLog>,
): UseMutationResult<void, ErrorResponse, SaturationLog> {
  const mutationMethods = useLogsMutationUpdateMethods<
    void,
    ErrorResponse,
    SaturationLog,
    MutationReturnType<SaturationLog>
  >({
    keys: {
      listAll: [QUERY_KEYS.MEDICAL_LOGS_SATURATION_LOGS_LIST_ALL_GET],
      list: [QUERY_KEYS.MEDICAL_LOGS_SATURATION_LOGS_LIST_GET],
      single: [QUERY_KEYS.MEDICAL_LOGS_SATURATION_LOG_SINGLE_GET, id],
      dashboard: [QUERY_KEYS.DASHBOARD_SATURATION],
    },
    id,
    redirectScreen: 'Saturation',
    days,
  });

  return useMutation<void, ErrorResponse, SaturationLog, MutationReturnType<SaturationLog>>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_LOGS_SATURATION_LOG_UPDATE],
    mutationFn: (variables) => saturationClient.putSaturation(id, variables),
    ...mutationMethods,
    onSuccess: (data, variables, context) => {
      mutationMethods?.onSuccess?.(data, variables, context, `Saturation log has been successfully updated.`);
    },
  });
}
