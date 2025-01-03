import type { SeparatedDateModel } from '../common/Date';

export type HeightLogsApiList = {
  height: HeightLogs;
};

export type HeightLogsApiListAll = {
  heights: HeightLogs;
};

export interface HeightLog extends NewHeightLog {
  id: string;
}

export type NewHeightLog = {
  date: SeparatedDateModel;
  currentCentimeters: string;
  currentInch: string;
  currentFeet: string;
  currentTotalInches: number;
  unitType: 'Centimeter' | 'FeetInch';
  explanation?: string;

  commonDate?: Date;
};

export type HeightLogs = HeightLog[];
