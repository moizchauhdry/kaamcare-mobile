import type { SeparatedDateModel } from '../common/Date';

export type WeightLogsApiList = {
  weights: WeightLogs;
};

export type WeightLogsApiListAll = {
  weight: WeightLogs;
};

export type NewWeightLog = {
  date: SeparatedDateModel;
  currentPounds: string;
  currentKilograms: string;
  explanation?: string;
  unitType: 'Kilogram' | 'Pound';
};

export type WeightApiLog = {
  id: string;
  date: SeparatedDateModel;
  currentPounds: string;
  currentKilograms: string;
  currentKilogram?: string;
  explanation?: string;
  unitType: 'Kilogram' | 'Pound';

  commonDate?: Date;
};

export type WeightLogs = WeightApiLog[];
