import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { HealthcareProvider } from 'model/api/ProfileInformation';
import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';
import { profileClient } from '../../../services/http/ApiServices';

export function getHealthcareProviderRequestArgs(): UseQueryOptions<HealthcareProvider[], ErrorResponse> {
  return {
    queryKey: [QUERY_KEYS.PROFILE_HEALTHCARE_PROVIDER_LIST],
    queryFn: () => profileClient.getHealthcareProviders(),
  };
}

export const useQueryHealthcareProviderList = (
  options?: Omit<UseQueryOptions<HealthcareProvider[], ErrorResponse>, 'queryKey'>,
): UseQueryResult<HealthcareProvider[], ErrorResponse> => {
  const { queryKey, queryFn } = getHealthcareProviderRequestArgs();

  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
};
