import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { onlineManager, useQuery } from '@tanstack/react-query';
import type { Optional } from '@tanstack/react-query/build/modern';
import { keepPreviousData } from '@tanstack/react-query/build/modern';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { BloodPressureLogs } from '../../../../model/api/medicalLogs/BloodPressure';
import { bloodPressureClient } from '../../../../services/http/ApiServices';
import type { DateFilterModel } from '../../../../model/api/common/Date';
import { selectDataBasedOnDate } from '../../../../utils/query/querySelectData';
import { CACHE_WEEK } from '../../../../constants/query/cachesTime';

export const useQueryBloodPressureListAll = (
  filters: DateFilterModel,
  options?: Optional<UseQueryOptions<BloodPressureLogs, ErrorResponse>, 'queryKey'>,
): UseQueryResult<BloodPressureLogs, ErrorResponse> =>
  useQuery({
    queryKey: [QUERY_KEYS.MEDICAL_LOGS_BLOOD_PRESSURE_LOGS_LIST_ALL_GET],
    queryFn: () => bloodPressureClient.getBloodPressureAll(),
    retry: 1,
    gcTime: CACHE_WEEK,
    staleTime: CACHE_WEEK,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    networkMode: 'offlineFirst',
    select: !onlineManager.isOnline() ? (data) => selectDataBasedOnDate(data, filters) : () => [],
    ...options,
  });
