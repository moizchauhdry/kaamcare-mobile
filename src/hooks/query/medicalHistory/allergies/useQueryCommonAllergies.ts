import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { AllergiesSelectModels } from '../../../../model/api/medicalHistory/Allergies';
import { allergiesClient } from '../../../../services/http/ApiServices';

export const useQueryCommonAllergies = (
  options?: Omit<UseQueryOptions<AllergiesSelectModels, ErrorResponse>, 'queryKey'>,
): UseQueryResult<AllergiesSelectModels, ErrorResponse> =>
  useQuery({
    queryKey: [QUERY_KEYS.MEDICAL_HISTORY_COMMON_ALLERGIES_GET],
    queryFn: () => allergiesClient.getAllergies(),
    staleTime: Infinity,
    gcTime: Infinity,
    ...options,
  });
