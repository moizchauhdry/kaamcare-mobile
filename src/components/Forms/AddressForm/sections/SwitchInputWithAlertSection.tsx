import { useFormContext, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import { View } from 'react-native';

import { TextInputControlled } from 'components/UI/Inputs/TextInput/TextInputControlled';
import { SwitchInputWithAlertControlled } from 'components/UI/Inputs/SwitchInput/SwitchInputWithAlertControlled';
import { RadioGroupWithAlertControlled } from 'components/UI/Inputs/RadioGroup/RadioGroupWithAlertControlled';
import {
  otherRresidentialFacilityData,
  switchResidentialFacilitiesAlert,
  toggleResidentialFacilitiesAlert,
} from 'constants/forms/address';
import { PhoneNumberInputControlled } from 'components/UI/Inputs/PhoneNumberInput/PhoneNumberInputControlled';
import { hasArrayNonFalsyValue } from 'utils/array/array';

export const SwitchInputWithAlertSection = () => {
  const { setValue, clearErrors } = useFormContext();

  const watchOtherOptions = useWatch({ name: 'isOtherOptions' });

  const watchOtherFacilityData = useWatch({
    name: ['otherAddress', 'otherFacilityName', 'otherPhoneNumber', 'residentialFacility'],
  });

  useEffect(() => {
    clearErrors(['isOtherOptions']);
  }, [clearErrors, watchOtherOptions]);

  const resetFacilityFields = () => {
    setValue('otherAddress', '');
    setValue('otherFacilityName', '');
    setValue('otherPhoneNumber', '');
  };

  return (
    <>
      <SwitchInputWithAlertControlled
        name="isOtherOptions"
        label="Other residential facility"
        inputProps={{
          isHorizontal: true,
          alertType: 'danger',
          isValidatingNonEmpty: true,
          isNonEmpty: hasArrayNonFalsyValue(watchOtherFacilityData),
          switchInputToggleOffAlertData: {
            ...toggleResidentialFacilitiesAlert,
            onProceed: () => {
              setValue('otherAddress', '');
              setValue('otherFacilityName', '');
              setValue('otherPhoneNumber', '');
              setValue('residentialFacility', '');
            },
          },
        }}
        labelProps={{ weight: 'semiBold' }}
      />
      <RadioGroupWithAlertControlled
        name="residentialFacility"
        items={otherRresidentialFacilityData}
        inputProps={{
          disabled: !watchOtherOptions,
          isValidatingNonEmpty: true,
          isNonEmpty: hasArrayNonFalsyValue(watchOtherFacilityData),
          radioButtonChangeAlertData: {
            ...switchResidentialFacilitiesAlert,
            onProceed: resetFacilityFields,
          },
          onPress: resetFacilityFields,
        }}
      >
        <View style={{ gap: 16 }}>
          <TextInputControlled name="otherFacilityName" label="Facility Name" inputProps={{ maxLength: 80 }} />
          <PhoneNumberInputControlled name="otherPhoneNumber" label="Phone number" />
          <TextInputControlled name="otherAddress" label="Address" inputProps={{ maxLength: 140, isWide: true }} />
        </View>
      </RadioGroupWithAlertControlled>
    </>
  );
};
