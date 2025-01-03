import { View } from 'react-native';
import { useFormContext } from 'react-hook-form';

import { CardInputWrapper } from 'components/UI/CardInputWrapper/CardInputWrapper';

import { SwitchInputWithAlertControlled } from '../../../UI/Inputs/SwitchInput/SwitchInputWithAlertControlled';
import { toggleADLSectionAlert } from '../../../../constants/forms/goalsOfCare/adl';
import { RadioGroupWithAlertControlled } from '../../../UI/Inputs/RadioGroup/RadioGroupWithAlertControlled';
import { TextInputControlled } from '../../../UI/Inputs/TextInput/TextInputControlled';
import { codeStatusOptions } from '../../../../constants/forms/goalsOfCare/acp';

export const ACPCodeStatusSection = () => {
  const { setValue, watch } = useFormContext();
  const value = watch('codeStatus.value');
  const isActive = watch('codeStatus.isActive');

  return (
    <View style={{ gap: 8 }}>
      <SwitchInputWithAlertControlled
        name="codeStatus.isActive"
        label="Code Status"
        inputProps={{
          isHorizontal: true,
          switchInputToggleOffAlertData: {
            ...toggleADLSectionAlert('Code status'),
            onProceed: () => {
              setValue(`codeStatus.value`, '');
              setValue(`codeStatus.explanation`, '');
            },
          },
          enableAlert: value,
        }}
        labelProps={{ weight: 'semiBold' }}
      />
      <CardInputWrapper>
        <RadioGroupWithAlertControlled
          name="codeStatus.value"
          items={codeStatusOptions}
          inputProps={{ disabled: !isActive }}
          displayAsCard={false}
        />
        {isActive ? (
          <TextInputControlled
            name="codeStatus.explanation"
            label="Explanation"
            inputProps={{
              isWide: true,
              placeholder: 'Enter any relevant information here...',
              maxLength: 240,
              disabled: !isActive,
              style: { height: 200 },
            }}
          />
        ) : null}
      </CardInputWrapper>
    </View>
  );
};
