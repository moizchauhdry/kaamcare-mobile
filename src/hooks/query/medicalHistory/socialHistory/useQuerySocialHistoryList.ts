import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { getSocialHistoryKeys } from '../../../../constants/query/socialHistory';
import { socialHistoryClient } from '../../../../services/http/ApiServices';
import type { SocialHistoryAllApiModel } from '../../../../model/api/medicalHistory/SocialHistory';
import { sortByName } from '../../../../utils/array/array';

export function useQuerySocialHistoryList(
  options?: Omit<UseQueryOptions<SocialHistoryAllApiModel, ErrorResponse>, 'queryKey'>,
): UseQueryResult<SocialHistoryAllApiModel, ErrorResponse> {
  const keys = getSocialHistoryKeys();
  return useQuery({
    queryKey: keys.list,
    queryFn: () =>
      socialHistoryClient.getSocialHistoryList().then((res) => ({
        smoking: sortByName(res.smoking, 'type'),
        alcohol: sortByName(res.alcohol, 'type'),
        recreationalDrugUse: sortByName(res.recreationalDrugUse, 'type'),
        occupation: sortByName(res.occupation, 'type'),
      })),
    ...options,
  });
}
