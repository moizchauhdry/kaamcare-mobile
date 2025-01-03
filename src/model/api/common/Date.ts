export type SeparatedDateModel = {
  year: number | null;
  month: number | null;
  day: number | null;
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
