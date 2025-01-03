import { useFormContext } from 'react-hook-form';

import { FormFieldControlled } from '../FormField/FormFieldControlled';
import type { MultiColumnPickerSelectProps } from './MultiColumnPickerSelect';
import { MultiColumnPickerSelect } from './MultiColumnPickerSelect';

type MultiColumnPickerSelectControlledProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  pickerProps: MultiColumnPickerSelectProps;
};

export const MultiColumnPickerSelectControlled = ({
  name,
  label,
  pickerProps,
  disabled,
}: MultiColumnPickerSelectControlledProps) => {
  const { control, formState, getFieldState } = useFormContext();
  const fieldState = getFieldState(name, formState);

  return (
    <FormFieldControlled
      label={label}
      error={fieldState.error?.message}
      control={control}
      name={name}
      disabled={disabled}
      render={({ field }) => (
        <MultiColumnPickerSelect
          {...pickerProps}
          initialValue={formState?.defaultValues?.[name]}
          textInputProps={{
            ...pickerProps.textInputProps,
            onChangeText: (value) => field.onChange(value),
            value: field.value,
          }}
        />
      )}
    />
  );
};
