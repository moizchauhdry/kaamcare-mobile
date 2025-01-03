import { useQueryClient } from '@tanstack/react-query';

import type { VisionHistoryName } from '../../../../constants/query/visionHistory';
import { getVisionHistoryKeys } from '../../../../constants/query/visionHistory';
import type { VisionHistoryAllApiModel, VisionHistoryModel } from '../../../../model/api/medicalHistory/VisionHistory';

export function useQueryVisionHistorySingle(
  visionHistoryName: VisionHistoryName,
  id?: string,
  enabled?: boolean,
): VisionHistoryModel | null {
  const queryClient = useQueryClient();
  const keys = getVisionHistoryKeys(id)[visionHistoryName];

  if (!id || !enabled) {
    return null;
  }

  const data = queryClient.getQueryData<VisionHistoryAllApiModel>(keys.list)?.[visionHistoryName] ?? [];

  return data.find((elem) => elem.id === id) ?? null;
}
