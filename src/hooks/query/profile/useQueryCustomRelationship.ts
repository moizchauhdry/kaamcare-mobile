import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { CustomRelationship } from 'model/api/ProfileInformation';
import type { ErrorResponse } from 'model/api/common/Error';
import { profileClient } from 'services/http/ApiServices';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';

export const useQueryCustomRelationship = (
  options?: Omit<UseQueryOptions<CustomRelationship[], ErrorResponse>, 'queryKey'>,
): UseQueryResult<CustomRelationship[], ErrorResponse> =>
  useQuery({
    queryKey: [QUERY_KEYS.CUSTOM_RELATIONSHIP_GET],
    queryFn: () => profileClient.getCustomRelationship(),
    gcTime: Infinity,
    staleTime: Infinity,
    ...options,
  });
