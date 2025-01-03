import { useFormContext } from 'react-hook-form';

import type { RadioButtonProps } from 'components/UI/RadioButton/RadioButton';

import { type TypographyExportProps } from '../../Typography/Typography';
import type { RadioGroupProps } from './RadioGroup';
import RadioGroup from './RadioGroup';
import { styles } from './RadioGroup.styles';
import { FormFieldControlled } from '../FormField/FormFieldControlled';

export type RadioGroupControlledProps = {
  name: string;
  label?: string;
  inputProps?: RadioGroupProps;
  labelProps?: TypographyExportProps;
  items: RadioButtonProps[];
  children?: React.ReactNode;
};

export const RadioGroupControlled = ({
  name,
  label,
  inputProps,
  labelProps,
  items,
  children,
}: RadioGroupControlledProps) => {
  const { control, formState, getFieldState } = useFormContext();
  const fieldState = getFieldState(name, formState);

  return (
    <FormFieldControlled
      labelProps={labelProps}
      label={label}
      error={fieldState.error?.message}
      control={control}
      name={name}
      wrapperStyle={styles.container}
      disabled={inputProps?.disabled}
      render={({ field }) => (
        <RadioGroup radioButtons={items} value={field.value} onPress={field.onChange} {...inputProps}>
          {children}
        </RadioGroup>
      )}
    />
  );
};
