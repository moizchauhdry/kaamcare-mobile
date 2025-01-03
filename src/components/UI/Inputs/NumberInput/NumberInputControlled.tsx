import { useFormContext } from 'react-hook-form';

import { FormFieldControlled } from '../FormField/FormFieldControlled';
import type { NumberInputProps } from './NumberInput';
import { NumberInput } from './NumberInput';

type TextInputControlledProps = {
  name: string;
  label?: string;
  inputProps?: NumberInputProps;
};

export const NumberInputControlled = ({ name, label, inputProps }: TextInputControlledProps) => {
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
        <NumberInput
          value={field.value}
          onChangeText={field.onChange}
          {...inputProps}
          error={Boolean(fieldState.error)}
        />
      )}
    />
  );
};
