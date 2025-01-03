import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useEffect, useState } from 'react';

import chevronLeft from 'assets/icons/chevron-left.svg';
import chevronRight from 'assets/icons/chevron-right.svg';

import { Typography } from '../Typography/Typography';
import { calculateMilisecondsFromDay, formatDate } from '../../../utils/date/date';

type DatePaginationProps = {
  subDays: number;
  maxDate?: Date;
  onDateChange?: (date: Date) => void;
};

export const DatePagination = ({ subDays, onDateChange, maxDate = new Date() }: DatePaginationProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const isFutureDisabled = formatDate(currentDate) === formatDate(maxDate);
  const isPastDisabled = false;
  const properSubDays = subDays !== 1 ? subDays - 1 : subDays;

  useEffect(() => {
    setCurrentDate(maxDate);
    onDateChange?.(maxDate);
    /* eslint-disable-next-line */
  }, [subDays]);

  const handlePrevDate = () => {
    const newData = new Date(currentDate.getTime() - calculateMilisecondsFromDay(properSubDays));
    setCurrentDate(newData);
    onDateChange?.(newData);
  };

  const handleNextDate = () => {
    const newData = new Date(currentDate.getTime() + calculateMilisecondsFromDay(properSubDays));
    setCurrentDate(newData);
    onDateChange?.(newData);
  };

  const getFormattedDate = () => {
    const formattedDate = formatDate(currentDate, 'date');

    if (subDays === 1) {
      return formattedDate;
    }
    const startDate = formatDate(new Date(currentDate.getTime() - calculateMilisecondsFromDay(properSubDays)), 'date');
    return `${startDate} - ${formattedDate}`;
  };

  return (
    <View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
      <TouchableOpacity
        onPress={handlePrevDate}
        disabled={isPastDisabled}
        style={{ opacity: isPastDisabled ? 0.5 : 1 }}
      >
        <SvgXml xml={chevronLeft} />
      </TouchableOpacity>
      <Typography size="sm">{getFormattedDate()}</Typography>
      <TouchableOpacity
        onPress={handleNextDate}
        disabled={isFutureDisabled}
        style={{
          opacity: isFutureDisabled ? 0.5 : 1,
        }}
      >
        <SvgXml xml={chevronRight} />
      </TouchableOpacity>
    </View>
  );
};
