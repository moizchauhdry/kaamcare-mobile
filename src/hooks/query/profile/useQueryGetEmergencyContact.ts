import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { EmergencyContact } from 'model/api/ProfileInformation';
import type { ErrorResponse } from 'model/api/common/Error';
import { profileClient } from 'services/http/ApiServices';

import { QUERY_KEYS } from '../../../constants/query/queryKeys';

export function getEmergencyContactRequestArgs(): UseQueryOptions<EmergencyContact, ErrorResponse> {
  return {
    queryKey: [QUERY_KEYS.PROFILE_EMERGENCY_CONTACT_GET],
    queryFn: () => profileClient.getEmergencyContact(),
  };
}

export const useQueryGetEmergencyContact = (
  options?: Omit<UseQueryOptions<EmergencyContact, ErrorResponse>, 'queryKey'>,
): UseQueryResult<EmergencyContact, ErrorResponse> => {
  const { queryKey, queryFn } = getEmergencyContactRequestArgs();

  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
};
