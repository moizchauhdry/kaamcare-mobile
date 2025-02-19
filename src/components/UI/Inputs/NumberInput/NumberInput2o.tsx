import { forwardRef, useEffect, useState } from 'react';

import type { TextInputProps } from '../TextInput/TextInput';
import { TextInput } from '../TextInput/TextInput';
import { TextInput as RNTextInput } from 'react-native';
import { theme } from 'config/Theme';

export type NumberInputProps = TextInputProps & {
  maxValue?: number;
  minValue?: number;
  type?: 'int' | 'float';
};

export const NumberInput2o = forwardRef<RNTextInput, NumberInputProps>(
  ({ minValue, maxValue, type = 'int', ...rest }, ref) => {
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
      <TextInput
        ref={ref}
        keyboardType="numeric"
        {...rest}
        onChangeText={type === 'int' ? handleTextIntChange : handleTextFloatChange}
        value={numericValue}
        placeholder=""
        style={{
          borderColor: theme.colors.primary,
          height: 28,
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: 16,
          color: theme.colors.textPrimary,
          width: 64,
          borderRadius: 4,
          fontWeight: '500',
        }}
      />
    );
  },
);
