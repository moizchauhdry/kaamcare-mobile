import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { screeningExamClient } from '../../../../services/http/ApiServices';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { ScreeningExam } from '../../../../model/api/primaryPrevention/ScreeningExam';

export function useQueryScreeningExam(
  id: string,
  options?: Omit<UseQueryOptions<ScreeningExam | null, ErrorResponse>, 'queryKey'>,
): UseQueryResult<ScreeningExam | null, ErrorResponse> {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [QUERY_KEYS.PRIMARY_PREVENTION_SCREENING_EXAM_GET, id],
    queryFn: () => screeningExamClient.getScreeningExam(id).then((res) => ({ ...res })),
    initialData: () => {
      if (!id) {
        return null;
      }

      const data =
        queryClient.getQueryData<ScreeningExam[]>([QUERY_KEYS.PRIMARY_PREVENTION_SCREENING_EXAMS_LIST_GET]) ?? [];

      return data.find((elem) => elem.id === id) ?? null;
    },
    retry: 1,
    enabled: Boolean(id),
    ...options,
  });
}
