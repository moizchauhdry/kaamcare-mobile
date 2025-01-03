import { useMutation, type UseMutationOptions, type UseMutationResult } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';
import type { MutationReturnType } from 'hooks/query/useMutationUpdateMethods';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { SaturationLog } from '../../../../model/api/medicalLogs/Saturation';
import { saturationClient } from '../../../../services/http/ApiServices';
import { useLogsMutationDeleteMethods } from '../useLogsMutationDeleteMethods';

export function useMutationSaturationLogDelete(
  id: string,
  days?: number,
  options?: UseMutationOptions<void, ErrorResponse, string>,
): UseMutationResult<void, ErrorResponse, string> {
  const mutationMethods = useLogsMutationDeleteMethods<
    void,
    ErrorResponse,
    string,
    SaturationLog,
    MutationReturnType<SaturationLog>
  >({
    keys: {
      listAll: [QUERY_KEYS.MEDICAL_LOGS_SATURATION_LOGS_LIST_ALL_GET],
      list: [QUERY_KEYS.MEDICAL_LOGS_SATURATION_LOGS_LIST_GET],
      delete: [QUERY_KEYS.MEDICAL_LOGS_SATURATION_LOG_DELETE],
      single: [QUERY_KEYS.MEDICAL_LOGS_SATURATION_LOG_SINGLE_GET, id],
      dashboard: [QUERY_KEYS.DASHBOARD_SATURATION],
    },
    id,
    redirectScreen: 'Saturation',
    days,
  });

  return useMutation<void, ErrorResponse, string, MutationReturnType<SaturationLog>>({
    ...options,
    mutationKey: [QUERY_KEYS.MEDICAL_LOGS_SATURATION_LOG_DELETE],
    mutationFn: (deletionId) => saturationClient.deleteSaturation(deletionId),
    ...mutationMethods,
    onSuccess: (data, variables, context) => {
      mutationMethods?.onSuccess?.(data, variables, context, `Item has been successfully deleted from your list.`);
    },
  });
}
