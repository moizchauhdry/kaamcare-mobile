import { View } from 'react-native';
import { useFormContext } from 'react-hook-form';

import { SwitchInputWithAlertControlled } from '../../../UI/Inputs/SwitchInput/SwitchInputWithAlertControlled';
import { CardInputWrapper } from '../../../UI/CardInputWrapper/CardInputWrapper';
import { RadioGroupWithAlertControlled } from '../../../UI/Inputs/RadioGroup/RadioGroupWithAlertControlled';
import { TextInputControlled } from '../../../UI/Inputs/TextInput/TextInputControlled';
import type { RadioButtonProps } from '../../../UI/RadioButton/RadioButton';
import { toggleADLSectionAlert } from '../../../../constants/forms/goalsOfCare/adl';
import type { CustomSelectData } from '../../../UI/Inputs/Custom/CustomSelect';
import { MultiselectCheckboxControlled } from '../../../UI/Inputs/MultiselectCheckbox/MultiselectCheckboxControlled';
import { theme } from '../../../../config/Theme';

type ADLFormSectionProps = {
  name: string;
  label: string;
  radioOptions: RadioButtonProps[];
  multiselectOptions?: CustomSelectData[];
};

export const ADLFormSection = ({ name, radioOptions, label, multiselectOptions }: ADLFormSectionProps) => {
  const { watch, setValue, getValues } = useFormContext();
  const isActive = watch(`${name}.isActive`);
  const explanation = watch(`${name}.explanation`);
  const value = watch(`${name}.value`);
  const multiselect = getValues(`${name}.multiselect`);

  return (
    <View style={{ gap: 8 }}>
      <SwitchInputWithAlertControlled
        name={`${name}.isActive`}
        label={label}
        inputProps={{
          isHorizontal: true,
          onChange: (event) => {
            setValue(`${name}.isActive`, event);
          },
          switchInputToggleOffAlertData: {
            ...toggleADLSectionAlert(label),
            onProceed: () => {
              setValue(`${name}.explanation`, '');
              setValue(`${name}.value`, '');
            },
          },
          enableAlert: explanation || value,
        }}
        labelProps={{ weight: 'semiBold' }}
      />
      <CardInputWrapper>
        <RadioGroupWithAlertControlled
          displayAsCard={false}
          name={`${name}.value`}
          items={radioOptions}
          inputProps={{
            disabled: !isActive,
            onPress: (newValue) => setValue(`${name}.value`, newValue),
          }}
        />
        {isActive ? (
          <View
            style={{
              height: 1,
              backgroundColor: theme.colors.lightBlue,
            }}
          />
        ) : null}
        {isActive && multiselectOptions ? (
          <MultiselectCheckboxControlled
            containerStyles={{ paddingHorizontal: 0 }}
            name={`${name}.multiselect`}
            initialValues={multiselect}
            data={multiselectOptions}
          />
        ) : null}
        {isActive && multiselectOptions ? (
          <View
            style={{
              height: 1,
              backgroundColor: theme.colors.lightBlue,
            }}
          />
        ) : null}
        {isActive ? (
          <TextInputControlled
            name={`${name}.explanation`}
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
