import type { SeparatedDateModel } from '../common/Date';

export type DentalHistoryName = keyof DentalHistoryAllApiModel;
export type DentalHistoryType = 'Diagnosis' | 'Prothetics' | 'Ontogram';

export type DentalHistoryAllApiModel = {
  dentalDiagnosis: DentalHistory[];
  dentalProthetics: DentalHistory[];
  dentalOntograms: DentalHistory[];
};

export type NewDentalHistory = {
  name: string;
  date: SeparatedDateModel | null;
  explanation?: string | null;
  type: DentalHistoryType;
  attachments?: any;
  isCommonName?: boolean;
};

export interface DentalHistory extends NewDentalHistory {
  id: string;
}
