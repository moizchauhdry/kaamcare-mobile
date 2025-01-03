import type { SeparatedDateModel } from '../common/Date';
import type { AttachmentApiSmallModel, AttachmentModel } from '../common/Attachment';

export type DiagnosisAllApiModel = {
  diagnoses: DiagnosisApiModel[];
};

export type DiagnosisApiModel = {
  id: string;
  date: SeparatedDateModel;
  name: string;
  explanation?: string;
  attachments?: (AttachmentModel | AttachmentApiSmallModel)[];
};

export interface Diagnosis extends NewDiagnosis {
  id: string;
}

export type NewDiagnosis = {
  name: string;
  diagnosisDate?: SeparatedDateModel | null;
  explanation?: string | null;
  attachments?: (AttachmentModel | AttachmentApiSmallModel)[];
  isCommonName?: boolean;
};
