import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';
import { userClient } from 'services/http/ApiServices';

export function getFeaturesRequestArgs(): UseQueryOptions<void, ErrorResponse> {
  return {
    queryKey: ['TEST', 'IDENTITY'],
    queryFn: () => userClient.getIdentity(),
  };
}

export const useQueryGetIdentity = (
  options?: UseQueryOptions<void, ErrorResponse>,
): UseQueryResult<void, ErrorResponse> => {
  const { queryKey, queryFn } = getFeaturesRequestArgs();

  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
};
