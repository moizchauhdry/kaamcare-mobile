import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { medicationsClient } from '../../../../services/http/ApiServices';
import type { MedicationsSelectModels } from '../../../../model/api/medicalHistory/Medications';

export const useQueryCommonMedications = (
  options?: Omit<UseQueryOptions<MedicationsSelectModels, ErrorResponse>, 'queryKey'>,
): UseQueryResult<MedicationsSelectModels, ErrorResponse> =>
  useQuery({
    queryKey: [QUERY_KEYS.MEDICAL_HISTORY_CUSTOM_MEDICATIONS_GET],
    queryFn: () => medicationsClient.getMedications(),
    staleTime: Infinity,
    gcTime: Infinity,
    ...options,
  });
