import type { AttachmentApiSmallModel, AttachmentModel } from '../common/Attachment';
import type { SeparatedDateModel } from '../common/Date';

export type VisionHistoryAllApiModel = {
  visionDiagnosis: VisionHistoryModel[];
  eyeWears: VisionHistoryModel[];
};

export interface VisionHistoryModel extends NewVisionHistoryModel {
  id: string;
}

export type NewVisionHistoryModel = {
  name: string;
  kind?: string;
  location: string[] | string | null;
  diagnosisDate: SeparatedDateModel | null;
  explanation: string | null;
  area: string[] | null;
  dueTo: string[] | null;
  extraInformation: string | null;
  attachments?: (AttachmentModel | AttachmentApiSmallModel)[] | null;
  isCommonName?: boolean;
};
