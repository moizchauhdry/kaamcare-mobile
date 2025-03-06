import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { Optional } from '@tanstack/react-query/build/modern';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { HeightLogs } from '../../../../model/api/medicalLogs/Height';
import { heightClient } from '../../../../services/http/ApiServices';
import type { DateFilterModel } from '../../../../model/api/common/Date';
import { LOG_LIST_CACHE_TIME } from '../../../../constants/query/medicalLogs/logs';

export const useQueryHeightLogsList = (
  filters: DateFilterModel,
  options?: Optional<UseQueryOptions<HeightLogs, ErrorResponse>, 'queryKey'>,
): UseQueryResult<HeightLogs, ErrorResponse> =>
  useQuery({
    queryKey: options?.queryKey || [QUERY_KEYS.MEDICAL_LOGS_HEIGHT_LIST_GET, filters.startDate, filters.endDate],
    queryFn: ({ signal }) =>
      // heightClient.getHeightFragment({ startDate: filters.startDate, endDate: filters.endDate }, signal),
      heightClient.getHeightAll(),
    retry: 1,
    placeholderData: keepPreviousData,
    staleTime: LOG_LIST_CACHE_TIME,
    gcTime: LOG_LIST_CACHE_TIME,
    ...options,
  });
