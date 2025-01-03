import { useFormContext } from 'react-hook-form';

import type { SwitchInputProps } from './SwitchInput';
import { SwitchInput } from './SwitchInput';
import type { TypographyExportProps } from '../../Typography/Typography';
import { styles } from './SwitchInput.styles';
import { FormFieldControlled } from '../FormField/FormFieldControlled';

export type SwitchInputControlledProps = {
  name: string;
  label?: string;
  inputProps?: SwitchInputProps;
  labelProps?: TypographyExportProps;
};

export const SwitchInputControlled = ({ name, label, inputProps, labelProps }: SwitchInputControlledProps) => {
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
      render={({ field }) => <SwitchInput value={field.value} {...inputProps} onValueChange={field.onChange} />}
    />
  );
};
