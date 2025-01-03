import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { SurgicalHistoryAllApiModel } from '../../../../model/api/medicalHistory/SurgicalHistory';
import { surgicalHistoryClient } from '../../../../services/http/ApiServices';
import { sortByName } from '../../../../utils/array/array';

export const useQuerySurgicalHistoryList = (
  options?: Omit<UseQueryOptions<SurgicalHistoryAllApiModel, ErrorResponse>, 'queryKey'>,
): UseQueryResult<SurgicalHistoryAllApiModel, ErrorResponse> =>
  useQuery({
    queryKey: [QUERY_KEYS.MEDICAL_HISTORY_SURGICAL_HISTORY_LIST_GET],
    queryFn: () =>
      surgicalHistoryClient.getSurgicalHistoryList().then((res) => ({
        surgicalHistory: sortByName(res.surgicalHistory, 'name'),
      })),
    ...options,
    retry: 2,
  });
