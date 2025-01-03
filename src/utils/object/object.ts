export function isObjectSomeDataFilled<T>(data: T | undefined, arrayKeysToOmit?: (keyof T)[]): boolean {
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return false;
  }

  return Object.entries(data).some(([key, value]) => {
    if (arrayKeysToOmit?.includes(key as keyof T)) {
      return false;
    }
    return typeof value === 'object' ? isObjectSomeDataFilled(value) : !!value;
  });
}
