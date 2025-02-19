import { View, type ViewStyle } from 'react-native';
import type { FieldValues, FieldPath, ControllerProps, FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Typography, type TypographyExportProps } from '../../Typography/Typography';
import { theme } from 'config/Theme';

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

export const FormFieldControlled2o = <
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
}: FormFieldControlledProps<TFieldValues, TName>) => {
  return (
    <View
      style={[
        {
          // gap: 18,
          // padding: 8,
          alignItems: 'center',
          borderWidth: 1,
          backgroundColor: theme.colors.white,
          padding: 16,
          borderRadius: 9,
          borderColor: theme.colors.backgroundDark,
          shadowColor: theme.colors.shadowPrimary,
          shadowOffset: { width: 0, height: 3 },
          shadowRadius: 4,
          shadowOpacity: 0.9,
          elevation: 5,
          justifyContent: 'center',
          width: 112,
          // minHeight: error && error==='Field is required' ?150:error==='Field is required' ? 230 : 120,
        },
        containerStyle,
      ]}
    >
      <View>
        {label ? (
          <Typography
            style={{ lineHeight: 24, fontSize: 17, fontWeight: '500', textAlign: 'center' }}
            weight="regular"
            color={disabled ? 'gray' : 'primary'}
            {...labelProps}
          >
            {label}
          </Typography>
        ) : null}
        <View style={wrapperStyle}>
          <Controller {...restProps} />
        </View>
      </View>
      {error && (
        <Typography style={{ fontSize: 13, marginTop: 5, textAlign: 'center' }} color="error">
          {error as string}
        </Typography>
      )}
    </View>
  );
};
