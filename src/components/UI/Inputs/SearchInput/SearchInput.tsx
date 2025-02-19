import type { TextInputProps as RNSearchInputProps } from 'react-native';
import { StyleSheet, TextInput as RNSearchInput, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { SvgXml } from 'react-native-svg';

import searchIcon from 'assets/icons/search.svg';
import deleteIcon from 'assets/icons/delete.svg';

import { disabled as disabledStyles, styles } from './SearchInput.styles';
import { theme } from '../../../../config/Theme';

export type SearchInputProps = RNSearchInputProps & {
  error?: boolean;
  rightElement?: React.ReactNode | ((inputState: { disabled?: boolean }) => React.ReactNode);
  disabled?: boolean;
  onChangeText: (text: string) => void;
  value: string;
};

export const SearchInput = ({ error, disabled, onChangeText, value, ...restProps }: SearchInputProps) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View
      style={StyleSheet.compose(
        [styles.inputWrapper, isFocus ? styles.inputFocus : undefined, error ? styles.inputError : undefined],
        disabled ? disabledStyles.inputWrapper : undefined,
      )}
    >
      <SvgXml xml={searchIcon} stroke={theme.colors.primary} />
      <RNSearchInput
        {...restProps}
        value={value}
        onChangeText={(text) => onChangeText(text)}
        onBlur={() => setIsFocus(false)}
        onFocus={() => setIsFocus(true)}
        style={StyleSheet.compose([styles.inputWithElement], disabled ? disabledStyles.inputWithElement : undefined)}
      />
      {value && (
        <TouchableOpacity onPress={() => onChangeText('')}>
          <SvgXml xml={deleteIcon} height={24} width={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};
