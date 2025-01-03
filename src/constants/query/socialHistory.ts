import type { MutationKeys } from './queryKeys';
import { QUERY_KEYS } from './queryKeys';

export const getSocialHistoryKeys = (id?: string): MutationKeys => ({
  list: [QUERY_KEYS.MEDICAL_HISTORY_SOCIAL_HISTORY_LIST_GET],
  add: [QUERY_KEYS.MEDICAL_HISTORY_SOCIAL_HISTORY_ADD],
  mutation: [QUERY_KEYS.MEDICAL_HISTORY_SOCIAL_HISTORY_UPDATE],
  single: [QUERY_KEYS.MEDICAL_HISTORY_SOCIAL_HISTORY_GET, id],
  delete: [QUERY_KEYS.MEDICAL_HISTORY_SOCIAL_HISTORY_DELETE],
});
