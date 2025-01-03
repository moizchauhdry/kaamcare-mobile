import type { ProfileInformation } from 'model/api/ProfileInformation';
import type { PersonalInformationFormData } from 'schemas/forms/personalInformation';

import { formattedPhoneNumberStringToNumber, phoneNumberFormatter } from '../../../utils/formatter/phoneNumber';
import { changeKilogramToPound } from '../../../utils/units/mass';
import { changeCentimeterToFeetInch } from '../../../utils/units/length';

export const parseProfileInformationToApi = (data: PersonalInformationFormData): ProfileInformation => ({
  firstName: data.firstName || null,
  lastName: data.lastName || null,
  dateOfBirth: data.dateOfBirth ? data.dateOfBirth.toISOString() : null,
  phoneNumber: formattedPhoneNumberStringToNumber(data.phoneNumber) || null,
  bloodType: data.bloodType?.replace(' ', '') || null,
  gender: data.gender || null,
  currentWeight: data.weight ? parseFloat(data.weight) : null,
  currentHeight: data.height ? parseFloat(data.height) : null,
  email: data.email,
});

export const parseProfileInformationToForm = (
  data: ProfileInformation,
  length?: 'FeetInch' | 'Centimeter',
  mass?: 'Pound' | 'Kilogram',
): PersonalInformationFormData => {
  const labelHeight = changeCentimeterToFeetInch(data.currentHeight, length);
  const labelWeight = changeKilogramToPound(data.currentWeight, mass);
  return {
    firstName: data.firstName || null,
    lastName: data.lastName || null,
    email: data.email,
    dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
    phoneNumber: phoneNumberFormatter(data.phoneNumber),
    bloodType: data.bloodType?.toString() || null,
    gender: data.gender?.toString() || null,
    weight: data.currentWeight?.toString() || null,
    height: data.currentHeight?.toString() || null,
    labelHeight: labelHeight?.toFixed(2) || null,
    labelWeight: labelWeight?.toFixed(2) || null,
  };
};
