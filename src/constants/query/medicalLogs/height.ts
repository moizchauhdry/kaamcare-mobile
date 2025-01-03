import { QUERY_KEYS } from '../queryKeys';

export const getHeightKeys = (id?: string) => ({
  list: [QUERY_KEYS.MEDICAL_LOGS_HEIGHT_LIST_GET],
  add: [QUERY_KEYS.MEDICAL_LOGS_HEIGHT_ADD],
  mutation: [QUERY_KEYS.MEDICAL_LOGS_HEIGHT_UPDATE, id],
  single: [QUERY_KEYS.MEDICAL_LOGS_HEIGHT_GET, id],
  delete: [QUERY_KEYS.MEDICAL_LOGS_HEIGHT_DELETE, id],
});
