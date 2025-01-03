import { useFormContext } from 'react-hook-form';
import { View } from 'react-native';

import { SwitchInputWithAlertControlled } from '../../../UI/Inputs/SwitchInput/SwitchInputWithAlertControlled';
import { toggleADLSectionAlert } from '../../../../constants/forms/goalsOfCare/adl';
import { RadioGroupWithAlertControlled } from '../../../UI/Inputs/RadioGroup/RadioGroupWithAlertControlled';
import { theme } from '../../../../config/Theme';
import { Typography } from '../../../UI/Typography/Typography';
import { TextInputControlled } from '../../../UI/Inputs/TextInput/TextInputControlled';
import { PhoneNumberInputControlled } from '../../../UI/Inputs/PhoneNumberInput/PhoneNumberInputControlled';
import { CardInputWrapper } from '../../../UI/CardInputWrapper/CardInputWrapper';

export const ACPMedicalSection = () => {
  const { setValue, watch } = useFormContext();
  const value = watch('medical.value');
  const name = watch('medical.name');
  const phone = watch('medical.phone');
  const isActive = watch('medical.isActive');

  return (
    <View style={{ gap: 8 }}>
      <SwitchInputWithAlertControlled
        name="medical.isActive"
        label="Medical Power of Attorney"
        inputProps={{
          isHorizontal: true,
          switchInputToggleOffAlertData: {
            ...toggleADLSectionAlert('Medical Power of Attorney'),
            onProceed: () => {
              setValue(`medical.value`, '');
              setValue('medical.name', '');
              setValue('medical.phone', '');
            },
          },
          enableAlert: value || name || phone,
        }}
        labelProps={{ weight: 'semiBold' }}
      />
      <CardInputWrapper>
        <RadioGroupWithAlertControlled
          name="medical.value"
          displayAsCard={false}
          inputProps={{ disabled: !isActive }}
          items={[
            {
              id: '1',
              value: 'Yes',
              label: 'Yes',
            },
            {
              id: '2',
              value: 'No',
              label: 'No',
            },
          ]}
        />
        <View
          style={{
            height: 1,
            backgroundColor: isActive ? theme.colors.lightBlue : theme.colors.gray100,
          }}
        />
        <Typography>Medical Power of Attorney data</Typography>
        <TextInputControlled name="medical.name" label="Name" inputProps={{ disabled: !isActive }} />
        <PhoneNumberInputControlled name="medical.phone" label="Phone number" inputProps={{ disabled: !isActive }} />
      </CardInputWrapper>
    </View>
  );
};
