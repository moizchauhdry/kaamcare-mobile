import type { ACPApiModel } from '../../api/goalsOfCare/ACPModel';
import type { ACPFormData } from '../../../schemas/forms/goalsOfCare/acpSchema';
import { formattedPhoneNumberStringToNumber, phoneNumberFormatter } from '../../../utils/formatter/phoneNumber';

export const parseACPApiToFormData = (data: ACPApiModel): ACPFormData => {
  const acpForm: ACPFormData = {
    livingWill: {
      attachments: data.livingWillAttachments ?? [],
      value: data.livingWillSelectListValue ?? '',
      isActive: data.isLivingWillActive,
    },
    codeStatus: {
      explanation: data.codeStatusExplanation ?? '',
      value: data.codeStatusValue ?? '',
      isActive: data.isCodeStatusActive,
    },
    medical: {
      isActive: data.isMedicalPowerOfAttorneyActive,
      value: data.medicalPowerOfAttorneySelectListValue ?? '',
      name: data.medicalPowerOfAttorneyName ?? '',
      phone: phoneNumberFormatter(data.medicalPowerOfAttorneyPhone) ?? '',
    },
    religious: {
      isActive: data.isReligiousSpiritualPreferencesActive,
      explanation: data.religiousSpiritualPreferencesExplanation ?? '',
    },
    organ: {
      isActive: data.isOrganDonationActive,
      value: data.organDonationSelectListValue ?? '',
    },
  };

  return acpForm;
};

export const parseACPFormToApiData = (data: ACPFormData): ACPApiModel => ({
  livingWillAttachments: data.livingWill.attachments ?? [],
  isCodeStatusActive: data.codeStatus.isActive ?? false,
  codeStatusValue: data.codeStatus.value || 'None',
  codeStatusExplanation: data.codeStatus.explanation || '',
  isMedicalPowerOfAttorneyActive: data.medical.isActive ?? false,
  medicalPowerOfAttorneySelectListValue: data.medical.value || 'None',
  medicalPowerOfAttorneyName: data.medical.name || '',
  medicalPowerOfAttorneyPhone: formattedPhoneNumberStringToNumber(data.medical.phone) ?? '',
  isOrganDonationActive: data.organ.isActive ?? false,
  organDonationSelectListValue: data.organ.value || 'None',
  isReligiousSpiritualPreferencesActive: data.religious.isActive ?? false,
  religiousSpiritualPreferencesExplanation: data.religious.explanation || '',
  isLivingWillActive: data.livingWill.isActive ?? false,
  livingWillSelectListValue: data.livingWill.value || 'None',
});

export const parseACPDataToRenderFormat = (data: any) => [
  {
    key: 'codeStatus',
    isActive: data.isCodeStatusActive,
    value: data.codeStatusValue ? [data.codeStatusValue] : undefined,
    explanation: data.codeStatusExplanation ?? undefined,
  },
  {
    key: 'livingWill',
    isActive: data.isLivingWillActive,
    value: data.livingWillSelectListValue ? [data.livingWillSelectListValue] : undefined,
    attachments: data.livingWillAttachments ?? [],
  },
  {
    key: 'medical',
    isActive: data.isMedicalPowerOfAttorneyActive,
    value: data.medicalPowerOfAttorneySelectListValue ? [data.medicalPowerOfAttorneySelectListValue] : undefined,
    name: data.medicalPowerOfAttorneyName ?? undefined,
    phone: data.medicalPowerOfAttorneyPhone ?? undefined,
  },
  {
    key: 'religious',
    isActive: data.isReligiousSpiritualPreferencesActive,
    explanation: data.religiousSpiritualPreferencesExplanation ?? undefined,
  },
  {
    key: 'organ',
    isActive: data.isOrganDonationActive,
    value: data.organDonationSelectListValue,
  },
];
