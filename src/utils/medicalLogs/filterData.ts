import { calculateMilisecondsFromDay, formatDate, getHourFromDate } from '../date/date';
import type { BloodPressureLog } from '../../model/api/medicalLogs/BloodPressure';
import {
  determineBloodPressureStage,
  determineBloodPulseStage,
  determineSaturationStage,
  medicalLogsSummaryCalculationData,
} from './summary';
import { graphStages, pulseGraphStages } from '../../constants/data/medicalLogs/bloodPressure';
import type { BloodSugarLog } from '../../model/api/medicalLogs/BloodSugar';
import { calculateBloodSugarSummaryStats, determineBloodSugarStage } from './bloodSugar';
import { bloodSugarGraphStages } from '../../constants/data/medicalLogs/bloodSugar';
import type { WeightApiLog } from '../../model/api/medicalLogs/Weight';
import type { HeightLog } from '../../model/api/medicalLogs/Height';
import { saturationGraphStages } from '../../constants/data/medicalLogs/saturation';
import type { SaturationApiLog } from '../../model/api/medicalLogs/Saturation';

export const filterDataByDate = <TData extends { date: Date }>(
  data: TData[],
  subDays: number,
  startDate?: Date,
): TData[] => {
  const now = startDate ?? new Date();
  const properStartDate = new Date(now.getTime() - calculateMilisecondsFromDay(subDays));

  return data
    .filter((elem) => {
      const date = new Date(elem.date);

      return date.getTime() >= properStartDate.getTime() && date.getTime() <= now.getTime();
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const filterDataByDays = <TData extends { commonDate?: Date }>(
  data: TData[],
  subDays: number,
): { [key: string]: TData[] } => {
  const groupedData: { [key: string]: TData[] } = {};

  data.forEach((elem) => {
    const key = subDays === 1 ? getHourFromDate(elem.commonDate!) : formatDate(elem.commonDate!, 'date');

    if (!groupedData[key]) {
      groupedData[key] = [];
      groupedData[key]?.push(elem);
      return;
    }

    groupedData[key]?.push(elem);
  });

  return groupedData;
};

export const filterDataByHours = <TData extends { commonDate?: Date }>(data: TData[]): { [key: string]: TData[] } => {
  const groupedData: { [key: string]: TData[] } = {};

  data.forEach((elem) => {
    const key = getHourFromDate(elem.commonDate!);

    if (!groupedData[key]) {
      groupedData[key] = [];
      groupedData[key]?.push(elem);
      return;
    }

    groupedData[key]?.push(elem);
  });

  return groupedData;
};

export const calculateAveragesBloodPressureValues = (data: { [key: string]: BloodPressureLog[] }) =>
  Object.keys(data).map((key: string) => {
    if (data[key] === undefined) {
      return;
    }

    const item = data[key]!;
    const calculatedData = medicalLogsSummaryCalculationData(item, [
      'millimetersOfMercurySystolic',
      'millimetersOfMercuryDiastolic',
      'kilopascalsSystolic',
      'kilopascalsDiastolic',
      'pulse',
    ]);
    const dataPointColor = determineBloodPressureStage(calculatedData?.average, graphStages);
    const pulseDataPointColor = determineBloodPulseStage(calculatedData?.average, pulseGraphStages);
    const returnData = {
      ...calculatedData,
      date: item[0]!.commonDate,
      color: dataPointColor.color,
      pulseColor: pulseDataPointColor.color,
    };

    return returnData;
  });

export const calculateAveragesSaturationValues = (data: { [key: string]: SaturationApiLog[] }) =>
  Object.keys(data).map((key: string) => {
    if (data[key] === undefined) {
      return;
    }

    const item = data[key]!;
    const calculatedData = medicalLogsSummaryCalculationData(item, ['spO2Value']);
    const dataPointColor = determineSaturationStage(calculatedData?.average, saturationGraphStages);

    return {
      ...calculatedData,
      date: item[0]!.commonDate,
      color: dataPointColor.color,
    };
  });

export const calculateAveragesBloodSugarValues = (
  data: { [key: string]: BloodSugarLog[] },
  unitType: 'mmolL' | 'mgdL',
) =>
  Object.keys(data).map((key: string) => {
    if (data[key] === undefined) {
      return;
    }

    const item = data[key]!;
    const calculatedData = calculateBloodSugarSummaryStats(item, unitType);
    const dataPointColor = determineBloodSugarStage(
      { bloodSugar: calculatedData?.bloodSugarStats.average },
      bloodSugarGraphStages,
      unitType === 'mmolL' ? 'bloodSugarmmolL' : 'bloodSugarmgdL',
    );

    return {
      ...calculatedData,
      commonDate: item[0]!.commonDate,
      date: item[0]!.date,
      color: dataPointColor.color,
    };
  });

export const calculateWeightAverageValues = (data: { [key: string]: WeightApiLog[] }, massKey: keyof WeightApiLog) =>
  Object.keys(data).map((key: string) => {
    if (data[key] === undefined) {
      return;
    }

    const item = data[key]!;
    const calculatedData = medicalLogsSummaryCalculationData(item, [massKey]);

    return {
      ...calculatedData,
      date: item[0]!.commonDate,
    };
  });

export const calculateHeightAverageValues = (data: { [key: string]: HeightLog[] }) =>
  Object.keys(data).map((key: string) => {
    if (data[key] === undefined) {
      return;
    }

    const item = data[key]!;
    const calculatedData = medicalLogsSummaryCalculationData(item, ['currentTotalInches', 'currentCentimeters']);

    return {
      ...calculatedData,
      date: item[0]!.commonDate,
    };
  });
