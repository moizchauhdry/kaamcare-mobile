import type { MutationKeys } from './queryKeys';
import { QUERY_KEYS } from './queryKeys';

export type HearingHistoryKeys = {
  hearingDiagnosis: MutationKeys;
  hearingAidsCochlearImplants: MutationKeys;
  hearingTests: MutationKeys;
};

export const getHearingHistoryKeys = (id?: string): HearingHistoryKeys => ({
  hearingDiagnosis: {
    list: [QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_ALL_LIST_GET],
    add: [QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_DIAGNOSIS_ADD],
    mutation: [QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_DIAGNOSIS_UPDATE],
    single: [QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_DIAGNOSIS_GET, id],
    delete: [QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_DIAGNOSIS_DELETE],
  },
  hearingAidsCochlearImplants: {
    list: [QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_ALL_LIST_GET],
    add: [QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_AIDS_ADD],
    mutation: [QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_AIDS_UPDATE],
    single: [QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_AIDS_GET, id],
    delete: [QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_AIDS_DELETE],
  },
  hearingTests: {
    list: [QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_ALL_LIST_GET],
    add: [QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_TESTS_ADD],
    mutation: [QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_TESTS_UPDATE],
    single: [QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_TESTS_GET, id],
    delete: [QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_TESTS_DELETE],
  },
});

export type HearingHistoryName = keyof HearingHistoryKeys;
