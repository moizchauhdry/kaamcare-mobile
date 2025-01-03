import type { SeparatedDateModel } from '../common/Date';

export type BloodPressureLogsApiList = {
  bloodPressurePulses: BloodPressureLog[];
};

export type NewBloodPressureLog = {
  date: SeparatedDateModel;
  diastolic: string;
  systolic: string;
  pulse: number;
  position?: string | null;
  side?: string | null;
  explanation?: string;
  unitType: 'mmHg' | 'kPa';
};

export type VariablerBloodPressureLog = NewBloodPressureLog & {
  id: string;
};

export type BloodPressureApiLog = {
  date: SeparatedDateModel;
  explanation: string;
  id: string;
  kilopascalsDiastolic: number;
  kilopascalsSystolic: number;
  millimetersOfMercuryDiastolic: number;
  millimetersOfMercurySystolic: number;
  position: string;
  pulse: number;
  side: string;
  unitType: string;
};

export type BloodPressureLog = {
  date: SeparatedDateModel;
  explanation: string;
  id: string;
  kilopascalsDiastolic: number;
  kilopascalsSystolic: number;
  millimetersOfMercuryDiastolic: number;
  millimetersOfMercurySystolic: number;
  position: string | null;
  pulse: number;
  side: string | null;
  unitType: 'mmHg' | 'kPa';

  commonDate?: Date;
};

export type BloodPressureLogs = BloodPressureLog[];
