import type { EmergencyContact } from 'model/api/ProfileInformation';
import type { EmergencyContactFormData } from 'schemas/forms/emergencyContact';
import { formattedPhoneNumberStringToNumber, phoneNumberFormatter } from 'utils/formatter/phoneNumber';

export const parseEmergencyContactFormToApiData = (data: EmergencyContactFormData): EmergencyContact => ({
  firstName: data.firstName || null,
  lastName: data.lastName || null,
  phoneNumber: formattedPhoneNumberStringToNumber(data.phoneNumber) || null,
  address: data.address || null,
  relationshipKind: data.relationshipKind || null,
});

export const parseEmergencyContactApiToFormData = (data: EmergencyContact): EmergencyContactFormData => ({
  firstName: data.firstName || '',
  lastName: data.lastName || '',
  phoneNumber: phoneNumberFormatter(data.phoneNumber),
  address: data.address || '',
  relationshipKind: data.relationshipKind || '',
});
