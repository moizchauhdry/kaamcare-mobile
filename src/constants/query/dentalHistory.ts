import type { MutationKeys } from './queryKeys';
import { QUERY_KEYS } from './queryKeys';

export const getDentalHistoryKeys = (id?: string): MutationKeys => ({
  list: [QUERY_KEYS.MEDICAL_HISTORY_DENTAL_HISTORY_LIST_GET],
  add: [QUERY_KEYS.MEDICAL_HISTORY_DENTAL_HISTORY_ADD],
  mutation: [QUERY_KEYS.MEDICAL_HISTORY_DENTAL_HISTORY_UPDATE],
  single: [QUERY_KEYS.MEDICAL_HISTORY_DENTAL_HISTORY_GET, id],
  delete: [QUERY_KEYS.MEDICAL_HISTORY_DENTAL_HISTORY_DELETE],
});
