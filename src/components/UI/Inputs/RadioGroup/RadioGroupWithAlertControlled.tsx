import { useFormContext } from 'react-hook-form';

import type { RadioButtonProps } from 'components/UI/RadioButton/RadioButton';

import { type TypographyExportProps } from '../../Typography/Typography';
import { styles } from './RadioGroup.styles';
import type { RadioGroupWithAlertProps } from './RadioGroupWithAlert';
import RadioGroupWithAlert from './RadioGroupWithAlert';
import { FormFieldControlled } from '../FormField/FormFieldControlled';

export type RadioGroupWithAlertControlledProps = {
  name: string;
  label?: string;
  inputProps?: RadioGroupWithAlertProps & { onPress?: (id: string) => void };
  labelProps?: TypographyExportProps;
  items: RadioButtonProps[];
  children?: React.ReactNode;
  displayAsCard?: boolean;
};

export const RadioGroupWithAlertControlled = ({
  name,
  label,
  inputProps,
  labelProps,
  items,
  children,
  displayAsCard = true,
}: RadioGroupWithAlertControlledProps) => {
  const { control, formState, getFieldState } = useFormContext();
  const fieldState = getFieldState(name, formState);

  return (
    <FormFieldControlled
      labelProps={labelProps}
      wrapperStyle={displayAsCard ? styles.container : undefined}
      label={label}
      error={fieldState.error?.message}
      control={control}
      name={name}
      disabled={inputProps?.disabled}
      render={({ field }) => (
        <RadioGroupWithAlert
          radioButtons={items}
          currentValue={field.value}
          {...inputProps}
          onPress={(id) => {
            inputProps?.onPress?.(id);
            field.onChange(id);
          }}
        >
          {children}
        </RadioGroupWithAlert>
      )}
    />
  );
};
