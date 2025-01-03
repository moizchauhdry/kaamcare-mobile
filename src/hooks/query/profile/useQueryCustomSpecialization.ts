import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { CustomSpecialization } from 'model/api/ProfileInformation';
import type { ErrorResponse } from 'model/api/common/Error';
import { profileClient } from 'services/http/ApiServices';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';

export const useQueryCustomSpecialization = (
  options?: Omit<UseQueryOptions<CustomSpecialization[], ErrorResponse>, 'queryKey'>,
): UseQueryResult<CustomSpecialization[], ErrorResponse> =>
  useQuery({
    queryKey: [QUERY_KEYS.CUSTOM_SPECIALIZATION_GET],
    queryFn: () => profileClient.getCustomSpecialization(),
    staleTime: Infinity,
    gcTime: Infinity,
    ...options,
  });
