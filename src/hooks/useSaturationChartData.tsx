import type { lineDataItem } from 'react-native-gifted-charts';

import {
  calculateAveragesSaturationValues,
  filterDataByDays,
  filterDataByHours,
} from '../utils/medicalLogs/filterData';
import {
  calculateMilisecondsFromDay,
  formatDate,
  getDateFromSeparatedModel,
  getHourFromDate,
} from '../utils/date/date';
import { getFilteredDailyChartXAxis, getLabel, isLongChart } from '../utils/chart/chart';
import { dayXAxis, medicalLogsTabsDays } from '../constants/data/medicalLogs/common';
import type { SaturationApiLog } from '../model/api/medicalLogs/Saturation';
import { SaturationChartTooltip } from '../components/DataDisplay/AddMedicalData/MedicalLogs/Saturation/SaturationTooltip';
import { theme } from '../config/Theme';

export const useSaturationChartData = (saturationLogs: SaturationApiLog[], days: number, startDate: Date) => {
  const keys: (keyof SaturationApiLog)[] = ['spO2Value'];
  const properData = saturationLogs.map((elem) => ({ ...elem, commonDate: getDateFromSeparatedModel(elem.date) }));
  const subDays = medicalLogsTabsDays[days]?.subDays!;
  const properCalculatedData = calculateAveragesSaturationValues(
    subDays === 1 ? filterDataByHours(properData) : filterDataByDays(properData, subDays),
  );
  const isChart30or90 = isLongChart(days);

  if (subDays === 1) {
    const data = keys.map((key) =>
      dayXAxis.map((label) => {
        const item = properCalculatedData.find((elem) => getHourFromDate(elem!.date!) === label);
        const properValue = item?.average?.[key] ?? null;

        return {
          value: properValue!,
          label,
          dataPointColor: item?.color,
          hideDataPoint: properValue === 0,
          focusedDataPointColor: item?.color,
          displayComponent: () => (
            <SaturationChartTooltip
              maxSat={item?.max?.spO2Value}
              minSat={item?.min?.spO2Value}
              averageSat={item?.average?.spO2Value}
              date={item?.date!}
              variant="single"
              color={item?.color}
            />
          ),
        };
      }),
    );

    const filteredData = getFilteredDailyChartXAxis(data[0]!, dayXAxis);

    return {
      data: filteredData.data as lineDataItem[],
      // lineSegments: getLineSegmentsData(data[0]!),
      scrollToIndex: filteredData.scrollToIndex,
    };
  }

  const xAxisLabels = new Array(subDays)
    .fill(null)
    .map((_, index) => new Date(startDate.getTime() - calculateMilisecondsFromDay(index)))
    .reverse();

  const getSaturationChartData = (key: keyof SaturationApiLog): lineDataItem[] =>
    xAxisLabels.map((elem, index) => {
      const item = properCalculatedData.find((inner) => formatDate(inner!.date!) === formatDate(elem));
      const properValue = item?.average?.[key] ?? null;

      return {
        value: properValue!,
        label: getLabel(elem, subDays, index, xAxisLabels.length - 1),
        hideDataPoint: properValue === 0,
        dataPointColor: isChart30or90 ? theme.colors.summaryBlue : item?.color,
        labelTextStyle: {
          width: 40,
          fontSize: 13,
          opacity: 0.5,
        },
        focusedDataPointColor: item?.color,
        displayComponent: () => (
          <SaturationChartTooltip
            maxSat={item?.max?.spO2Value}
            minSat={item?.min?.spO2Value}
            averageSat={item?.average?.spO2Value}
            date={item?.date!}
            variant="multiple"
            color={item?.color}
          />
        ),
      };
    });

  const calculatedData = getSaturationChartData('spO2Value');

  return {
    data: calculatedData,
    // lineSegments: getLineSegmentsData(calculatedData),
  };
};
