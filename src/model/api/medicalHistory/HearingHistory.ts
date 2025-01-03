import type { SeparatedDateModel } from '../common/Date';

export type HearingHistoryAllApiModel = {
  hearingDiagnosis: HearingHistory[];
  hearingTests: HearingHistory[];
  hearingAidsCochlearImplants: HearingHistory[];
};

export interface HearingHistory extends NewHearingHistory {
  id: string;
}

export type NewHearingHistory = {
  diagnosisDate: SeparatedDateModel | null;
  name: string;
  location?: string[] | string | null;
  explanation?: string | null;
  attachments?: any | null;
  isCommonName?: boolean;
};
