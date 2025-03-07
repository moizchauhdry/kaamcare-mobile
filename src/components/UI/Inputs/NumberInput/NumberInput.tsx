import { useEffect, useState } from 'react';

import type { TextInputProps } from '../TextInput/TextInput';
import { TextInput } from '../TextInput/TextInput';

export type NumberInputProps = TextInputProps & {
  maxValue?: number;
  minValue?: number;
  type?: 'int' | 'float';
};

export const NumberInput = ({ minValue, maxValue, type = 'int', ...rest }: NumberInputProps) => {
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
      keyboardType="numeric"
      {...rest}
      onChangeText={type === 'int' ? handleTextIntChange : handleTextFloatChange}
      value={numericValue}
    />
  );
};
