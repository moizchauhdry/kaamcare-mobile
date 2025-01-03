import type { SeparatedDateModel } from '../common/Date';

export type SaturationLogsApiList = {
  saturation: SaturationApiLog[];
};

export interface SaturationLog extends NewSaturationLog {
  id: string;
}

export type NewSaturationLog = {
  date: SeparatedDateModel;
  spO2Value: string;
  explanation?: string;
};

export type SaturationApiLog = {
  id: string;
  date: SeparatedDateModel;
  spO2Value: number;
  explanation?: string;

  commonDate?: Date;
};

export type SaturationLogs = SaturationApiLog[];
