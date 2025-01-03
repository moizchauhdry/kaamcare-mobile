import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { Caregiver } from 'model/api/ProfileInformation';
import type { ErrorResponse } from 'model/api/common/Error';
import { profileClient } from 'services/http/ApiServices';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';

export const useQueryCaregiverGet = (
  options?: Omit<UseQueryOptions<Caregiver, ErrorResponse>, 'queryKey'>,
): UseQueryResult<Caregiver, ErrorResponse> =>
  useQuery({
    queryKey: [QUERY_KEYS.PROFILE_CAREGIVER_GET],
    queryFn: () => profileClient.getCaregiver(),
    ...options,
  });
