import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { Optional } from '@tanstack/react-query/build/modern';
import { keepPreviousData } from '@tanstack/react-query/build/modern';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { BloodSugarLogs } from '../../../../model/api/medicalLogs/BloodSugar';
import { LOG_LIST_CACHE_TIME } from '../../../../constants/query/medicalLogs/logs';
import { bloodSugarClient } from '../../../../services/http/ApiServices';
import type { DateFilterModel } from '../../../../model/api/common/Date';

export const useQueryBloodSugarLogsList = (
  filters: DateFilterModel,
  options?: Optional<UseQueryOptions<BloodSugarLogs, ErrorResponse>, 'queryKey'>,
): UseQueryResult<BloodSugarLogs, ErrorResponse> =>
  useQuery({
    queryKey: options?.queryKey || [
      QUERY_KEYS.MEDICAL_LOGS_BLOOD_SUGAR_LOGS_LIST_GET,
      filters.startDate,
      filters.endDate,
    ],
    queryFn: () => bloodSugarClient.getBloodSugarFragment({ startDate: filters.startDate, endDate: filters.endDate }),
    retry: 1,
    gcTime: LOG_LIST_CACHE_TIME,
    staleTime: LOG_LIST_CACHE_TIME,
    placeholderData: keepPreviousData,
    ...options,
  });
