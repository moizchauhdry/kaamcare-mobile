import { useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { SurgicalHistory, SurgicalHistoryAllApiModel } from '../../../../model/api/medicalHistory/SurgicalHistory';

export const useQuerySurgicalHistory = (id?: string, enabled?: boolean): SurgicalHistory | null => {
  const queryClient = useQueryClient();

  if (!id || !enabled) {
    return null;
  }

  const data =
    queryClient.getQueryData<SurgicalHistoryAllApiModel>([QUERY_KEYS.MEDICAL_HISTORY_SURGICAL_HISTORY_LIST_GET])
      ?.surgicalHistory ?? [];

  return data.find((elem) => elem.id === id) ?? null;
};
