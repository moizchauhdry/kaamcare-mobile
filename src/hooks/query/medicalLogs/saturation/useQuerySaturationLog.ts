import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { onlineManager, useQuery, useQueryClient } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query/build/modern';

import type { ErrorResponse } from 'model/api/common/Error';

import type { SaturationApiLog } from '../../../../model/api/medicalLogs/Saturation';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { LOG_CACHE_TIME } from '../../../../constants/query/medicalLogs/logs';
import { saturationClient } from '../../../../services/http/ApiServices';

export function useQuerySaturationLog(
  id?: string,
  options?: Omit<UseQueryOptions<SaturationApiLog, ErrorResponse>, 'queryKey'>,
): UseQueryResult<SaturationApiLog | undefined, ErrorResponse> {
  const isOnline = onlineManager.isOnline();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [QUERY_KEYS.MEDICAL_LOGS_SATURATION_LOG_SINGLE_GET, id],
    queryFn: () => saturationClient.getSaturationLog(id!),
    initialData: () => {
      if (!id || isOnline) {
        return undefined;
      }

      const data =
        queryClient.getQueryData<SaturationApiLog[]>([QUERY_KEYS.MEDICAL_LOGS_SATURATION_LOGS_LIST_ALL_GET]) ?? [];
      return data.find((elem) => elem.id === id);
    },
    staleTime: LOG_CACHE_TIME,
    gcTime: LOG_CACHE_TIME,
    placeholderData: keepPreviousData,
    ...options,
  });
}
