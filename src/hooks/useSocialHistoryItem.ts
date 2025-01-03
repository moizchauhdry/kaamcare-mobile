import { useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '../constants/query/queryKeys';
import type { SocialHistoryAllApiModel } from '../model/api/medicalHistory/SocialHistory';

export const useSocialHistoryItem = (name: keyof SocialHistoryAllApiModel, type: string, enable?: boolean) => {
  const queryClient = useQueryClient();

  if (!enable) {
    return;
  }

  const data =
    queryClient.getQueryData<SocialHistoryAllApiModel>([QUERY_KEYS.MEDICAL_HISTORY_SOCIAL_HISTORY_LIST_GET])?.[name] ??
    [];

  return data.find((elem) => elem.type === type);
};
