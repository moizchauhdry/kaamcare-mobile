import type { GraphStage } from '../../model/medicalLogs/MedicalLogsCommon';

type Reading<T> = {
  [K in keyof T]: number;
};

type CalculatedStats<T> = {
  average: {
    [K in keyof T]: number;
  };
  min: {
    [K in keyof T]: number;
  };
  max: {
    [K in keyof T]: number;
  };
  total: {
    [K in keyof T]: number;
  };
};

type BloodPressureAveragesValues = {
  millimetersOfMercurySystolic: number;
  millimetersOfMercuryDiastolic: number;
  pulse: number;
};

type SaturationAveragesValues = {
  spO2Value: number;
};

type BloodPressureGraphStageData = {
  color: string;
  label: string;
  min?: {
    systolic: number;
    diastolic: number;
  };
  max?: {
    systolic: number;
    diastolic: number;
  };
};

export const medicalLogsSummaryCalculationData = <TData>(
  data: TData[],
  keys: (keyof TData)[],
): CalculatedStats<TData> | undefined => {
  if (data.length === 0) {
    return;
  }

  const total: Partial<Reading<TData>> = {};
  const min: Partial<Reading<TData>> = {};
  const max: Partial<Reading<TData>> = {};

  keys.forEach((key) => {
    total[key] = 0;
    min[key] = data[0]?.[key] ? parseFloat(data[0][key] as string) : 0;
    max[key] = data[0]?.[key] ? parseFloat(data[0][key] as string) : 0;
  });

  for (const reading of data) {
    keys.forEach((key) => {
      const item =
        typeof reading[key] === 'number'
          ? (reading[key] as number)
          : typeof reading[key] === 'string'
            ? parseFloat(reading[key] as string)
            : 0;
      total[key]! += item;

      if (item < min[key]!) {
        min[key] = item;
      }

      if (item > max[key]!) {
        max[key] = item;
      }
    });
  }

  const count = data.length;
  const average: Partial<Reading<TData>> = {};

  keys.forEach((key) => {
    average[key] = Math.round(total[key]! / count);
    min[key] = Math.round(min[key]!);
    max[key] = Math.round(max[key]!);
    total[key] = Math.round(total[key]!);
  });

  return {
    average: average as Reading<TData>,
    min: min as Reading<TData>,
    max: max as Reading<TData>,
    total: total as Reading<TData>,
  };
};

const determineBooleanDependsOnConditionType = (conditions: boolean[], conditionType: 'OR' | 'AND') => {
  if (conditionType === 'OR') {
    return conditions.some((elem) => elem);
  }

  return conditions.every((elem) => elem);
};

export const determineBloodPulseStage = (averages: BloodPressureAveragesValues | undefined, stages: GraphStage[]) => {
  if (!averages) {
    return {
      label: '',
      color: 'red',
    };
  }

  const stage = stages[0];

  const min = {
    pulse: stage!.scopes.find((scope) => scope.key === 'pulse')!.min,
  };
  const max = {
    pulse: stage!.scopes.find((scope) => scope.key === 'pulse')!.max,
  };
  const pulseInRange = averages.pulse >= min.pulse && averages.pulse <= max.pulse;

  if (pulseInRange) {
    return { label: stage!.label, color: stage!.color, min, max };
  }
  return { label: 'Not normal', color: 'red' };
};

export const determineBloodPressureStage = (
  averages: BloodPressureAveragesValues | undefined,
  stages: GraphStage[],
): BloodPressureGraphStageData => {
  if (!averages) {
    return {
      label: '',
      color: 'white',
    };
  }

  for (const stage of stages) {
    const min = {
      systolic: stage.scopes.find((scope) => scope.key === 'systolic')!.min,
      diastolic: stage.scopes.find((scope) => scope.key === 'diastolic')!.min,
    };
    const max = {
      systolic: stage.scopes.find((scope) => scope.key === 'systolic')!.max,
      diastolic: stage.scopes.find((scope) => scope.key === 'diastolic')!.max,
    };
    const systolicInRange =
      averages.millimetersOfMercurySystolic >= min.systolic && averages.millimetersOfMercurySystolic <= max.systolic;
    const diastolicInRange =
      averages.millimetersOfMercuryDiastolic >= min.diastolic &&
      averages.millimetersOfMercuryDiastolic <= max.diastolic;

    if (determineBooleanDependsOnConditionType([systolicInRange, diastolicInRange], stage.conditionType)) {
      return { label: stage.label, color: stage.color, min, max };
    }
  }

  return {
    label: '',
    color: 'white',
  };
};

export const determineSaturationStage = (averages: SaturationAveragesValues | undefined, stages: GraphStage[]) => {
  if (!averages) {
    return {
      label: '',
      color: 'white',
    };
  }

  for (const stage of stages) {
    const min = {
      spo2: stage.scopes.find((scope) => scope.key === 'spo2')!.min,
    };
    const max = {
      spo2: stage.scopes.find((scope) => scope.key === 'spo2')!.max,
    };
    const spo2InRange = averages.spO2Value >= min.spo2 && averages.spO2Value <= max.spo2;

    if (determineBooleanDependsOnConditionType([spo2InRange], stage.conditionType)) {
      return { label: stage.label, color: stage.color, min, max };
    }
  }

  return {
    label: '',
    color: 'white',
  };
};
