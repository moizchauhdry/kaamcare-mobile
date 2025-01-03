import { useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import type { Diagnosis } from '../../../../model/api/medicalHistory/Diagnosis';

export const useQueryDiagnosis = (id?: string): Diagnosis | null => {
  const queryClient = useQueryClient();

  if (!id) {
    return null;
  }

  // const cachedItem = queryClient.getQueryData<Diagnosis>([QUERY_KEYS.MEDICAL_HISTORY_DIAGNOSIS_GET, id]);
  //
  // if (cachedItem) {
  //   return cachedItem;
  // }

  const data = queryClient.getQueryData<Diagnosis[]>([QUERY_KEYS.MEDICAL_HISTORY_DIAGNOSIS_LIST_GET]) ?? [];
  const item = data.find((elem) => elem.id === id) ?? null;

  // if (item) {
  //   queryClient.setQueryData([QUERY_KEYS.MEDICAL_HISTORY_DIAGNOSIS_GET, id], item);
  // }

  return item;
};
