import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ProfileInformation } from 'model/api/ProfileInformation';
import type { ErrorResponse } from 'model/api/common/Error';
import { profileClient } from 'services/http/ApiServices';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';

export function getProfileInformationRequestArgs(): UseQueryOptions<ProfileInformation, ErrorResponse> {
  return {
    queryKey: [QUERY_KEYS.PROFILE_INFORMATION_GET],
    queryFn: () => profileClient.getProfileInformation(),
  };
}

export const useQueryGetProfileInformation = (
  options?: Omit<UseQueryOptions<ProfileInformation, ErrorResponse>, 'queryKey'>,
): UseQueryResult<ProfileInformation, ErrorResponse> => {
  const { queryKey, queryFn } = getProfileInformationRequestArgs();

  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
};
