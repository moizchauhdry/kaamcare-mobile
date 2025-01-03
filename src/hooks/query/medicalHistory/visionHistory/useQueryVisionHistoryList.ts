import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { visionHistoryClient } from '../../../../services/http/ApiServices';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { VisionHistoryAllApiModel } from '../../../../model/api/medicalHistory/VisionHistory';
import { sortByName } from '../../../../utils/array/array';

export function useQueryVisionHistoryList(
  options?: Omit<UseQueryOptions<VisionHistoryAllApiModel, ErrorResponse>, 'queryKey'>,
): UseQueryResult<VisionHistoryAllApiModel, ErrorResponse> {
  return useQuery({
    queryKey: [QUERY_KEYS.MEDICAL_HISTORY_VISION_HISTORY_ALL_LIST_GET],
    queryFn: () =>
      visionHistoryClient.getUserVisionHistory().then((res) => ({
        visionDiagnosis: sortByName(res.visionDiagnosis, 'name'),
        eyeWears: sortByName(res.eyeWears, 'name'),
      })),
    retry: false,
    ...options,
  });
}
