import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { adlClient } from '../../../../services/http/ApiServices';
import type { ADLSections } from '../../../../model/api/goalsOfCare/ADLModel';

export const useQueryGetADL = (
  options?: Omit<UseQueryOptions<ADLSections, ErrorResponse>, 'queryKey'>,
): UseQueryResult<ADLSections, ErrorResponse> =>
  useQuery({
    queryKey: [QUERY_KEYS.GOALS_OF_CARE_ADL_GET],
    queryFn: () => adlClient.getADLData(),
    gcTime: Infinity,
    staleTime: Infinity,
    ...options,
  });
