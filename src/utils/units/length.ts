export const changeCentimeterToFeetInch = (value?: number | string | null, length?: 'FeetInch' | 'Centimeter') => {
  if (!value) {
    return;
  }

  const valueNumber = typeof value === 'string' ? parseFloat(value) : value;

  const inches = valueNumber / 2.54;
  const feet = Math.floor(inches / 12);
  const inch = inches - feet * 12;

  return length === 'Centimeter' ? valueNumber : parseFloat(`${feet}.${inch}`);
};
