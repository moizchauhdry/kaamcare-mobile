import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { onlineManager, useQuery } from '@tanstack/react-query';
import type { Optional } from '@tanstack/react-query/build/modern';
import { keepPreviousData } from '@tanstack/react-query/build/modern';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { heightClient } from '../../../../services/http/ApiServices';
import type { DateFilterModel } from '../../../../model/api/common/Date';
import { selectDataBasedOnDate } from '../../../../utils/query/querySelectData';
import { CACHE_WEEK } from '../../../../constants/query/cachesTime';
import type { HeightLogs } from '../../../../model/api/medicalLogs/Height';

export const useQueryHeightListAll = (
  filters: DateFilterModel,
  options?: Optional<UseQueryOptions<HeightLogs, ErrorResponse>, 'queryKey'>,
): UseQueryResult<HeightLogs, ErrorResponse> =>
  useQuery({
    queryKey: [QUERY_KEYS.MEDICAL_LOGS_HEIGHT_LIST_ALL_GET],
    queryFn: () => heightClient.getHeightAll(),
    retry: false,
    gcTime: CACHE_WEEK,
    staleTime: CACHE_WEEK,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    networkMode: 'offlineFirst',
    select: !onlineManager.isOnline() ? (data) => selectDataBasedOnDate(data, filters) : () => [],
    ...options,
  });
