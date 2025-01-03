import { useFormContext } from 'react-hook-form';

import type { TextInputProps } from '../TextInput/TextInput';
import { FormFieldControlled } from '../FormField/FormFieldControlled';
import { PhoneNumberInput } from './PhoneNumberInput';

type TextInputControlledProps = {
  name: string;
  label?: string;
  inputProps?: TextInputProps;
};

export const PhoneNumberInputControlled = ({ name, label, inputProps }: TextInputControlledProps) => {
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
        <PhoneNumberInput
          value={field.value}
          onChangeText={field.onChange}
          {...inputProps}
          error={Boolean(fieldState.error)}
        />
      )}
    />
  );
};
