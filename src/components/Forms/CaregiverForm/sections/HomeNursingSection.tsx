import { useFormContext, useWatch } from 'react-hook-form';
import { View } from 'react-native';

import { TextInputControlled } from 'components/UI/Inputs/TextInput/TextInputControlled';
import { phoneNumberFormatter } from 'utils/formatter/phoneNumber';
import { SwitchInputWithAlertControlled } from 'components/UI/Inputs/SwitchInput/SwitchInputWithAlertControlled';
import { CardInputWrapper } from 'components/UI/CardInputWrapper/CardInputWrapper';

import { toggleHomeNursingAlert } from '../../../../constants/forms/caregiver';
import { styles } from '../CaregiverForm.styles';

export const HomeNursingSection = () => {
  const { setValue } = useFormContext();
  const watchHomeNursingType = useWatch({ name: 'isHomeNursing' });
  return (
    <View style={styles.section}>
      <SwitchInputWithAlertControlled
        name="isHomeNursing"
        label="Home Health Nursing"
        inputProps={{
          isHorizontal: true,
          alertType: 'danger',
          switchInputToggleOffAlertData: {
            ...toggleHomeNursingAlert,
            onProceed: () => {
              setValue('homeNursingServiceName', '');
              setValue('homeNursingPhoneNumber', '');
            },
          },
        }}
        labelProps={{ weight: 'semiBold' }}
      />
      <CardInputWrapper>
        <TextInputControlled
          name="homeNursingServiceName"
          label="Service name"
          inputProps={{ maxLength: 60, disabled: !watchHomeNursingType }}
        />

        <TextInputControlled
          name="homeNursingPhoneNumber"
          label="Phone number"
          inputProps={{
            disabled: !watchHomeNursingType,
            keyboardType: 'number-pad',
            onChangeText: (text) => setValue('homeNursingPhoneNumber', phoneNumberFormatter(text)),
          }}
        />
      </CardInputWrapper>
    </View>
  );
};
