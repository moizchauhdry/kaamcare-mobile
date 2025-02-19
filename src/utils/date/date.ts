import type {
  SeparatedDateModel,
  SeparatedDateModelFilterFrom,
  SeparatedDateModelFilterTo,
} from '../../model/api/common/Date';
import { medicalLogsTabsDays } from '../../constants/data/medicalLogs/common';

const formatDatePart = (part?: number | string | null) => {
  if (!part && part !== 0) {
    return;
  }

  const properPart = typeof part === 'string' ? parseInt(part, 10) : part;

  return properPart < 10 ? `0${properPart}` : properPart.toString();
};

export const formatDate = (date: Date, mode?: 'date' | 'datetime') => {
  const newDate = new Date(date);

  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();

  const properMonth = month >= 10 ? month : `0${month}`;
  const properDay = day >= 10 ? day : `0${day}`;

  if (mode === 'datetime') {
    const hour = newDate.getHours();
    const hour12 = hour % 12 || 12;
    const minutes = newDate.getMinutes();

    const properMinutes = formatDatePart(minutes);

    return `${properMonth}-${properDay}-${year}, ${hour12}:${properMinutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  }

  return `${properMonth}-${properDay}-${year}`;
};

export const getHourFromDate = (date: Date | string) => {
  const properDate = new Date(date);
  const hour = properDate.getHours();
  const hour12 = hour % 12 || 12;

  return `${hour12} ${hour >= 12 ? 'PM' : 'AM'}`;
};

export const getFullHourFromDate = (date: Date | string) => {
  const newDate = new Date(date);
  const hour = newDate.getHours();
  const hour12 = hour % 12 || 12;
  const minutes = newDate.getMinutes();

  const properMinutes = formatDatePart(minutes);

  return `${hour12}:${properMinutes} ${hour >= 12 ? 'PM' : 'AM'}`;
};

export const formatDateWithMonthShotName = (date: Date | string) => {
  const newDate = new Date(date);

  const month = newDate.toLocaleDateString('default', { month: 'short' });
  const day = newDate.getDate();
  const year = newDate.getFullYear();

  const properDay = day >= 10 ? day : `0${day}`;

  return `${month} ${properDay}, ${year}`;
};

export const formatDateYearsDifference = (date: Date | string) => {
  const previousDate = new Date(date);
  const currentDate = new Date();
  let age = currentDate.getFullYear() - previousDate.getFullYear();
  const monthDifference = currentDate.getMonth() - previousDate.getMonth();
  const dayDifference = currentDate.getDate() - previousDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
};

export const displayDateSegment = (
  day?: number | string | null,
  month?: number | string | null,
  year?: string | number | null,
) => {
  const dateParts = [formatDatePart(month), formatDatePart(day), year].filter((part) => part !== undefined);
  return dateParts.join('.');
};

export const calculateMilisecondsFromDay = (day: number) => day * 1000 * 60 * 60 * 24;

export const formatDateForChart = (date: Date | string) => {
  const properDate = new Date(date);

  return `${formatDatePart(properDate.getMonth() + 1)}.${formatDatePart(properDate.getDate())}`;
};

export const getDateFromSeparatedModel = (date: SeparatedDateModel): Date => {
  const current = new Date();
  const hour24 =
    date.partOfDay === 'PM' && date.hour !== 12
      ? date.hour! + 12
      : date.hour === 12 && date.partOfDay === 'AM'
        ? 0
        : date.hour;

  return new Date(
    date.year ?? current.getFullYear(),
    (date.month ?? current.getMonth()) - 1,
    date.day ?? current.getDate(),
    hour24,
    date.minute,
  );
};

export const getSeparatedModelFromDate = (date: Date): SeparatedDateModel => {
  const hours = date.getHours();
  const partOfDay: 'AM' | 'PM' = hours >= 12 ? 'PM' : 'AM';

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: hours % 12 === 0 ? 12 : hours % 12,
    minute: date.getMinutes(),
    partOfDay,
  };
};

export const createDateFilterToObject = (date: Date): SeparatedDateModelFilterTo => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return {
    DateToYear: year,
    DateToMonth: month,
    DateToDay: day,
    DateToHours: 11,
    DateToMinutes: 59,
    DateToPartOfDay: 'PM',
  };
};

export const createDateFilterFromObject = (date: Date): SeparatedDateModelFilterFrom => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return {
    DateFromYear: year,
    DateFromMonth: month,
    DateFromDay: day,
    DateFromHours: 12,
    DateFromMinutes: 0,
    DateFromPartOfDay: 'AM',
  };
};

export const calculateStartDateFromEndDate = (endDate: Date, daysAgo: number): Date => {
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - daysAgo + 1);
  return startDate;
};

export const getDateFilters = (startDate: Date, days: number) => {
  const startDateFilter =
    days !== 0
      ? createDateFilterFromObject(calculateStartDateFromEndDate(startDate, medicalLogsTabsDays[days]!.subDays))
      : createDateFilterFromObject(startDate);
  const endDateFilter = createDateFilterToObject(startDate);

  return {
    startDate: startDateFilter,
    endDate: endDateFilter,
  };
};
