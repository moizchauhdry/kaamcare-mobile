import { useFormContext } from 'react-hook-form';

import type { DateTimePickerInputProps } from './DateTimePicker';
import { DateTimePicker } from './DateTimePicker';
import { FormFieldControlled } from '../FormField/FormFieldControlled';

type DateTimePickerControlledProps = {
  name: string;
  label?: string;
  inputProps?: DateTimePickerInputProps;
};

export const DateTimePickerControlled = ({ name, label, inputProps }: DateTimePickerControlledProps) => {
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
        <DateTimePicker
          value={field.value}
          onDateChange={field.onChange}
          onChange={(event, date) => {
            inputProps?.onChange?.(date);
            field.onChange(date);
          }}
          error={Boolean(fieldState.error)}
          inputProps={inputProps}
        />
      )}
    />
  );
};
