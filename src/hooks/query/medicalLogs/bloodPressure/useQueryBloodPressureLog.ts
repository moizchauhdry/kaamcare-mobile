import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { onlineManager, useQuery, useQueryClient } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query/build/modern';

import type { ErrorResponse } from 'model/api/common/Error';

import type { BloodPressureLog } from '../../../../model/api/medicalLogs/BloodPressure';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { bloodPressureClient } from '../../../../services/http/ApiServices';

const CACHE_TIME = 1000 * 60 * 60 * 24;

export function useQueryBloodPressureLog(
  id?: string,
  options?: Omit<UseQueryOptions<BloodPressureLog, ErrorResponse>, 'queryKey'>,
): UseQueryResult<BloodPressureLog | undefined, ErrorResponse> {
  const isOnline = onlineManager.isOnline();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_PRESSURE_LOG_SINGLE_GET, id],
    queryFn: () => bloodPressureClient.getLog(id!),
    initialData: () => {
      if (!id || isOnline) {
        return undefined;
      }

      const data =
        queryClient.getQueryData<BloodPressureLog[]>([QUERY_KEYS.MEDICAL_LOGS_BLOOD_PRESSURE_LOGS_LIST_ALL_GET]) ?? [];
      return data.find((elem) => elem.id === id);
    },
    placeholderData: keepPreviousData,
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME,
    ...options,
  });
}
