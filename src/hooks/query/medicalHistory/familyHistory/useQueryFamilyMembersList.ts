import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { FamilyMembersModel } from '../../../../model/api/medicalHistory/FamilyHistory';
import { familyHistoryClient } from '../../../../services/http/ApiServices';

export function useQueryFamilyMembersList(
  options?: Omit<UseQueryOptions<FamilyMembersModel, ErrorResponse>, 'queryKey'>,
): UseQueryResult<FamilyMembersModel, ErrorResponse> {
  return useQuery({
    queryKey: [QUERY_KEYS.MEDICAL_HISTORY_FAMILY_MEMBER_LIST],
    queryFn: () => familyHistoryClient.getFamilyMembers(),
    retry: false,
    gcTime: Infinity,
    staleTime: Infinity,
    ...options,
  });
}
