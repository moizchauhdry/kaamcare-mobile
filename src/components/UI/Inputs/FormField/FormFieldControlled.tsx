import { View, type ViewStyle } from 'react-native';
import type { FieldValues, FieldPath, ControllerProps, FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Typography, type TypographyExportProps } from '../../Typography/Typography';

interface FormFieldControlledProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends ControllerProps<TFieldValues, TName> {
  label?: string;
  labelProps?: TypographyExportProps;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  wrapperStyle?: ViewStyle;
}

export const FormFieldControlled = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  labelProps,
  error,
  disabled,
  containerStyle,
  wrapperStyle,
  ...restProps
}: FormFieldControlledProps<TFieldValues, TName>) => (
  <View style={[{ gap: 8 }, containerStyle]}>
    {label ? (
      <Typography color={disabled ? 'gray' : 'primary'} {...labelProps}>
        {label}
      </Typography>
    ) : null}
    <View style={wrapperStyle}>
      <Controller {...restProps} />
    </View>
    {error && <Typography color="error">{error as string}</Typography>}
  </View>
);
