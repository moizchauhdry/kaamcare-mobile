import { useEffect, useState } from 'react';

const DEFAULT_DELAY = 1000;

export const useDebounceValue = (value = '', delay = DEFAULT_DELAY) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};
