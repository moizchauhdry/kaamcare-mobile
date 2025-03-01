import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { Optional } from '@tanstack/react-query/build/modern';
import { keepPreviousData } from '@tanstack/react-query/build/modern';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { BloodPressureLogs } from '../../../../model/api/medicalLogs/BloodPressure';
import { bloodPressureClient } from '../../../../services/http/ApiServices';
import type { DateFilterModel } from '../../../../model/api/common/Date';
import { LOG_LIST_CACHE_TIME } from '../../../../constants/query/medicalLogs/logs';

export const useQueryBloodPressureLogsList = (
  filters: DateFilterModel,
  options?: Optional<UseQueryOptions<BloodPressureLogs, ErrorResponse>, 'queryKey'>,
): UseQueryResult<BloodPressureLogs, ErrorResponse> =>
  useQuery({
    queryKey: options?.queryKey || [
      QUERY_KEYS.MEDICAL_LOGS_BLOOD_PRESSURE_LOGS_LIST_GET,
      // filters.startDate,
      // filters.endDate,
    ],
    queryFn: () => bloodPressureClient.getBloodPressureAll(),
    retry: 1,
    gcTime: 0,
    staleTime: 0,
    placeholderData: undefined,
    ...options,
  });
