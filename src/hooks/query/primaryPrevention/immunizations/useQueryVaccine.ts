import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { immunizationClient } from '../../../../services/http/ApiServices';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { Vaccine } from '../../../../model/api/primaryPrevention/Immunization';

export function useQueryVaccine(
  id: string,
  options?: Omit<UseQueryOptions<Vaccine | null, ErrorResponse>, 'queryKey'>,
): UseQueryResult<Vaccine | null, ErrorResponse> {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [QUERY_KEYS.PRIMARY_PREVENTION_VACCINE_GET, id],
    queryFn: () => immunizationClient.getVaccine(id).then((res) => ({ ...res, diagnosisDate: res.date })),
    initialData: () => {
      if (!id) {
        return null;
      }

      const data = queryClient.getQueryData<Vaccine[]>([QUERY_KEYS.PRIMARY_PREVENTION_VACCINES_LIST_GET]) ?? [];

      return data.find((vaccine) => vaccine.id === id);
    },
    retry: false,
    enabled: Boolean(id),
    ...options,
  });
}
