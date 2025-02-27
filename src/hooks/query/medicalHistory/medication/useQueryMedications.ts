import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { Medications } from '../../../../model/api/medicalHistory/Medications';
import { medicationsClient } from '../../../../services/http/ApiServices';
import { sortByName } from '../../../../utils/array/array';

export const useQueryMedications = (
  options?: Omit<UseQueryOptions<Medications, ErrorResponse>, 'queryKey'>,
): UseQueryResult<Medications, ErrorResponse> =>
  useQuery({
    queryKey: [QUERY_KEYS.MEDICAL_HISTORY_MEDICATIONS_GET],
    queryFn: () => medicationsClient.getUserMedications().then((res) => sortByName(res, 'medication_name')),
    ...options,
  });
