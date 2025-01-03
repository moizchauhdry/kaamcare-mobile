import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { immunizationClient } from '../../../../services/http/ApiServices';
import { sortByName } from '../../../../utils/array/array';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { Vaccine } from '../../../../model/api/primaryPrevention/Immunization';

export function useQueryVacinesList(
  options?: Omit<UseQueryOptions<Vaccine[], ErrorResponse>, 'queryKey'>,
): UseQueryResult<Vaccine[], ErrorResponse> {
  return useQuery({
    queryKey: [QUERY_KEYS.PRIMARY_PREVENTION_VACCINES_LIST_GET],
    queryFn: () => immunizationClient.getAllVaccine().then((res) => sortByName(res, 'vaccineName')),
    retry: false,
    ...options,
  });
}
