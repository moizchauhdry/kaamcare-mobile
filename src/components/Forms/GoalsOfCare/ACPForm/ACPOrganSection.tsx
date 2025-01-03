import { useFormContext } from 'react-hook-form';
import { View } from 'react-native';

import { SwitchInputWithAlertControlled } from '../../../UI/Inputs/SwitchInput/SwitchInputWithAlertControlled';
import { toggleADLSectionAlert } from '../../../../constants/forms/goalsOfCare/adl';
import { CardInputWrapper } from '../../../UI/CardInputWrapper/CardInputWrapper';
import { RadioGroupWithAlertControlled } from '../../../UI/Inputs/RadioGroup/RadioGroupWithAlertControlled';

export const ACPOrganSection = () => {
  const { setValue, watch } = useFormContext();
  const isActive = watch('organ.isActive');
  const value = watch('organ.value');

  return (
    <View style={{ gap: 8 }}>
      <SwitchInputWithAlertControlled
        name="organ.isActive"
        label="Organ donation"
        inputProps={{
          isHorizontal: true,
          switchInputToggleOffAlertData: {
            ...toggleADLSectionAlert('Organ donation'),
            onProceed: () => {
              setValue(`organ.value`, '');
            },
          },
          enableAlert: value,
        }}
        labelProps={{ weight: 'semiBold' }}
      />
      <CardInputWrapper>
        <RadioGroupWithAlertControlled
          name="organ.value"
          displayAsCard={false}
          inputProps={{
            disabled: !isActive,
          }}
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
      </CardInputWrapper>
    </View>
  );
};
