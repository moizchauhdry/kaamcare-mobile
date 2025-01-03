export const isStringLongRequired = (text?: string | null) => {
  if (!text) {
    return false;
  }
  return text.trim().length >= 1;
};

export const isStringLongEnough = (text?: string | null, length = 3) => {
  if (!text) {
    return false;
  }
  return text.trim().length >= length;
};
