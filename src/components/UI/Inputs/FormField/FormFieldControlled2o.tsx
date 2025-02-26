import { Animated, Easing, View, type ViewStyle } from 'react-native';
import type { FieldValues, FieldPath, ControllerProps, FieldError, Merge, FieldErrorsImpl } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { Typography, type TypographyExportProps } from '../../Typography/Typography';
import { theme } from 'config/Theme';
import { useEffect, useRef } from 'react';

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
  const heightAnim = useRef(new Animated.Value(120)).current; // Initial height
  useEffect(() => {
    // Animate height based on error presence
    Animated.timing(heightAnim, {
      toValue: error ? 250 : 120, // Expand to 150 if error, else shrink to 120
      duration: 300, // Animation duration in milliseconds
      easing: Easing.inOut(Easing.ease), // Add easing
      useNativeDriver: false, // Height animation requires `useNativeDriver: false`
    }).start();
  }, [error]); // Trigger animation when error changes

  return (
    <Animated.View
      style={[
        {
          // gap: 18,
          // padding: 8,
          alignItems: 'center',
          borderWidth: 1,
          backgroundColor: theme.colors.white,
          // padding: 16,
          paddingTop: 16,
          paddingHorizontal: 22,
          borderRadius: 9,
          borderColor: theme.colors.backgroundDark,
          shadowColor: theme.colors.shadowPrimary,
          shadowOffset: { width: 0, height: 3 },
          shadowRadius: 4,
          shadowOpacity: 0.9,
          elevation: 5,
          justifyContent: 'center',
          // width: 114,
          // minHeight: error ? 150 : 120,
          // height: heightAnim,
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
      {/* {error && (
        <Typography style={{ fontSize: 13, marginTop: 5, textAlign: 'center' }} color="error">
          {error as string}
        </Typography>
      )} */}
    </Animated.View>
  );
};
