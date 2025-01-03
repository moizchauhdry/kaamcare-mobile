// Generic parsing function
export const parseApiToSelectDataGeneric = <T>(data: T[], idKey: keyof T, nameKey: keyof T) =>
  data.map((elem) => ({
    value: elem[idKey] as string,
    label: elem[nameKey] as string,
  }));
