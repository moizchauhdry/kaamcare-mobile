export type SeparatedDateModel = {
  year: number | string | null;
  month: number | string | null;
  day: number | string | null;
  hour?: number;
  minute?: number;
  partOfDay?: 'AM' | 'PM';
};

export type SeparatedDateModelFilterFrom = {
  DateFromYear: number;
  DateFromMonth: number;
  DateFromDay: number;
  DateFromHours: number;
  DateFromMinutes: number;
  DateFromPartOfDay: 'AM' | 'PM';
};

export type SeparatedDateModelFilterTo = {
  DateToYear: number;
  DateToMonth: number;
  DateToDay: number;
  DateToHours: number;
  DateToMinutes: number;
  DateToPartOfDay: 'AM' | 'PM';
};

export type DateFilterModel = {
  startDate: SeparatedDateModelFilterFrom;
  endDate: SeparatedDateModelFilterTo;
};
