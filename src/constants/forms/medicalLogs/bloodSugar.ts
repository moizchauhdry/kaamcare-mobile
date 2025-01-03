export const bloodSugarDefaultValues = {
  bloodSugar: '',
  carbs: '',
  meal: '',
  when: '',
  insulin: [],
  explanation: '',
};

export const mealSelectValues = [
  { value: 'Breakfast', label: 'Breakfast' },
  { value: 'Lunch', label: 'Lunch' },
  { value: 'Dinner', label: 'Dinner' },
  { value: 'Casual', label: 'Casual' },
  { value: 'Bedtime', label: 'Bedtime' },
];

export const whenSelectValues = [
  { value: 'Fasting', label: 'Fasting' },
  { value: 'Before', label: 'Before' },
  { value: 'After1h', label: 'After (1h)' },
  { value: 'After2h', label: 'After (2h)' },
  { value: 'After3h', label: 'After (3h)' },
];

export const insulinTypeValues = [
  { label: 'Long', value: 'LongActing' },
  { label: 'Rapid', value: 'RapidActing' },
  { label: 'Intermediate', value: 'IntermediateActing' },
];
