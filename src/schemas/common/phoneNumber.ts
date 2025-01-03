import { z } from 'zod';

import { PHONE_NUMBER_REGEX, PHONE_NUMBER_REGEX_FIRST_DIGIT } from 'constants/patterns/phoneRegex';

const isEmpty = (value: string) => value === '' || value === '(' || value === null;

const validatePhoneNumberFormat = (value: string) => isEmpty(value) || PHONE_NUMBER_REGEX.test(value);

const validateFirstDigit = (value: string) => isEmpty(value) || PHONE_NUMBER_REGEX_FIRST_DIGIT.test(value);

export const phoneNumberSchema = z
  .string()
  .refine(validatePhoneNumberFormat, { message: 'Please use (XXX) XXX-XXXX number format.' })
  .refine(validateFirstDigit, { message: 'The first digit cannot be 0 or 1.' })
  .nullable()
  .optional();
