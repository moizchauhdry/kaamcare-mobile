import { forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import type { TextInput as RNTextInput } from 'react-native';

import { Typography } from 'components/UI/Typography/Typography';
import React from 'react';
import { FormFieldControlled2o } from '../FormField/FormFieldControlled2o';
import type { NumberInputProps } from './NumberInput';
import { NumberInput2o } from './NumberInput2o';
import { theme } from 'config/Theme';

type TextInputControlledProps = {
  name: string;
  label?: string;
  inputProps?: NumberInputProps;
  ref?: any;
};

export const NumberInputControlled2o = forwardRef<RNTextInput, TextInputControlledProps>(
  ({ name, label, inputProps }, ref) => {
    const { control, formState, getFieldState } = useFormContext();
    const fieldState = getFieldState(name, formState);

    return (
      <FormFieldControlled2o
        label={label}
        error={fieldState.error?.message}
        control={control}
        name={name}
        disabled={inputProps?.disabled}
        render={({ field }) => {
          return (
            <>
              <Typography
                weight="normal"
                align="center"
                style={{ fontSize: 12, fontWeight: '400', marginBottom: 8, color: theme.colors.textGray }}
              >
                {inputProps?.placeholder}
              </Typography>
              <NumberInput2o
                ref={ref}
                value={field.value}
                onChangeText={field.onChange}
                {...inputProps}
                error={Boolean(fieldState.error)}
              />
            </>
          );
        }}
      />
    );
  },
);
