import type { CustomSelectData } from '../../components/UI/Inputs/Custom/CustomSelect';
import { getDateFromSeparatedModel } from '../date/date';

export const isArrayFilled = <T>(data: T[]) => data.length !== 0;

export const hasArrayNonFalsyValue = <T>(data: T[]) => data.some((item) => item);

export const searchForSelectFullElem = (
  value: string,
  commonData: CustomSelectData[],
  dynamicData: CustomSelectData[],
) => {
  const name = commonData.find((elem) => elem.value === value);

  if (name?.label) {
    return name;
  }

  return dynamicData.find((elem) => elem.value === value);
};

export const searchForSelectElem = (value: string, commonData: CustomSelectData[], dynamicData: CustomSelectData[]) => {
  const name = commonData.find((elem) => elem.value === value)?.label;

  if (name) {
    return name;
  }

  return dynamicData.find((elem) => elem.value === value)?.label ?? value;
};

export const sortByDate = (array: any[], dateKey: string): any[] =>
  array.sort((a, b) => {
    const dateA = typeof a[dateKey] === 'object' ? getDateFromSeparatedModel(a[dateKey]) : new Date(a[dateKey]);
    const dateB = typeof b[dateKey] === 'object' ? getDateFromSeparatedModel(b[dateKey]) : new Date(b[dateKey]);
    return dateB.getTime() - dateA.getTime();
  });

export const sortByName = <TData>(data: TData[], nameKey: keyof TData): TData[] => {
  if (data.length === 0) {
    return data;
  }

  return [...data].sort((a, b) => {
    if (a?.[nameKey] && b?.[nameKey]) {
      return a[nameKey]! < b[nameKey]! ? -1 : 1;
    }

    return 0;
  });
};

export const findLastValueIndex = <TData extends { value: number | null }>(data?: TData[]) => {
  let lastIndex = 0;

  data?.forEach((elem, index) => {
    if (elem.value) {
      lastIndex = index;
    }
  });

  return lastIndex;
};

export const findLastStackIndex = <TData extends { stacks: { value: number }[] }>(data?: TData[]) => {
  let lastIndex = 0;

  data?.forEach((elem, index) => {
    if (elem.stacks.some((stack) => Boolean(stack.value))) {
      lastIndex = index;
    }
  });

  return lastIndex;
};

export const findFirstValueIndex = <TData extends { value: number | null }>(data?: TData[]) => {
  if (!data) {
    return 0;
  }
  return data?.findIndex((elem) => Boolean(elem.value));
};

export const findMax = (arr: (number | { value: number | null })[]): number | null => {
  let maxValue: number | null = null;

  for (const item of arr) {
    let currentValue: number | null;

    if (typeof item === 'number') {
      currentValue = item;
    } else if (item && typeof item.value === 'number') {
      currentValue = item.value;
    } else {
      currentValue = null;
    }

    if (currentValue !== null && (maxValue === null || currentValue > maxValue)) {
      maxValue = currentValue;
    }
  }

  return maxValue;
};
