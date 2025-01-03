import { useFormContext, useWatch } from 'react-hook-form';
import { View } from 'react-native';

import { TextInputControlled } from 'components/UI/Inputs/TextInput/TextInputControlled';
import { phoneNumberFormatter } from 'utils/formatter/phoneNumber';
import { SwitchInputWithAlertControlled } from 'components/UI/Inputs/SwitchInput/SwitchInputWithAlertControlled';
import { CardInputWrapper } from 'components/UI/CardInputWrapper/CardInputWrapper';

import { toggleHomeTherapylert } from '../../../../constants/forms/caregiver';
import { styles } from '../CaregiverForm.styles';

export const HomeTherapySection = () => {
  const { setValue } = useFormContext();
  const watchHomeTherapyType = useWatch({ name: 'isHomeTherapy' });
  return (
    <View style={styles.section}>
      <SwitchInputWithAlertControlled
        name="isHomeTherapy"
        label="Home Health Physical Therapy"
        inputProps={{
          isHorizontal: true,
          alertType: 'danger',
          switchInputToggleOffAlertData: {
            ...toggleHomeTherapylert,
            onProceed: () => {
              setValue('homeTherapyServiceName', '');
              setValue('homeTherapyPhoneNumber', '');
            },
          },
        }}
        labelProps={{ weight: 'semiBold' }}
      />
      <CardInputWrapper>
        <TextInputControlled
          name="homeTherapyServiceName"
          label="Service name"
          inputProps={{ maxLength: 60, disabled: !watchHomeTherapyType }}
        />
        <TextInputControlled
          name="homeTherapyPhoneNumber"
          label="Phone number"
          inputProps={{
            disabled: !watchHomeTherapyType,
            keyboardType: 'number-pad',
            onChangeText: (text) => setValue('homeTherapyPhoneNumber', phoneNumberFormatter(text)),
          }}
        />
      </CardInputWrapper>
    </View>
  );
};
