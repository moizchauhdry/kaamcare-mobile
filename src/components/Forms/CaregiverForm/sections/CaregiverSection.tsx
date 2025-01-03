import { useFormContext, useWatch } from 'react-hook-form';
import { View } from 'react-native';

import { TextInputControlled } from 'components/UI/Inputs/TextInput/TextInputControlled';
import { SwitchInputWithAlertControlled } from 'components/UI/Inputs/SwitchInput/SwitchInputWithAlertControlled';
import { CardInputWrapper } from 'components/UI/CardInputWrapper/CardInputWrapper';
import { toggleCaregiverAlert } from 'constants/forms/caregiver';
import { PhoneNumberInputControlled } from 'components/UI/Inputs/PhoneNumberInput/PhoneNumberInputControlled';

import { styles } from '../CaregiverForm.styles';

export const CaregiverSection = () => {
  const { setValue } = useFormContext();
  const watchAddressType = useWatch({ name: 'isCaregiver' });
  return (
    <View style={styles.section}>
      <SwitchInputWithAlertControlled
        name="isCaregiver"
        label="Caregiver"
        inputProps={{
          isHorizontal: true,
          alertType: 'danger',
          switchInputToggleOffAlertData: {
            ...toggleCaregiverAlert,
            onProceed: () => {
              setValue('caregiverFirstName', '');
              setValue('caregiverLastName', '');
              setValue('caregiverPhoneNumber', '');
            },
          },
        }}
        labelProps={{ weight: 'semiBold' }}
      />
      <CardInputWrapper>
        <TextInputControlled
          name="caregiverFirstName"
          label="First name"
          inputProps={{ maxLength: 60, disabled: !watchAddressType }}
        />
        <TextInputControlled name="caregiverLastName" label="Last name" inputProps={{ disabled: !watchAddressType }} />

        <PhoneNumberInputControlled
          name="caregiverPhoneNumber"
          label="Phone number"
          inputProps={{ disabled: !watchAddressType }}
        />
      </CardInputWrapper>
    </View>
  );
};
