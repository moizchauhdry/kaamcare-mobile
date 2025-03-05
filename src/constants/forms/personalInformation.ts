import { BloodType, Gender } from '../enums/profile/profile';

export const bloodTypeLetter = [
  {
    label: 'A',
    value: 'A',
  },
  {
    label: 'B',
    value: 'B',
  },
  {
    label: 'AB',
    value: 'AB',
  },
  {
    label: 'O',
    value: 'O',
  },
];

export const bloodTypeSign = [
  {
    label: '+',
    value: 'Positive',
  },
  {
    label: '-',
    value: 'Negative',
  },
];

export const bloodTypePickerData = [
  {
    label: 'O +',
    value: BloodType.OPositive,
  },
  {
    label: 'O -',
    value: BloodType.ONegative,
  },
  {
    label: 'A +',
    value: BloodType.APositive,
  },
  {
    label: 'A -',
    value: BloodType.ANegative,
  },
  {
    label: 'B +',
    value: BloodType.BPositive,
  },
  {
    label: 'B -',
    value: BloodType.BNegative,
  },
  {
    label: 'AB +',
    value: BloodType.AbPositive,
  },
  {
    label: 'AB -',
    value: BloodType.AbNegative,
  },
];

export const genderPickerData = [
  {
    label: 'Female',
    value: Gender.Female,
  },
  {
    label: 'Male',
    value: Gender.Male,
  },
  {
    label: 'Other',
    value: Gender.Other,
  },
];

export const formDefaultValues = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  bloodType: '',
  gender: '',
  weight: '',
  height: '',
};
