import type { MutationKeys } from './queryKeys';
import { QUERY_KEYS } from './queryKeys';

export type VisionHistoryKeys = {
  visionDiagnosis: MutationKeys;
  eyeWears: MutationKeys;
};

export const getVisionHistoryKeys = (id?: string): VisionHistoryKeys => ({
  visionDiagnosis: {
    list: [QUERY_KEYS.MEDICAL_HISTORY_VISION_HISTORY_ALL_LIST_GET],
    add: [QUERY_KEYS.MEDICAL_HISTORY_VISION_HISTORY_VISION_DIAGNOSIS_ADD],
    mutation: [QUERY_KEYS.MEDICAL_HISTORY_VISION_HISTORY_VISION_DIAGNOSIS_UPDATE],
    single: [QUERY_KEYS.MEDICAL_HISTORY_VISION_HISTORY_VISION_DIAGNOSIS_GET, id],
    delete: [QUERY_KEYS.MEDICAL_HISTORY_VISION_HISTORY_VISION_DIAGNOSIS_DELETE],
  },
  eyeWears: {
    list: [QUERY_KEYS.MEDICAL_HISTORY_VISION_HISTORY_ALL_LIST_GET],
    add: [QUERY_KEYS.MEDICAL_HISTORY_VISION_HISTORY_EYEWEAR_ADD],
    mutation: [QUERY_KEYS.MEDICAL_HISTORY_VISION_HISTORY_EYEWEAR_UPDATE],
    single: [QUERY_KEYS.MEDICAL_HISTORY_VISION_HISTORY_EYEWEAR_GET, id],
    delete: [QUERY_KEYS.MEDICAL_HISTORY_VISION_HISTORY_EYEWEAR_DELETE],
  },
});

export type VisionHistoryName = keyof VisionHistoryKeys;
