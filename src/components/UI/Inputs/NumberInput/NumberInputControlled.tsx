import { useFormContext } from 'react-hook-form';
import type { TextInput as RNTextInput } from 'react-native';
import { forwardRef } from 'react';

import { FormFieldControlled } from '../FormField/FormFieldControlled';
import type { NumberInputProps } from './NumberInput';
import { NumberInput } from './NumberInput';

type TextInputControlledProps = {
  name: string;
  label?: string;
  inputProps?: NumberInputProps;
  ref?: any;
};

export const NumberInputControlled = forwardRef<RNTextInput, TextInputControlledProps>(
  ({ name, label, inputProps }, ref) => {
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
            ref={ref}
            value={field.value}
            onChangeText={field.onChange}
            {...inputProps}
            error={Boolean(fieldState.error)}
          />
        )}
      />
    );
  },
);
