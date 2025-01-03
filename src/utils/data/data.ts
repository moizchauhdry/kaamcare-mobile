import { isArrayFilled } from '../array/array';
import { isObjectSomeDataFilled } from '../object/object';

export const isDataFilled = <T>(data: T | T[] | undefined, arrayKeysToOmit?: (keyof T)[]) => {
  if (Array.isArray(data)) {
    return isArrayFilled(data);
  }

  return isObjectSomeDataFilled(data, arrayKeysToOmit);
};
