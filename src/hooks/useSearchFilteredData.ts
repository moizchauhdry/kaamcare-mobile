type DataField = {
  [key: string]: string | undefined;
  name?: string;
  label?: string;
  value?: string;
};

export const useSearchFilteredData = <T extends DataField>(value: string, data: T[], searchKey = 'value'): T[] => {
  if (value.length < 3) {
    return data;
  }

  return data.filter((elem) => elem[searchKey]?.toLowerCase().startsWith(value.toLowerCase()));
};
