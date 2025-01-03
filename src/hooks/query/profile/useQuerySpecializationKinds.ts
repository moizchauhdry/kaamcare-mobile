import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';
import type { SpecializationKinds } from 'model/api/ProfileInformation';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';
import { profileClient } from '../../../services/http/ApiServices';

export const useQuerySpecializationKinds = (
  options?: Omit<UseQueryOptions<SpecializationKinds, ErrorResponse>, 'queryKey'>,
): UseQueryResult<SpecializationKinds, ErrorResponse> =>
  useQuery({
    queryKey: [QUERY_KEYS.SPECIALIZATION_KINDS_GET],
    queryFn: () => profileClient.getSpecializationKinds(),
    ...options,
  });
