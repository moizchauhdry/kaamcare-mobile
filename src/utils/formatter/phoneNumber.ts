import { clearNumber } from './number';

export const phoneNumberFormatter = (value: string | null | undefined): string | null => {
  if (!value) {
    return null;
  }
  const clearValue = clearNumber(value);
  const areaCode = clearValue?.substring(0, 3);
  const middle = clearValue?.substring(3, 6);
  const last = clearValue?.substring(6, 10);

  if (clearValue.length > 6) {
    return `(${areaCode}) ${middle}-${last}`;
  }
  if (clearValue.length > 3) {
    return `(${areaCode}) ${middle}`;
  }

  if (clearValue.length > 0) {
    return `(${areaCode}`;
  }

  return clearValue;
};

export const formattedPhoneNumberStringToNumber = (value: string | null | undefined): string | null => {
  if (!value) {
    return null;
  }
  return value.replace(/[^\d]/g, '');
};
