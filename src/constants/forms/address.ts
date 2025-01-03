import type { RadioButtonProps } from 'components/UI/RadioButton/RadioButton';

import { AddressTypeEnum, OtherResidentialFacilityData } from '../enums/profile/profile';

export const addressTypePickerData = [
  {
    label: 'Home address',
    value: AddressTypeEnum.HomeAddress,
  },
  {
    label: 'Homeless shelter',
    value: AddressTypeEnum.HomelessShelter,
  },
];

export const otherRresidentialFacilityData: RadioButtonProps[] = [
  {
    id: '1',
    label: 'Assisted Living Facility',
    value: OtherResidentialFacilityData.AssistedLivingFacility,
  },
  {
    id: '2',
    label: 'Long Term Acute Care Facility',
    value: OtherResidentialFacilityData.LongTermAcuteCareFacility,
  },
  {
    id: '3',
    label: 'Memory Care Facility',
    value: OtherResidentialFacilityData.MemoryCareFacility,
  },
  {
    id: '4',
    label: 'Skilled Nursing Facility',
    value: OtherResidentialFacilityData.SkilledNursingFacility,
  },
];

export const toggleResidentialFacilitiesAlert = {
  title: 'Confirm your facility change',
  description: `You are about to disable the 'Other Residential Facility' option. Please be aware that this action will result in the loss of any data you have entered for this facility type.\n\nTo confirm and proceed with disabling the facility, resulting in data loss, select 'Yes, disable'. If you wish to retain the facility and your data, select 'Cancel'.`,
  proceed: 'Yes, disable',
  cancel: 'Cancel',
};

export const switchResidentialFacilitiesAlert = {
  title: 'Confirm your facility change',
  description: `Please note that this action will reset your entered data specific to the Assisted Living Facility.\n\nTo proceed with the change and lose the current data, select 'Confirm'. If you wish to keep your current data, select 'Cancel'.`,
  proceed: 'Yes, disable',
  cancel: 'Cancel',
  isSourceInfo: true,
};

export const formDefaultValues = {
  addressType: '',
  address: '',
  phoneNumber: '',
  isOtherOptions: false,
  residentialFacility: '',
  otherFacilityName: '',
  otherPhoneNumber: '',
  otherAddress: '',
};
