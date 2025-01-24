import { useFormContext } from 'react-hook-form';

import type { TextInputProps } from './TextInput';
import { TextInput } from './TextInput';
import { FormFieldControlled } from '../FormField/FormFieldControlled';
import { Image, TextInput as RNTextInput, TouchableOpacity, View } from 'react-native';
import { forwardRef, useState } from 'react';
import { styles } from './TextInput.styles';

type TextInputControlledProps = {
  name: string;
  label?: string;
  inputProps?: TextInputProps;
  isPasswordField?: boolean;
};

export const TextInputControlled = forwardRef<RNTextInput, TextInputControlledProps>(
  ({ name, label, isPasswordField = false, inputProps }, ref) => {
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
        render={({ field }) => (
          <View>
            <TextInput
              ref={ref}
              value={field.value}
              onChangeText={field.onChange}
              {...inputProps}
              error={Boolean(fieldState.error)}
              isSecureTextEntry={isPasswordField && !showPassword}
            />
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
