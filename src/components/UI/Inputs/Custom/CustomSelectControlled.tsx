import { useFormContext } from 'react-hook-form';

import { FormFieldControlled } from '../FormField/FormFieldControlled';
import type { CustomSelectData } from './CustomSelect';
import { CustomSelect } from './CustomSelect';
import type { TextInputProps } from '../TextInput/TextInput';

type CustomSelectControlledProps = {
  name: string;
  commonData: CustomSelectData[];
  dynamicData: CustomSelectData[];
  onSelect?: (value: string) => void;
  onSaveCustomValue?: (value: string) => void;
  label?: string;
  title?: string;
  placeholder?: string;
  inputProps?: TextInputProps;
};

export const CustomSelectControlled = ({ name, label, inputProps, ...props }: CustomSelectControlledProps) => {
  const { control, formState, getFieldState } = useFormContext();
  const fieldState = getFieldState(name, formState);

  return (
    <FormFieldControlled
      label={label}
      error={fieldState.error?.message}
      control={control}
      name={name}
      render={({ field }) => (
        <CustomSelect
          onSelect={field.onChange}
          onReset={() => field.onChange('')}
          error={Boolean(fieldState.error)}
          inputProps={inputProps}
          value={field.value}
          {...props}
        />
      )}
    />
  );
};
