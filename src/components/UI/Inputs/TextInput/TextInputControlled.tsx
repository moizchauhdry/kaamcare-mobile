import { useFormContext } from 'react-hook-form';

import type { TextInputProps } from './TextInput';
import { TextInput } from './TextInput';
import { FormFieldControlled } from '../FormField/FormFieldControlled';
import { Image, TextInput as RNTextInput, TouchableOpacity, View } from 'react-native';
import { forwardRef, useState } from 'react';
import { styles } from './TextInput.styles';
import { theme } from 'config/Theme';

type TextInputControlledProps = {
  name: string;
  label?: string;
  inputProps?: TextInputProps;
  isPasswordField?: boolean;
  isComment?: boolean;
};

export const TextInputControlled = forwardRef<RNTextInput, TextInputControlledProps>(
  ({ name, label, isPasswordField = false, isComment = false, inputProps }, ref) => {
    const { control, formState, getFieldState } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);
    const fieldState = getFieldState(name, formState);

    const togglePasswordVisibility = () => {
      setShowPassword((prevState) => !prevState);
    };

    return (
      <FormFieldControlled
        label={label}
        error={fieldState.error?.message}
        control={control}
        name={name}
        disabled={inputProps?.disabled}
        // containerStyle={{ marginBottom: 60 }}
        render={({ field }) => (
          <View>
            {isComment ? (
              <RNTextInput
                ref={ref}
                value={field.value}
                onChangeText={field.onChange}
                style={{
                  color: theme.colors.textPrimary,
                  fontSize: 17,
                  letterSpacing: -0.4,
                  textAlign: 'auto',
                  flex: 1,
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: theme.colors.backgroundDark,
                  paddingHorizontal: 16,
                  backgroundColor: theme.colors.white,
                  paddingVertical: 16,
                  marginBottom: 50,
                }}
                {...inputProps}
                multiline={true}
                // error={Boolean(fieldState.error)}
                // isSecureTextEntry={isPasswordField && !showPassword}
              />
            ) : (
              <TextInput
                ref={ref}
                value={field.value}
                onChangeText={field.onChange}
                {...inputProps}
                error={Boolean(fieldState.error)}
                isSecureTextEntry={isPasswordField && !showPassword}
              />
            )}
            {isPasswordField && (
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
                {showPassword ? (
                  <Image style={styles.logo} source={require('../../../../assets/icons/hide.png')} />
                ) : (
                  <Image style={styles.logo} source={require('../../../../assets/icons/show.png')} />
                )}
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    );
  },
);
