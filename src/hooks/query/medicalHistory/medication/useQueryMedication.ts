import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { Medication, Medications } from '../../../../model/api/medicalHistory/Medications';

export const useQueryMedication = (
  id?: string,
  options?: Omit<UseQueryOptions<Medication, ErrorResponse>, 'queryKey'>,
): UseQueryResult<Medication | undefined, ErrorResponse> => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [QUERY_KEYS.MEDICAL_HISTORY_MEDICATION_GET, id],
    initialData: (): Medication | undefined => {
      if (!id) {
        return;
      }

      const data = queryClient.getQueryData<Medications>([QUERY_KEYS.MEDICAL_HISTORY_MEDICATIONS_GET]) ?? [];

      return data.find((elem) => elem.userMedicationId === id);
    },
    ...options,
  });
};
