import type { SeparatedDateModel } from '../common/Date';
import type { AttachmentApiSmallModel, AttachmentModel } from '../common/Attachment';

export type SurgicalHistoryAllApiModel = {
  surgicalHistory: SurgicalHistory[];
};

export interface SurgicalHistory extends NewSurgicalHistory {
  id: string;
}

export type NewSurgicalHistory = {
  name: string;
  diagnosisDate: SeparatedDateModel | null;
  explanation?: string | null;
  attachments?: (AttachmentModel | AttachmentApiSmallModel)[];
  isCommonName?: boolean;
};
