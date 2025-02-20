import { useFormContext } from 'react-hook-form';

import { FormFieldControlled } from '../FormField/FormFieldControlled';
import type { DateTimePickerInputProps } from './DateTimePicker';
import { DateTimePicker2o } from './DateTimePicker2o';

type DateTimePickerControlledProps = {
  name: string;
  label?: string;
  inputProps?: DateTimePickerInputProps;
};

export const DateTimePickerControlled2o = ({ name, label, inputProps }: DateTimePickerControlledProps) => {
  const { control, formState, getFieldState } = useFormContext();
  const fieldState = getFieldState(name, formState);

  return (
    <FormFieldControlled
      label={label}
      error={fieldState.error?.message}
      control={control}
      wrapperStyle={{ marginHorizontal: 20, marginVertical: 15 }}
      name={name}
      disabled={inputProps?.disabled}
      render={({ field }) => (
        <DateTimePicker2o
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
