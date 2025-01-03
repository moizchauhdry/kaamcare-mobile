import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { ErrorResponse } from 'model/api/common/Error';

import { getSocialHistoryKeys } from '../../../../constants/query/socialHistory';
import type {
  SocialHistory,
  SocialHistoryAllApiModel,
  SocialHistoryName,
} from '../../../../model/api/medicalHistory/SocialHistory';

export function useQuerySocialHistorySingle(
  socialHistoryName: SocialHistoryName,
  id?: string,
  options?: Omit<UseQueryOptions<SocialHistory, ErrorResponse>, 'queryKey'>,
): UseQueryResult<SocialHistory | undefined, ErrorResponse> {
  const queryClient = useQueryClient();
  const keys = getSocialHistoryKeys(id);

  return useQuery({
    queryKey: keys.single,
    initialData: (): SocialHistory | undefined => {
      if (!id) {
        return;
      }

      const data = queryClient.getQueryData<SocialHistoryAllApiModel>(keys.list)?.[socialHistoryName] ?? [];

      return data.find((elem) => elem.id === id);
    },
    ...options,
  });
}
