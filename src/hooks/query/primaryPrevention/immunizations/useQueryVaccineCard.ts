import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { immunizationClient } from '../../../../services/http/ApiServices';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { VaccineCard } from '../../../../model/api/primaryPrevention/Immunization';

export function useQueryVaccineCard(
  id: string,
  options?: Omit<UseQueryOptions<VaccineCard | null, ErrorResponse>, 'queryKey'>,
): UseQueryResult<VaccineCard | null, ErrorResponse> {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [QUERY_KEYS.PRIMARY_PREVENTION_VACCINE_CARD_GET, id],
    queryFn: () => immunizationClient.getVaccineCard(id),
    initialData: () => {
      if (!id) {
        return null;
      }

      const data =
        queryClient.getQueryData<VaccineCard[]>([QUERY_KEYS.PRIMARY_PREVENTION_VACCINES_CARD_LIST_GET]) ?? [];

      return data.find((elem) => elem.id === id) ?? null;
    },
    retry: false,
    enabled: Boolean(id),
    ...options,
  });
}
