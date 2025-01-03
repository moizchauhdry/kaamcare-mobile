export const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
export const lowerCase = (value: string) => value.charAt(0).toLowerCase() + value.slice(1);

export const splitStringBySuffix = (input?: string, suffixes?: string[] | string): string[] | undefined => {
  if (!input) {
    return undefined;
  }

  if (Array.isArray(suffixes)) {
    for (const suffix of suffixes) {
      if (input.endsWith(suffix)) {
        const prefix = input.slice(0, -suffix.length);
        return [prefix, suffix];
      }
    }
  }

  return input.split(typeof suffixes === 'string' ? suffixes : ' ');
};
