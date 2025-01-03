import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { onlineManager, useQuery, useQueryClient } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query/build/modern';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { HeightLog } from '../../../../model/api/medicalLogs/Height';
import { heightClient } from '../../../../services/http/ApiServices';
import { LOG_CACHE_TIME } from '../../../../constants/query/medicalLogs/logs';

export function useQueryHeightLog(
  id?: string,
  options?: Omit<UseQueryOptions<HeightLog, ErrorResponse>, 'queryKey'>,
): UseQueryResult<HeightLog | undefined, ErrorResponse> {
  const isOnline = onlineManager.isOnline();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [QUERY_KEYS.MEDICAL_LOGS_HEIGHT_GET, id],
    queryFn: () => heightClient.getLog(id!),
    placeholderData: keepPreviousData,
    initialData: () => {
      if (!id || isOnline) {
        return undefined;
      }

      const data = queryClient.getQueryData<HeightLog[]>([QUERY_KEYS.MEDICAL_LOGS_HEIGHT_LIST_ALL_GET]) ?? [];
      return data.find((elem) => elem.id === id);
    },
    staleTime: LOG_CACHE_TIME,
    gcTime: LOG_CACHE_TIME,
    ...options,
  });
}
