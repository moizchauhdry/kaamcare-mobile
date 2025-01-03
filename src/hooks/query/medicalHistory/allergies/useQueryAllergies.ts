import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { Allergies } from '../../../../model/api/medicalHistory/Allergies';
import { allergiesClient } from '../../../../services/http/ApiServices';
import { sortByName } from '../../../../utils/array/array';

export const useQueryAllergies = (
  options?: Omit<UseQueryOptions<Allergies, ErrorResponse>, 'queryKey'>,
): UseQueryResult<Allergies, ErrorResponse> =>
  useQuery({
    queryKey: [QUERY_KEYS.MEDICAL_HISTORY_ALLERGIES_GET],
    queryFn: () => allergiesClient.getUserAllergies().then((res) => sortByName(res, 'allergyName')),
    ...options,
  });
