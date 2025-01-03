export const changeKilogramToPound = (value?: number | string | null, unitType?: 'Kilogram' | 'Pound') => {
  if (!value) {
    return;
  }
  const valueNumber = typeof value === 'string' ? parseFloat(value) : value;

  return unitType === 'Kilogram' ? valueNumber : valueNumber ? valueNumber * 2.20462 : undefined;
};
