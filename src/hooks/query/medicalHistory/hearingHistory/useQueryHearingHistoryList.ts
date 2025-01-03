import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { hearingHistoryClient } from '../../../../services/http/ApiServices';
import type { HearingHistoryAllApiModel } from '../../../../model/api/medicalHistory/HearingHistory';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { sortByName } from '../../../../utils/array/array';

export function useQueryHearingHistoryList(
  options?: Omit<UseQueryOptions<HearingHistoryAllApiModel, ErrorResponse>, 'queryKey'>,
): UseQueryResult<HearingHistoryAllApiModel, ErrorResponse> {
  return useQuery({
    queryKey: [QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_ALL_LIST_GET],
    queryFn: () =>
      hearingHistoryClient.getUserHearingHistory().then((res) => ({
        hearingDiagnosis: sortByName(res.hearingDiagnosis, 'name'),
        hearingTests: sortByName(res.hearingTests, 'name'),
        hearingAidsCochlearImplants: sortByName(res.hearingAidsCochlearImplants, 'name'),
      })),
    retry: false,
    ...options,
  });
}
