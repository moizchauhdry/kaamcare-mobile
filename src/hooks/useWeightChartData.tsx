import { calculateWeightAverageValues, filterDataByDays, filterDataByHours } from '../utils/medicalLogs/filterData';
import { dayXAxis, medicalLogsTabsDays } from '../constants/data/medicalLogs/common';
import type { WeightLogs } from '../model/api/medicalLogs/Weight';
import {
  calculateMilisecondsFromDay,
  formatDate,
  getDateFromSeparatedModel,
  getHourFromDate,
} from '../utils/date/date';
import { getFilteredDailyChartXAxis, getLabel } from '../utils/chart/chart';
import { useUnitsData } from '../context/UnitsContext';

export const useWeightChartData = (data: WeightLogs, days: number, startDate: Date) => {
  const { mass } = useUnitsData();
  const key = mass === 'Pound' ? 'currentPounds' : 'currentKilograms';
  const properData = data.map((elem) => ({ ...elem, commonDate: getDateFromSeparatedModel(elem.date!) }));
  const subDays = medicalLogsTabsDays[days]?.subDays!;
  const calculatedData = calculateWeightAverageValues(
    subDays === 1 ? filterDataByHours(properData) : filterDataByDays(properData, subDays),
    key,
  );

  if (subDays === 1) {
    const chartData = dayXAxis.map((label) => {
      const item = calculatedData.find((log) => getHourFromDate(log!.date!) === label);
      const properValue = item?.average?.[key] || null;

      return {
        value: properValue,
        labelTextStyle: {
          fontSize: 13,
          opacity: 0.5,
        },
        hideDataPoint: !properValue,
        label,
      };
    });

    const filteredData = getFilteredDailyChartXAxis(chartData, dayXAxis);
    return { data: filteredData.data, scrollToIndex: filteredData.scrollToIndex };
  }

  const xAxisLabels = new Array(subDays)
    .fill(null)
    .map((_, index) => new Date(startDate.getTime() - calculateMilisecondsFromDay(index)))
    .reverse();

  return {
    data: xAxisLabels.map((elem, index) => {
      const item = calculatedData.find((inner) => formatDate(inner!.date!) === formatDate(elem));
      const properValue = item?.average?.[key] ?? 0;

      return {
        value: properValue || null,
        labelTextStyle: {
          width: 40,
          fontSize: 13,
          opacity: 0.5,
        },
        label: getLabel(elem, subDays, index, xAxisLabels.length - 1),
      };
    }),
  };
};
