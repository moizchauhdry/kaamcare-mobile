import { forwardRef, useEffect, useState } from 'react';

import type { TextInputProps } from '../TextInput/TextInput';
import { TextInput } from '../TextInput/TextInput';
import { TextInput as RNTextInput } from 'react-native';
import { theme } from 'config/Theme';

export type NumberInputProps = TextInputProps & {
  maxValue?: number;
  minValue?: number;
  type?: 'int' | 'float';
  error?: boolean;
};

export const NumberInput2o = forwardRef<RNTextInput, NumberInputProps>(
  ({ minValue, maxValue, type = 'int', error, ...rest }, ref) => {
    const [numericValue, setNumericValue] = useState('');

    useEffect(() => {
      if (rest.value) {
        setNumericValue(rest.value);
      }
    }, [rest.value]);

    const checkValue = (value: number) => (minValue && minValue > value) || (maxValue && maxValue < value);

    const handleTextFloatChange = (text: string) => {
      const regex = /^-?\d*([.,])?\d*$/;
      if (regex.test(text)) {
        const parsedValue = parseFloat(text);
        if (checkValue(parsedValue)) return;

        const properText = text.replace(',', '.');
        setNumericValue(properText);
        rest?.onChangeText?.(properText);
      }
    };

    const handleTextIntChange = (text: string) => {
      if (text === '') {
        setNumericValue(text);
        rest?.onChangeText?.(text);

        return;
      }

      const parsedValue = parseInt(text.replace(/[^0-9]/g, ''), 10);

      if (checkValue(parsedValue)) {
        return;
      }

      if (!Number.isNaN(parsedValue)) {
        setNumericValue(parsedValue.toString());
        rest?.onChangeText?.(parsedValue.toString());
      }
    };

    return (
      <RNTextInput
        ref={ref}
        keyboardType="numeric"
        {...rest}
        onChangeText={type === 'int' ? handleTextIntChange : handleTextFloatChange}
        value={numericValue}
        placeholder="00"
        placeholderTextColor={'#D5E1EA'}
        textAlignVertical="center"
        textAlign="center"
        style={{
          borderWidth: error ? 1 : 0,
          borderColor: error ? theme.colors.red : theme.colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: theme.colors.textPrimary,
          fontWeight: '500',
          fontSize: 45,
          padding: 0,
          // height: 60,
          marginBottom: 10,
          borderRadius: 4,
          // backgroundColor: 'red',
          // width: 70,
        }}
      />
    );
  },
);
