import { useFormContext } from 'react-hook-form';
import type { Item, PickerSelectProps } from 'react-native-picker-select';

import { PickerSelect } from './PickerSelect';
import { FormFieldControlled } from '../FormField/FormFieldControlled';

type PickerSelectControlledProps = {
  name: string;
  items: Item[];
  label?: string;
  pickerSelectProps?: Omit<PickerSelectProps, 'items'>;
};

export const PickerSelectControlled = ({ items, name, label, pickerSelectProps }: PickerSelectControlledProps) => {
  const { control, formState, getFieldState } = useFormContext();
  const fieldState = getFieldState(name, formState);

  return (
    <FormFieldControlled
      label={label}
      error={fieldState.error?.message}
      control={control}
      name={name}
      disabled={pickerSelectProps?.disabled}
      render={({ field }) => (
        <PickerSelect
          items={items}
          value={field.value}
          onValueChange={(value) => field.onChange(value)}
          error={Boolean(fieldState.error)}
          {...pickerSelectProps}
        />
      )}
    />
  );
};
