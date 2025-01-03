import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { onlineManager, useQuery, useQueryClient } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query/build/modern';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { BloodSugarLog } from '../../../../model/api/medicalLogs/BloodSugar';
import { bloodSugarClient } from '../../../../services/http/ApiServices';
import { LOG_CACHE_TIME } from '../../../../constants/query/medicalLogs/logs';

export function useQueryBloodSugarLog(
  id?: string,
  options?: Omit<UseQueryOptions<BloodSugarLog, ErrorResponse>, 'queryKey'>,
): UseQueryResult<BloodSugarLog | undefined, ErrorResponse> {
  const isOnline = onlineManager.isOnline();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_SUGAR_LOG_SINGLE_GET, id],
    queryFn: () => bloodSugarClient.getBloodSugarLog(id!),
    initialData: () => {
      if (!id || isOnline) {
        return undefined;
      }

      const data =
        queryClient.getQueryData<BloodSugarLog[]>([QUERY_KEYS.MEDICAL_LOGS_BLOOD_SUGAR_LOGS_LIST_ALL_GET]) ?? [];
      return data.find((elem) => elem.id === id);
    },
    placeholderData: keepPreviousData,
    staleTime: LOG_CACHE_TIME,
    gcTime: LOG_CACHE_TIME,
    ...options,
  });
}
