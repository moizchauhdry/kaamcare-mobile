import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { onlineManager, useQuery } from '@tanstack/react-query';
import type { Optional } from '@tanstack/react-query/build/modern';
import { keepPreviousData } from '@tanstack/react-query/build/modern';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { weightClient } from '../../../../services/http/ApiServices';
import type { DateFilterModel } from '../../../../model/api/common/Date';
import { selectDataBasedOnDate } from '../../../../utils/query/querySelectData';
import { CACHE_WEEK } from '../../../../constants/query/cachesTime';
import type { WeightLogs } from '../../../../model/api/medicalLogs/Weight';

export const useQueryWeightListAll = (
  filters: DateFilterModel,
  options?: Optional<UseQueryOptions<WeightLogs, ErrorResponse>, 'queryKey'>,
): UseQueryResult<WeightLogs, ErrorResponse> =>
  useQuery({
    queryKey: [QUERY_KEYS.MEDICAL_LOGS_WEIGHT_LIST_ALL_GET],
    queryFn: () => weightClient.getWeightAll(),
    retry: 1,
    gcTime: CACHE_WEEK,
    staleTime: CACHE_WEEK,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    networkMode: 'offlineFirst',
    select: !onlineManager.isOnline() ? (data) => selectDataBasedOnDate(data, filters) : () => [],
    ...options,
  });
