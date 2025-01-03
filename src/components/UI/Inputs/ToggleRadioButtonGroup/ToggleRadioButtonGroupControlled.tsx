import { View } from 'react-native';
import { useFormContext, useWatch } from 'react-hook-form';

import type { SwitchInputWithAlertControlledProps } from '../SwitchInput/SwitchInputWithAlertControlled';
import { SwitchInputWithAlertControlled } from '../SwitchInput/SwitchInputWithAlertControlled';
import type { RadioGroupWithAlertControlledProps } from '../RadioGroup/RadioGroupWithAlertControlled';
import { RadioGroupWithAlertControlled } from '../RadioGroup/RadioGroupWithAlertControlled';

type ToggleRadioButtonGroupControlledProps = {
  switchProps: SwitchInputWithAlertControlledProps;
  radioButtonGroup: RadioGroupWithAlertControlledProps;
};

export const ToggleRadioButtonGroupControlled = ({
  switchProps,
  radioButtonGroup,
}: ToggleRadioButtonGroupControlledProps) => {
  const { setValue } = useFormContext();
  const switchValue = useWatch({ name: switchProps.name });

  return (
    <View style={{ gap: 8 }}>
      <SwitchInputWithAlertControlled
        {...switchProps}
        inputProps={{
          ...switchProps.inputProps,
          switchInputToggleOffAlertData: {
            ...switchProps.inputProps?.switchInputToggleOffAlertData,
            title: switchProps.inputProps?.switchInputToggleOffAlertData?.title!,
            description: switchProps.inputProps?.switchInputToggleOffAlertData?.description!,
            onProceed: () => {
              setValue(radioButtonGroup.name, '');
            },
          },
          isHorizontal: true,
        }}
      />
      <RadioGroupWithAlertControlled
        {...radioButtonGroup}
        inputProps={{
          ...radioButtonGroup.inputProps,
          disabled: !switchValue,
          radioButtonChangeAlertData: {
            ...radioButtonGroup.inputProps?.radioButtonChangeAlertData,
            title: radioButtonGroup.inputProps?.radioButtonChangeAlertData?.title!,
            description: radioButtonGroup.inputProps?.radioButtonChangeAlertData?.description!,
          },
        }}
      />
    </View>
  );
};
