import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { onlineManager, useQuery, useQueryClient } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query/build/modern';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { weightClient } from '../../../../services/http/ApiServices';
import { LOG_CACHE_TIME } from '../../../../constants/query/medicalLogs/logs';
import type { WeightApiLog } from '../../../../model/api/medicalLogs/Weight';

export function useQueryWeightLog(
  id?: string,
  options?: Omit<UseQueryOptions<WeightApiLog, ErrorResponse>, 'queryKey'>,
): UseQueryResult<WeightApiLog | undefined, ErrorResponse> {
  const isOnline = onlineManager.isOnline();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [QUERY_KEYS.MEDICAL_LOGS_WEIGHT_GET, id],
    queryFn: () => weightClient.getLog(id!),
    initialData: () => {
      if (!id || isOnline) {
        return undefined;
      }

      const data = queryClient.getQueryData<WeightApiLog[]>([QUERY_KEYS.MEDICAL_LOGS_WEIGHT_LIST_ALL_GET]) ?? [];
      return data.find((elem) => elem.id === id);
    },
    placeholderData: keepPreviousData,
    staleTime: LOG_CACHE_TIME,
    gcTime: LOG_CACHE_TIME,
    ...options,
  });
}
