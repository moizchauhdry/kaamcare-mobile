import { useQueryClient } from '@tanstack/react-query';

import { getDentalHistoryKeys } from '../../../../constants/query/dentalHistory';
import type {
  DentalHistory,
  DentalHistoryAllApiModel,
  DentalHistoryName,
} from '../../../../model/api/medicalHistory/DentalHistory';

export function useQueryDentalHistorySingle(
  dentalHistoryName: DentalHistoryName,
  id?: string,
  enabled?: boolean,
): DentalHistory | null {
  const queryClient = useQueryClient();
  const keys = getDentalHistoryKeys(id);

  if (!enabled || !id) {
    return null;
  }

  const data = queryClient.getQueryData<DentalHistoryAllApiModel>(keys.list)?.[dentalHistoryName] ?? [];

  return data.find((elem) => elem.id === id) ?? null;
}
