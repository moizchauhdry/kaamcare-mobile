import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { Allergies, Allergy } from '../../../../model/api/medicalHistory/Allergies';

export const useQueryAllergy = (
  id?: string,
  options?: Omit<UseQueryOptions<Allergy | null, ErrorResponse>, 'queryKey'>,
): UseQueryResult<Allergy | null, ErrorResponse> => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [QUERY_KEYS.MEDICAL_HISTORY_ALLERGY_GET, id],
    queryFn: (): Allergy | null => {
      if (!id) {
        return null;
      }

      const data = queryClient.getQueryData<Allergies>([QUERY_KEYS.MEDICAL_HISTORY_ALLERGIES_GET]) ?? [];
      return data.find((elem) => elem.userAllergyId === id) ?? null;
    },
    ...options,
  });
};
