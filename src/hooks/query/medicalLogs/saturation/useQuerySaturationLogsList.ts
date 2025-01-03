import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query/build/modern/index';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { saturationClient } from '../../../../services/http/ApiServices';
import type { SaturationApiLog } from '../../../../model/api/medicalLogs/Saturation';
import { LOG_LIST_CACHE_TIME } from '../../../../constants/query/medicalLogs/logs';
import type { DateFilterModel } from '../../../../model/api/common/Date';

export const useQuerySaturationLogsList = (
  filters: DateFilterModel,
  options?: UseQueryOptions<SaturationApiLog[], ErrorResponse>,
): UseQueryResult<SaturationApiLog[], ErrorResponse> =>
  useQuery({
    queryKey: options?.queryKey || [
      QUERY_KEYS.MEDICAL_LOGS_SATURATION_LOGS_LIST_GET,
      filters.startDate,
      filters.endDate,
    ],
    queryFn: () => saturationClient.getSaturationFragment({ startDate: filters.startDate, endDate: filters.endDate }),
    retry: 1,
    gcTime: LOG_LIST_CACHE_TIME,
    staleTime: LOG_LIST_CACHE_TIME,
    placeholderData: keepPreviousData,
    ...options,
  });
