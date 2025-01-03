import type { SeparatedDateModel } from '../common/Date';

export type BloodSugarLogsApiList = {
  bloodSugars: BloodSugarLogs;
};

export interface BloodSugarLog extends NewBloodSugarLog {
  id: string;
}

export type Insulin = {
  type: string;
  dose: number;
};

export type NewBloodSugarLog = {
  date: SeparatedDateModel;
  commonDate?: Date;
  millimolesPerLitreValue: number | null;
  milligramsPerMillilitresValue: number | null;
  bloodPressureUnitType: 'mgdL' | 'mmolL';
  carbs: string | null;
  mealType?: string;
  mealTime?: string;
  insulin?: Insulin[];
  explanation?: string;
};

export type BloodSugarLogs = BloodSugarLog[];
