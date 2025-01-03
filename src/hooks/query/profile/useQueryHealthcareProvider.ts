import { useQueryClient } from '@tanstack/react-query';

import type { HealthcareProvider } from 'model/api/ProfileInformation';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';

export const useQueryHealthcareProvider = (id: string): HealthcareProvider | undefined => {
  const queryClient = useQueryClient();
  return queryClient
    .getQueryData<HealthcareProvider[]>([QUERY_KEYS.PROFILE_HEALTHCARE_PROVIDER_LIST])
    ?.find((elem) => elem.healthcareProviderId === id);
};
