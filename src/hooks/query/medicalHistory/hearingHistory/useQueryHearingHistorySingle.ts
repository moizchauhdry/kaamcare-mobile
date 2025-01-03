import { useQueryClient } from '@tanstack/react-query';

import type { HearingHistoryName } from '../../../../constants/query/hearingHistory';
import { getHearingHistoryKeys } from '../../../../constants/query/hearingHistory';
import type { HearingHistory, HearingHistoryAllApiModel } from '../../../../model/api/medicalHistory/HearingHistory';

export function useQueryHearingHistorySingle(
  hearingHistoryName: HearingHistoryName,
  id?: string,
  enabled?: boolean,
): HearingHistory | null {
  const queryClient = useQueryClient();
  const keys = getHearingHistoryKeys(id)[hearingHistoryName];

  if (!id || !enabled) {
    return null;
  }

  const data = queryClient.getQueryData<HearingHistoryAllApiModel>(keys.list)?.[hearingHistoryName] ?? [];

  return data.find((elem) => elem.id === id) ?? null;
}
