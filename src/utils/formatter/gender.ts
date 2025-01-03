export type Genders = keyof typeof GENDERS;

const GENDERS = {
  female: 'F',
  male: 'M',
  other: 'X',
} as const;

export const getShorterGenderString = (gender: Genders) => GENDERS[gender];
