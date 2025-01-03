import type { Caregiver } from 'model/api/ProfileInformation';

import { formattedPhoneNumberStringToNumber, phoneNumberFormatter } from '../../../utils/formatter/phoneNumber';
import type { CaregiverFormData } from '../../../schemas/forms/caregiver';

export const parseCaregiverFormToApiData = (data: CaregiverFormData): Caregiver => ({
  firstName: data.caregiverFirstName || null,
  lastName: data.caregiverLastName || null,
  phoneNumber: formattedPhoneNumberStringToNumber(data.caregiverPhoneNumber),
  isCaregiverSet: data.isCaregiver ?? false,

  isNursingSet: data.isHomeNursing ?? false,
  nursingPhoneNumber: formattedPhoneNumberStringToNumber(data.homeNursingPhoneNumber),
  nursingServiceName: data.homeNursingServiceName || null,

  isPhysicalTherapySet: data.isHomeTherapy ?? false,
  physicalTherapyServiceName: data.homeTherapyServiceName || null,
  physicalTherapyPhoneNumber: formattedPhoneNumberStringToNumber(data.homeTherapyPhoneNumber),
});

export const parseCaregiverApiToFormData = (data: Caregiver): CaregiverFormData => ({
  isCaregiver: data.isCaregiverSet,
  caregiverFirstName: data.firstName,
  caregiverPhoneNumber: phoneNumberFormatter(data.phoneNumber),
  caregiverLastName: data.lastName,
  isHomeNursing: data.isNursingSet,
  homeNursingServiceName: data.nursingServiceName,
  homeNursingPhoneNumber: phoneNumberFormatter(data.nursingPhoneNumber),
  isHomeTherapy: data.isPhysicalTherapySet,
  homeTherapyServiceName: data.physicalTherapyServiceName,
  homeTherapyPhoneNumber: phoneNumberFormatter(data.physicalTherapyPhoneNumber),
});
