import type { SeparatedDateModel } from '../common/Date';
import type { AttachmentApiSmallModel, AttachmentModel } from '../common/Attachment';

export type MedicalDevicesAllApiModel = {
  medicalDevices: MedicalDevice[];
};

export interface MedicalDevice extends NewMedicalDevice {
  id: string;
}

export type NewMedicalDevice = {
  name: string;
  diagnosisDate: SeparatedDateModel | null;
  explanation?: string | null;
  isCommonName?: boolean;
  attachments?: (AttachmentModel | AttachmentApiSmallModel)[];
};
