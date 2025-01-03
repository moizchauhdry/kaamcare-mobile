import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { ACPApiModel } from '../../../../model/api/goalsOfCare/ACPModel';
import { acpClient } from '../../../../services/http/ApiServices';

export const useQueryGetACP = (
  options?: Omit<UseQueryOptions<ACPApiModel, ErrorResponse>, 'queryKey'>,
): UseQueryResult<ACPApiModel, ErrorResponse> =>
  useQuery({
    queryKey: [QUERY_KEYS.GOALS_OF_CARE_ACP_GET],
    queryFn: () => acpClient.getACPData(),
    gcTime: Infinity,
    staleTime: Infinity,
    retry: 2,
    ...options,
  });
