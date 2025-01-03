import type { AttachmentApiSmallModel, AttachmentModel } from '../common/Attachment';

export type ACPApiModel = {
  livingWillAttachments?: (AttachmentModel | AttachmentApiSmallModel)[];
  isCodeStatusActive: boolean;
  codeStatusValue: string;
  codeStatusExplanation?: string;
  isMedicalPowerOfAttorneyActive: boolean;
  medicalPowerOfAttorneySelectListValue: string;
  medicalPowerOfAttorneyName?: string;
  medicalPowerOfAttorneyPhone?: string;
  isOrganDonationActive: boolean;
  organDonationSelectListValue: string;
  isReligiousSpiritualPreferencesActive: boolean;
  religiousSpiritualPreferencesExplanation?: string;
  isLivingWillActive: boolean;
  livingWillSelectListValue: string;
};
