import { useMemo, useState } from 'react';

import type { CustomSelectData } from './CustomSelect';
import { useDebounceValue } from '../../../../hooks/useDebounceValue';
import { filterData } from './CustomSelect.utils';

export const useCustomSelect = (
  commonData: CustomSelectData[],
  dynamicData: CustomSelectData[],
  optionalConcatData?: CustomSelectData[],
) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const debounceValue = useDebounceValue(searchTerm);

  const concatData = useMemo(
    () => optionalConcatData ?? [...commonData, ...dynamicData],
    [optionalConcatData, commonData, dynamicData],
  );

  const filteredData = useMemo(
    () => filterData(debounceValue, commonData, concatData),
    [debounceValue, commonData, concatData],
  );

  return { concatData, searchTerm, setSearchTerm, debounceValue, filteredData };
};
