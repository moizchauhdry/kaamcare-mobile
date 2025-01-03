import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { familyHistoryClient } from '../../../../services/http/ApiServices';
import type { FamilyMemberDiagnosisModel } from '../../../../model/api/medicalHistory/FamilyHistory';

export function useQueryFamilyMembersDiagnosisList(
  options?: Omit<UseQueryOptions<FamilyMemberDiagnosisModel[], ErrorResponse>, 'queryKey'>,
): UseQueryResult<FamilyMemberDiagnosisModel[], ErrorResponse> {
  return useQuery({
    queryKey: [QUERY_KEYS.MEDICAL_HISTORY_FAMILY_HISTORY_DIAGNOSIS_LIST_GET],
    queryFn: () => familyHistoryClient.getFamilyHistory(),
    retry: false,
    gcTime: Infinity,
    staleTime: Infinity,
    ...options,
  });
}
