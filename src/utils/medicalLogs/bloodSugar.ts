import type { GraphStage } from '../../model/medicalLogs/MedicalLogsCommon';
import type { BloodSugarLog, Insulin } from '../../model/api/medicalLogs/BloodSugar';

type BloodSugarAveragesValues = {
  bloodSugar: number;
};

type BloodSugarGraphStageData = {
  color: string;
  label: string;
  min?: {
    bloodSugar: number;
  };
  max?: {
    bloodSugar: number;
  };
};

type BloodSugarCarbsStats = {
  average: number;
  min: number;
  max: number;
};

type SummaryStats = {
  insulinStats: InsulinStats;
  bloodSugarStats: BloodSugarCarbsStats;
  carbsStats: BloodSugarCarbsStats;
};

export type InsulinStats = {
  rapid: InsulinSummary;
  intermediate: InsulinSummary;
  long: InsulinSummary;
};

type InsulinSummary = {
  total: number;
  average: number;
};

export const determineBloodSugarStage = (
  averages: BloodSugarAveragesValues | undefined,
  stages: GraphStage[],
  key: string,
): BloodSugarGraphStageData => {
  if (!averages) {
    return {
      label: '',
      color: 'white',
    };
  }

  for (const stage of stages) {
    const min = {
      bloodSugar: stage.scopes.find((scope) => scope.key === key)!.min,
    };
    const max = {
      bloodSugar: stage.scopes.find((scope) => scope.key === key)!.max,
    };
    const sugarInRange = averages.bloodSugar >= min.bloodSugar && averages.bloodSugar <= max.bloodSugar;

    if (sugarInRange) {
      return { label: stage.label, color: stage.color, min, max };
    }
  }

  return {
    label: '',
    color: 'white',
  };
};

export const calculateLogInsulin = (insulin?: Insulin[]): Insulin[] => {
  if (!insulin || insulin.length === 0) {
    return [];
  }

  const unitsMap: { [key: string]: number } = {};

  insulin.forEach((item) => {
    if (unitsMap[item.type]) {
      unitsMap[item.type] += item.dose;
    } else {
      unitsMap[item.type] = item.dose;
    }
  });

  return Object.keys(unitsMap).map((type) => ({ dose: unitsMap[type]!, type }));
};

export const calculateBloodSugarSummaryStats = (logs: BloodSugarLog[], unitType: 'mmolL' | 'mgdL'): SummaryStats => {
  const insulinTypes: { [key: string]: { total: number; count: number } } = {
    RapidActing: { total: 0, count: 0 },
    IntermediateActing: { total: 0, count: 0 },
    LongActing: { total: 0, count: 0 },
  };

  let bloodSugarTotal = 0;
  let carbsTotal = 0;
  let bloodSugarMin = Infinity;
  let bloodSugarMax = -Infinity;
  let carbsMin = Infinity;
  let carbsMax = -Infinity;
  let bloodSugarCount = 0;
  let carbsCount = 0;

  logs.forEach((log) => {
    log.insulin?.forEach((insulin) => {
      if (insulinTypes[insulin.type]) {
        const typeStats = insulinTypes[insulin.type];
        typeStats!.total += insulin.dose;
        typeStats!.count += 1;
      }
    });

    const bloodSugar = unitType === 'mgdL' ? log.milligramsPerMillilitresValue : log.millimolesPerLitreValue;
    if (!Number.isNaN(bloodSugar)) {
      bloodSugarTotal += bloodSugar ?? 0;
      bloodSugarCount += 1;
      bloodSugarMin = Math.min(bloodSugarMin, bloodSugar ?? 0);
      bloodSugarMax = Math.max(bloodSugarMax, bloodSugar ?? 0);
    }

    const carbs = log.carbs ? parseFloat(log.carbs) : 0;
    if (!Number.isNaN(carbs)) {
      carbsTotal += carbs;
      carbsCount += 1;
      if (carbs) {
        carbsMin = Math.min(carbsMin, carbs);
      }
      carbsMax = Math.max(carbsMax, carbs);
    }
  });

  const calculateInsulinSummary = (type: string) => ({
    total: insulinTypes[type]!.total,
    average: insulinTypes[type]!.count > 0 ? insulinTypes[type]!.total / insulinTypes[type]!.count : 0,
  });

  const calculateStats = (total: number, count: number, min: number, max: number) => ({
    average: count > 0 ? parseFloat((total / count).toFixed(2)) : 0,
    min: count > 0 ? min : 0,
    max: count > 0 ? max : 0,
  });

  return {
    insulinStats: {
      rapid: calculateInsulinSummary('RapidActing'),
      intermediate: calculateInsulinSummary('IntermediateActing'),
      long: calculateInsulinSummary('LongActing'),
    },
    bloodSugarStats: calculateStats(bloodSugarTotal, bloodSugarCount, bloodSugarMin, bloodSugarMax),
    carbsStats: calculateStats(carbsTotal, carbsCount, carbsMin === Infinity ? 0 : carbsMin, carbsMax),
  };
};
