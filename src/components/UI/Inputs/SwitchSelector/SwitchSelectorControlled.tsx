import { useFormContext } from 'react-hook-form';
import type { SwitchSelectorOption, SwitchSelectorProps } from 'react-native-switch-selector';

import { FormFieldControlled } from '../FormField/FormFieldControlled';
import { SwitchSelectorComponent as SwitchSelector } from './SwitchSelector';

type SwitchSelectorControlledProps = {
  name: string;
  label?: string;
  options: SwitchSelectorOption[];
  inputProps?: Omit<SwitchSelectorProps, 'onPress' | 'options'>;
};

export const SwitchSelectorControlled = ({ options, name, label, inputProps }: SwitchSelectorControlledProps) => {
  const { control, formState, getFieldState } = useFormContext();
  const fieldState = getFieldState(name, formState);
  return (
    <FormFieldControlled
      label={label}
      error={fieldState.error?.message}
      control={control}
      name={name}
      disabled={inputProps?.disabled}
      render={({ field }) => (
        <SwitchSelector
          value={field.value}
          onPress={(value) => field.onChange(inputProps?.returnObject ? (value as SwitchSelectorOption)?.value : value)}
          options={options}
          {...inputProps}
        />
      )}
    />
  );
};
