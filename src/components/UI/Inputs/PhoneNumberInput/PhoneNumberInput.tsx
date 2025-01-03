import { useEffect, useState } from 'react';

import { TextInput, type TextInputProps } from '../TextInput/TextInput';
import { formattedPhoneNumberStringToNumber, phoneNumberFormatter } from '../../../../utils/formatter/phoneNumber';

export const PhoneNumberInput = (props?: TextInputProps) => {
  const [values, setValues] = useState({
    value: props?.value ?? '',
    formattedValue: props?.value ?? phoneNumberFormatter(props?.value) ?? '',
  });

  const handleTextChange = (text: string) => {
    setValues({
      value: formattedPhoneNumberStringToNumber(text) ?? '',
      formattedValue: phoneNumberFormatter(text) ?? '',
    });

    props?.onChangeText?.(text);
  };

  const handleValueChange = () => {
    setValues({
      value: formattedPhoneNumberStringToNumber(props?.value) ?? '',
      formattedValue: phoneNumberFormatter(props?.value) ?? '',
    });
  };

  useEffect(() => {
    if (props?.value === '') {
      setValues({
        value: formattedPhoneNumberStringToNumber(props?.value) ?? '',
        formattedValue: phoneNumberFormatter(props?.value) ?? '',
      });
    }
  }, [props?.value]);

  return (
    <TextInput
      {...props}
      keyboardType="phone-pad"
      textContentType="telephoneNumber"
      autoCorrect={false}
      autoComplete="tel"
      onChangeText={handleTextChange}
      onChange={handleValueChange}
      value={values.formattedValue}
      maxLength={14}
    />
  );
};
