import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { Pharmacy } from 'model/api/ProfileInformation';
import type { ErrorResponse } from 'model/api/common/Error';
import { profileClient } from 'services/http/ApiServices';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';

export const useQueryPharmacy = (
  options?: Omit<UseQueryOptions<Pharmacy, ErrorResponse>, 'queryKey'>,
): UseQueryResult<Pharmacy, ErrorResponse> =>
  useQuery({
    queryKey: [QUERY_KEYS.PROFILE_PHARMACY],
    queryFn: () => profileClient.getPharmacy(),
    ...options,
  });
