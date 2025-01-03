import { useMemo, useState } from 'react';

import { getDateFilters } from '../utils/date/date';

export const useMedicalLogsDateFilter = (initialDays?: number) => {
  const [days, setDays] = useState(initialDays ?? 0);
  const [startDate, setStartDate] = useState(new Date());
  const filters = useMemo(() => getDateFilters(startDate, days), [startDate, days]);

  const onDateChange = (date: Date) => setStartDate(date);
  const onDaysChange = (value: number) => setDays(value);

  return {
    filters,
    days,
    startDate,
    onDateChange,
    onDaysChange,
  };
};
