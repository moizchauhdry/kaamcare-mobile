import { useFormContext, useWatch } from 'react-hook-form';

import { PickerSelectControlled } from 'components/UI/Inputs/PickerSelect/PickerSelectControlled';
import { TextInputControlled } from 'components/UI/Inputs/TextInput/TextInputControlled';
import { PhoneNumberInputControlled } from 'components/UI/Inputs/PhoneNumberInput/PhoneNumberInputControlled';

import { AddressTypeEnum } from '../../../../constants/enums/profile/profile';
import { addressTypePickerData } from '../../../../constants/forms/address';

export const AddressFormAddressTypeSection = () => {
  const { setValue, clearErrors } = useFormContext();
  const watchAddressType = useWatch({ name: 'addressType' });

  const handlePickerSelectChange = (value: string) => {
    if (watchAddressType !== value) {
      setValue('addressType', value, { shouldDirty: true });
      clearErrors(['addressType', 'facilityName', 'address']);
    }
    if (watchAddressType === AddressTypeEnum.HomeAddress) {
      setValue('facilityName', '');
      setValue('phoneNumber', '');
    }
  };

  return (
    <>
      <PickerSelectControlled
        name="addressType"
        label="Address Type"
        items={addressTypePickerData}
        pickerSelectProps={{ onValueChange: handlePickerSelectChange }}
      />
      {watchAddressType === AddressTypeEnum.HomelessShelter && (
        <>
          <TextInputControlled name="facilityName" label="Facility Name" inputProps={{ maxLength: 80 }} />

          <PhoneNumberInputControlled name="phoneNumber" label="Phone number" />
        </>
      )}
      {watchAddressType !== null && (
        <TextInputControlled name="address" label="Address" inputProps={{ maxLength: 140, isWide: true }} />
      )}
    </>
  );
};
