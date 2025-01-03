import type { RadioButtonProps } from '../../../components/UI/RadioButton/RadioButton';

export const adlDefaultValues = {
  feeding: {
    explanation: '',
    value: '',
    isActive: false,
  },
  bathing: {
    explanation: '',
    value: '',
    isActive: false,
  },
  grooming: {
    explanation: '',
    value: '',
    isActive: false,
  },
  dressing: {
    explanation: '',
    value: '',
    isActive: false,
  },
  bowelControl: {
    explanation: '',
    value: '',
    isActive: false,
  },
  bladderControl: {
    explanation: '',
    value: '',
    isActive: false,
  },
  toiletUse: {
    explanation: '',
    value: '',
    isActive: false,
  },
  transfers: {
    explanation: '',
    value: '',
    isActive: false,
  },
  mobility: {
    explanation: '',
    value: '',
    isActive: false,
  },
  stairs: {
    explanation: '',
    value: '',
    isActive: false,
  },
};

export const toggleADLSectionAlert = (name: string) => ({
  title: `Disable ${name}`,
  description: `Are you sure that you want to disable ${name}? You will lose your data.`,
  proceed: 'Yes, disable',
  cancel: 'Cancel',
});

export const feedingOptions: RadioButtonProps[] = [
  {
    id: '1',
    label: 'Independent',
    value: 'Independent',
  },
  {
    id: '2',
    label: 'Needs help',
    value: 'Needs help',
  },
  {
    id: '3',
    label: 'Unable',
    value: 'Unable',
  },
];

export const bathingOptions = [
  {
    id: '1',
    label: 'Independent',
    value: 'Independent',
  },
  {
    id: '2',
    label: 'Unable',
    value: 'Unable',
  },
];

export const groomingOptions = [
  {
    id: '1',
    label: 'Independent',
    value: 'Independent',
  },
  {
    id: '2',
    label: 'Unable',
    value: 'Unable',
  },
];

export const dressingOptions = [
  {
    id: '1',
    label: 'Independent',
    value: 'Independent',
  },
  {
    id: '2',
    label: 'Needs help',
    value: 'Needs help',
  },
  {
    id: '3',
    label: 'Unable',
    value: 'Unable',
  },
];

export const bowelOptions = [
  {
    id: '1',
    label: 'Continent',
    value: 'Continent',
  },
  {
    id: '2',
    label: 'Occasional accident',
    value: 'Occasional accident',
  },
  {
    id: '3',
    label: 'Incontinent',
    subLabel: 'or needs to be given enemas',
    value: 'Incontinent',
  },
];

export const bladderOptions = [
  {
    id: '1',
    label: 'Continent',
    value: 'Continent',
  },
  {
    id: '2',
    label: 'Occasional accident',
    value: 'Occasional accident',
  },
  {
    id: '3',
    label: 'Incontinent',
    subLabel: 'or needs to be given enemas',
    value: 'Incontinent',
  },
];

export const toiletUseOptions = [
  {
    id: '1',
    label: 'Independent',
    value: 'Independent',
  },
  {
    id: '2',
    label: 'Needs help',
    value: 'Needs help',
  },
  {
    id: '3',
    label: 'Unable',
    value: 'Unable',
  },
];

export const transferOptions = [
  {
    id: '1',
    label: 'Independent',
    value: 'Independent',
  },
  {
    id: '2',
    label: 'Needs minor help',
    subLabel: 'verbal or physical',
    value: 'Needs help verbal',
  },
  {
    id: '3',
    label: 'Needs minor help',
    subLabel: '1-2 people, physical, can sit',
    value: 'Needs help physical',
  },
  {
    id: '4',
    label: 'Unable',
    value: 'Unable',
  },
];

export const stairsOptions = [
  {
    id: '1',
    label: 'Independent',
    value: 'Independent',
  },
  {
    id: '2',
    label: 'Needs help',
    subLabel: 'verbal, physical, carrying aid',
    value: 'Needs help',
  },
  {
    id: '3',
    label: 'Unable',
    value: 'Unable',
  },
];

export const mobilityOptions = [
  {
    id: '1',
    label: 'Independent',
    subLabel: 'but may use any aid, e.g. stick, >50 yards',
    value: 'Independent',
  },
  {
    id: '2',
    label: 'Walks with help of one person',
    subLabel: 'verbal or physical, >50 yards',
    value: 'Needs help',
  },
  {
    id: '3',
    label: 'Wheelchair independent, including corners',
    subLabel: '1-2 people, physical, can sit',
    value: 'Unable',
  },
  {
    id: '4',
    label: 'Immobile or <50 yards',
    value: 'Immobile',
  },
];

export const mobilityMultiselectOptions = [
  {
    id: '1',
    label: 'Cane',
    value: 'Cane',
  },
  {
    id: '2',
    label: 'Crutches',
    value: 'Crutches',
  },
  {
    id: '3',
    label: 'Front Wheel',
    value: 'Front Wheel',
  },
  {
    id: '4',
    label: 'Wheel Walker',
    value: 'Wheel Walker',
  },
  {
    id: '5',
    label: 'Wheelchair Bedbound',
    value: 'Wheelchair Bedbound',
  },
];
