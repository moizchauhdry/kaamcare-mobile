import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { immunizationClient } from '../../../../services/http/ApiServices';
import { sortByName } from '../../../../utils/array/array';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { VaccineCard } from '../../../../model/api/primaryPrevention/Immunization';

export function useQueryVaccineCardList(
  options?: Omit<UseQueryOptions<VaccineCard[], ErrorResponse>, 'queryKey'>,
): UseQueryResult<VaccineCard[], ErrorResponse> {
  return useQuery({
    queryKey: [QUERY_KEYS.PRIMARY_PREVENTION_VACCINES_CARD_LIST_GET],
    queryFn: () => immunizationClient.getAllVaccineCard().then((res) => sortByName(res, 'title')),
    retry: false,
    ...options,
  });
}
