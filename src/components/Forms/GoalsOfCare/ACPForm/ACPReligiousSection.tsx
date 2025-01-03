import { useFormContext } from 'react-hook-form';
import { View } from 'react-native';

import { SwitchInputWithAlertControlled } from '../../../UI/Inputs/SwitchInput/SwitchInputWithAlertControlled';
import { toggleADLSectionAlert } from '../../../../constants/forms/goalsOfCare/adl';
import { CardInputWrapper } from '../../../UI/CardInputWrapper/CardInputWrapper';
import { TextInputControlled } from '../../../UI/Inputs/TextInput/TextInputControlled';

export const ACPReligiousSection = () => {
  const { setValue, watch } = useFormContext();
  const isActive = watch('religious.isActive');
  const explanation = watch('religious.explanation');

  return (
    <View style={{ gap: 8 }}>
      <SwitchInputWithAlertControlled
        name="religious.isActive"
        label="Religious/Spiritual preferences"
        inputProps={{
          isHorizontal: true,
          switchInputToggleOffAlertData: {
            ...toggleADLSectionAlert('Religious/Spiritual preferences'),
            onProceed: () => {
              setValue(`religious.explanation`, '');
            },
          },
          enableAlert: explanation,
        }}
        labelProps={{ weight: 'semiBold' }}
      />
      <CardInputWrapper>
        <TextInputControlled
          name="religious.explanation"
          label="Explanation"
          inputProps={{
            isWide: true,
            placeholder: 'Enter any relevant information here...',
            maxLength: 240,
            disabled: !isActive,
            style: { height: 200 },
          }}
        />
      </CardInputWrapper>
    </View>
  );
};
