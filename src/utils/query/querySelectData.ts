import type {
  DateFilterModel,
  SeparatedDateModel,
  SeparatedDateModelFilterFrom,
  SeparatedDateModelFilterTo,
} from '../../model/api/common/Date';
import { getDateFromSeparatedModel } from '../date/date';

function convertFilterToDate(filter: SeparatedDateModelFilterTo): Date {
  const { DateToYear, DateToMonth, DateToDay, DateToHours, DateToMinutes, DateToPartOfDay } = filter;
  let hours = DateToHours % 12;
  if (DateToPartOfDay === 'PM') {
    hours += 12;
  }
  return new Date(DateToYear, DateToMonth - 1, DateToDay, hours, DateToMinutes);
}

function convertFilterFromDate(filter: SeparatedDateModelFilterFrom): Date {
  const { DateFromYear, DateFromMonth, DateFromDay, DateFromHours, DateFromMinutes, DateFromPartOfDay } = filter;
  let hours = DateFromHours % 12;
  if (DateFromPartOfDay === 'PM') {
    hours += 12;
  }
  return new Date(DateFromYear, DateFromMonth - 1, DateFromDay, hours, DateFromMinutes);
}

export const selectDataBasedOnDate = <TData extends { date: SeparatedDateModel }>(
  data: TData[],
  filters: DateFilterModel,
): TData[] => {
  const startDate = convertFilterFromDate(filters.startDate);
  const endDate = convertFilterToDate(filters.endDate);

  return data.filter((item) => {
    const itemDate = getDateFromSeparatedModel(item.date);
    if (itemDate === null) return false;
    return itemDate >= startDate && itemDate <= endDate;
  });
};
