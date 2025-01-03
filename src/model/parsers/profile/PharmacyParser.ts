import type { Pharmacy } from 'model/api/ProfileInformation';

import type { PharmacyFormData } from '../../../schemas/forms/pharmacy';
import { formattedPhoneNumberStringToNumber, phoneNumberFormatter } from '../../../utils/formatter/phoneNumber';

export const parsePharmacyFormToApiData = (data: PharmacyFormData): Pharmacy => ({
  address: data.address || null,
  pharmacyName: data.name || null,
  pharmacyPhoneNumber: formattedPhoneNumberStringToNumber(data.phoneNumber),
});

export const parsePharmacyApiToFormData = (data: Pharmacy): PharmacyFormData => ({
  address: data.address || null,
  name: data.pharmacyName || null,
  phoneNumber: phoneNumberFormatter(data.pharmacyPhoneNumber),
});
