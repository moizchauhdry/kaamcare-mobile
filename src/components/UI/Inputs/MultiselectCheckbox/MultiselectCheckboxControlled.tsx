import { useFormContext } from 'react-hook-form';
import type { StyleProp } from 'react-native';
import type { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { FormFieldControlled } from '../FormField/FormFieldControlled';
import { MultiselectCheckbox } from './MultiselectCheckbox';
import type { CustomSelectData } from '../Custom/CustomSelect';

type MultiColumnPickerSelectControlledProps = {
  name: string;
  data: CustomSelectData[];
  label?: string;
  disabled?: boolean;
  containerStyles?: StyleProp<ViewStyle> | undefined;
  initialValues?: string[];
};

export const MultiselectCheckboxControlled = ({
  name,
  label,
  data,
  containerStyles,
  disabled,
  initialValues,
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
        <MultiselectCheckbox
          onValuesChange={field.onChange}
          data={data}
          initialValues={initialValues ?? formState?.defaultValues?.[name]}
          containerStyles={containerStyles}
        />
      )}
    />
  );
};
