import type { TextInputProps as RNTextInputProps } from 'react-native';
import { StyleSheet, TextInput as RNTextInput, View, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';

import { disabled as disabledStyles, styles } from './TextInput.styles';
import { Typography } from '../../Typography/Typography';
import { theme } from '../../../../config/Theme';

export type TextInputProps = RNTextInputProps & {
  error?: boolean;
  rightElement?: React.ReactNode | ((inputState: { disabled?: boolean }) => React.ReactNode);
  isFocused?: boolean;
  disabled?: boolean;
  isWide?: boolean;
  isSecureTextEntry?: boolean;
};

export const TextInput = ({
  error,
  disabled,
  isSecureTextEntry = false,
  rightElement,
  isFocused,
  isWide,
  ...restProps
}: TextInputProps) => {
  const [isFocus, setIsFocus] = useState(false);

  if (rightElement) {
    return (
      <View
        style={StyleSheet.compose(
          [
            styles.inputWrapper,
            isFocus || isFocused ? styles.inputFocus : undefined,
            error ? styles.inputError : undefined,
          ],
          disabled ? disabledStyles.inputWrapper : undefined,
        )}
      >
        <RNTextInput
          {...restProps}
          multiline={!!isWide}
          onBlur={() => setIsFocus(false)}
          onFocus={() => setIsFocus(true)}
          editable={!disabled}
          style={StyleSheet.compose(
            [styles.inputWithElement, isWide ? styles.inputWide : undefined],
            disabled ? disabledStyles.inputWithElement : undefined,
          )}
        />

        {typeof rightElement === 'function' ? (
          rightElement({ disabled })
        ) : (
          <Typography style={{ color: theme.colors.gray200 }}>{rightElement}</Typography>
        )}
      </View>
    );
  }

  return (
    <RNTextInput
      {...restProps}
      onBlur={() => setIsFocus(false)}
      onFocus={() => setIsFocus(true)}
      multiline={!!isWide}
      editable={!disabled}
      secureTextEntry={isSecureTextEntry}
      style={StyleSheet.compose(
        [
          styles.input,
          isFocus ? styles.inputFocus : undefined,
          error ? styles.inputError : undefined,
          isWide ? styles.inputWide : undefined,
          restProps.style,
        ],
        disabled ? disabledStyles.input : undefined,
      )}
    />
  );
};
