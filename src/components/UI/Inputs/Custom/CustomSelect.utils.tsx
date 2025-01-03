import type { CustomSelectData } from './CustomSelect';

export const getValueLabel = (concatData: CustomSelectData[], value: string) =>
  concatData.find((item) => item.value === value)?.label || value;

export const filterData = (searchTerm: string, commonData: CustomSelectData[], concatData: CustomSelectData[]) => {
  if (searchTerm?.length < 3) {
    // return commonData.filter((item) => item.label.toLowerCase().includes(searchTerm.toLowerCase()));
    return commonData;
  }

  return concatData.filter(
    (item) =>
      item.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subLabel?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};

export const findMatch = (searchTerm: string, commonData: CustomSelectData[]) =>
  commonData.find((item) => item?.label?.toLowerCase() === searchTerm.toLowerCase());
