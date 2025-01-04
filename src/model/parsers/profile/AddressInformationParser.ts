import type { AddressInformation } from 'model/api/ProfileInformation';
import { formattedPhoneNumberStringToNumber, phoneNumberFormatter } from 'utils/formatter/phoneNumber';

import type { AddressFormData } from '../../../schemas/forms/address';

export const parseAddressInformationFormToApiData = (data: AddressFormData): AddressInformation => ({
  addressType: data.addressType || null,
  address: data.address || null,
  otherResidentialFacilityType: data.residentialFacility || null,
  otherFacilityName: data.otherFacilityName || null,
  otherFacilityPhoneNumber: formattedPhoneNumberStringToNumber(data.otherPhoneNumber),
  otherFacilityAddress: data.otherAddress || null,
  otherFacilitySet: (data.residentialFacility || null) === null ? false : (data.isOtherOptions ?? false),
  homelessShelterFacilityName: data.facilityName || null,
  homelessShelterFacilityPhoneNumber: formattedPhoneNumberStringToNumber(data.phoneNumber),
});

export const parseAddressInformationApiToFormData = (data: AddressInformation): AddressFormData => ({
  addressType: data.addressType,
  address: data.address || null,
  residentialFacility: data.otherResidentialFacilityType || null,
  otherFacilityName: data.otherFacilityName || null,
  otherPhoneNumber: phoneNumberFormatter(data.otherFacilityPhoneNumber),
  otherAddress: data.otherFacilityAddress || null,
  isOtherOptions: data.otherFacilitySet ?? false,
  facilityName: data.homelessShelterFacilityName || null,
  phoneNumber: phoneNumberFormatter(data.homelessShelterFacilityPhoneNumber),
});
