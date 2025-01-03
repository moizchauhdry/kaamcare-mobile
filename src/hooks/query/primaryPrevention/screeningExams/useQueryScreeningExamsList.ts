import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { screeningExamClient } from '../../../../services/http/ApiServices';
import { sortByName } from '../../../../utils/array/array';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { ScreeningExam } from '../../../../model/api/primaryPrevention/ScreeningExam';

export function useQueryScreeningExamsList(
  options?: Omit<UseQueryOptions<ScreeningExam[], ErrorResponse>, 'queryKey'>,
): UseQueryResult<ScreeningExam[], ErrorResponse> {
  return useQuery({
    queryKey: [QUERY_KEYS.PRIMARY_PREVENTION_SCREENING_EXAMS_LIST_GET],
    queryFn: () => screeningExamClient.getAllScreeningExam().then((res) => sortByName(res, 'name')),
    retry: false,
    ...options,
  });
}
