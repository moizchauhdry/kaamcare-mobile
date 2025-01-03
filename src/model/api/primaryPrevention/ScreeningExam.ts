import type { AttachmentApiSmallModel } from '../common/Attachment';
import type { SeparatedDateModel } from '../common/Date';

export type ScreeningExamsApiModel = {
  screeningExams: ScreeningExam[];
};

export type ScreeningExamsCardApiModel = {
  screeningExamCards: ScreeningExamCard[];
};

export type NewScreeningExam = {
  date: SeparatedDateModel;
  explanation: string | null;
  isCommonName: boolean;
  attachments: Array<AttachmentApiSmallModel>;
  name: any | null;
};

export interface ScreeningExam extends NewScreeningExam {
  id: string;
}

export interface ScreeningExamCard extends NewScreeningExamCard {
  id: string;
}

export type NewScreeningExamCard = {
  title: string;
  explanation: string | null;
  attachments: any;
  date: SeparatedDateModel;
};

export type GroupedScreeningExamData = {
  name: string;
  data: ScreeningExam[];
};
