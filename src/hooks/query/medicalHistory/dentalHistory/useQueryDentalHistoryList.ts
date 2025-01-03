import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { getDentalHistoryKeys } from '../../../../constants/query/dentalHistory';
import { dentalHistoryClient } from '../../../../services/http/ApiServices';
import type { DentalHistoryAllApiModel } from '../../../../model/api/medicalHistory/DentalHistory';
import { sortByName } from '../../../../utils/array/array';

export function useQueryDentalHistoryList(
  options?: Omit<UseQueryOptions<DentalHistoryAllApiModel, ErrorResponse>, 'queryKey'>,
): UseQueryResult<DentalHistoryAllApiModel, ErrorResponse> {
  const keys = getDentalHistoryKeys();
  return useQuery({
    queryKey: keys.list,
    queryFn: () =>
      dentalHistoryClient.getDentalHistoryList().then((res) => ({
        dentalDiagnosis: sortByName(res.dentalDiagnosis, 'name'),
        dentalOntograms: sortByName(res.dentalOntograms, 'name'),
        dentalProthetics: sortByName(res.dentalProthetics, 'name'),
      })),
    retry: false,
    ...options,
  });
}
