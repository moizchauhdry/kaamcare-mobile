import { useFormContext } from 'react-hook-form';

import { styles } from './SwitchInput.styles';
import type { TypographyExportProps } from '../../Typography/Typography';
import type { SwitchInputWithAlertProps } from './SwitchInputWithAlert';
import { SwitchInputWithAlert } from './SwitchInputWithAlert';
import { FormFieldControlled } from '../FormField/FormFieldControlled';

export type SwitchInputWithAlertControlledProps = {
  name: string;
  label?: string;
  inputProps?: SwitchInputWithAlertProps;
  labelProps?: TypographyExportProps;
};

export const SwitchInputWithAlertControlled = ({
  name,
  label,
  inputProps,
  labelProps,
}: SwitchInputWithAlertControlledProps) => {
  const { control, formState, getFieldState } = useFormContext();
  const fieldState = getFieldState(name, formState);

  return (
    <FormFieldControlled
      containerStyle={inputProps?.isHorizontal ? styles.horizontal : undefined}
      labelProps={labelProps}
      label={label}
      error={fieldState.error?.message}
      control={control}
      name={name}
      disabled={inputProps?.disabled}
      render={({ field }) => (
        <SwitchInputWithAlert currentValue={!!field.value} onChange={field.onChange} {...inputProps} />
      )}
    />
  );
};
