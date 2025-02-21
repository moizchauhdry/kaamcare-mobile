import type { lineDataItem } from 'react-native-gifted-charts';

import {
  calculateAveragesBloodPressureValues,
  filterDataByDays,
  filterDataByHours,
} from '../utils/medicalLogs/filterData';
import {
  calculateMilisecondsFromDay,
  formatDate,
  getDateFromSeparatedModel,
  getHourFromDate,
} from '../utils/date/date';
import type { BloodPressureLog, BloodPressureLogs } from '../model/api/medicalLogs/BloodPressure';
import { getFilteredDailyChartXAxis, getLabel, getLineSegmentsData } from '../utils/chart/chart';
import { BloodPressureChartTooltip } from '../components/DataDisplay/AddMedicalData/MedicalLogs/BloodPressure/BloodPressureChartTooltip';
import { dayXAxis, medicalLogsTabsDays } from '../constants/data/medicalLogs/common';
import { useUnitsData } from '../context/UnitsContext';
import { Typography } from '../components/UI/Typography/Typography';
import { theme } from '../config/Theme';
import { determineBloodPressureStage } from 'utils/medicalLogs/summary';
import { graphStages } from 'constants/data/medicalLogs/bloodPressure';

export const useBloodPressureChartData = (
  bloodPressureLogs: BloodPressureLogs,
  type: string,
  days: number,
  startDate: Date,
) => {
  const { pressure } = useUnitsData();
  const isLongChart = days === 2 || days === 3;
  // console.log('bloodPressureLogs=====', bloodPressureLogs);

  const properData = bloodPressureLogs.map((elem) => ({
    ...elem,
    commonDate: elem.date ? getDateFromSeparatedModel(elem.date) : undefined,
  }));
  const pressureKeys: (keyof BloodPressureLog)[] =
    pressure === 'mmHg'
      ? ['millimetersOfMercurySystolic', 'millimetersOfMercuryDiastolic']
      : ['kilopascalsSystolic', 'kilopascalsDiastolic'];
  const keys: (keyof BloodPressureLog)[] = type === 'pressure' ? pressureKeys : ['pulse'];
  const systolicKey = pressureKeys[0] ?? 'millimetersOfMercurySystolic';
  const diastolicKey = pressureKeys[1] ?? 'millimetersOfMercuryDiastolic';
  const subDays = medicalLogsTabsDays[days]?.subDays!;
  const properCalculatedData = calculateAveragesBloodPressureValues(
    subDays === 1 ? filterDataByHours(properData) : filterDataByDays(properData, subDays),
  );

  if (subDays === 1) {
    const data = keys.map((key, index) => {
      const chartType = key === 'pulse' ? 'pulse' : 'pressure';

      return dayXAxis.map((elem) => {
        const item = properCalculatedData.find((inner) => getHourFromDate(inner!.date!) === elem);
        const properValue = item?.average?.[key] ?? null;
        const dataPointColor = chartType === 'pulse' ? item?.pulseColor : item?.color;

        return {
          value: properValue!,
          label: elem,
          dataPointColor,
          hideDataPoint: properValue === 0,
          focusedDataPointColor: isLongChart
            ? index === 0
              ? theme.colors.summaryBlue
              : theme.colors.summaryBlueLight
            : dataPointColor,
          displayComponent:
            key === systolicKey || key === 'pulse'
              ? () => (
                  <BloodPressureChartTooltip
                    date={item?.date!}
                    minSys={item?.min?.[systolicKey]}
                    minDias={item?.min?.[diastolicKey]}
                    color={dataPointColor}
                    pulse={item?.average?.pulse}
                    type={chartType}
                    variant="single"
                  />
                )
              : undefined,
          date: item?.date,
        };
      });
    });

    const filteredData = getFilteredDailyChartXAxis(data[0]!, dayXAxis);

    return {
      data: filteredData.data as lineDataItem[],
      data2: getFilteredDailyChartXAxis(data[1]!, dayXAxis).data as lineDataItem[],
      startIndex: filteredData.startIndex,
      scrollToIndex: filteredData.scrollToIndex,
      // lineSegments: getLineSegmentsData(data[0]!),
      // lineSegments2: data[1] ? getLineSegmentsData(data[1]!) : undefined,
    };
  }

  const xAxisLabels = new Array(subDays)
    .fill(null)
    .map((_, index) => new Date(startDate.getTime() - calculateMilisecondsFromDay(index)))
    .reverse();

  const getBloodPressureChartData = (
    key: keyof BloodPressureLog,
    displayTooltip?: boolean,
    higherIndex?: number,
  ): lineDataItem[] =>
    xAxisLabels.map((elem, index) => {
      const item: any = properCalculatedData.find((inner) => formatDate(inner!.date!) === formatDate(elem));
      console.log('typ of====', typeof item?.total.millimetersOfMercurySystolic);

      const calculateData = determineBloodPressureStage(
        {
          millimetersOfMercurySystolic: item?.total.millimetersOfMercurySystolic,
          millimetersOfMercuryDiastolic: item?.total.millimetersOfMercuryDiastolic,
          pulse: item?.total.pulse,
        },
        graphStages,
      );
      // console.log('calculateData=====', calculateData);

      const properValue = item?.average?.[key] ?? null;
      const chartType = key === 'pulse' ? 'pulse' : 'pressure';
      const dataPointColor = calculateData.color;
      // chartType === 'pulse' ? item?.pulseColor : item?.color;
      const label = getLabel(elem, subDays, index, xAxisLabels.length - 1);

      return {
        value: properValue!,
        hideDataPoint: properValue === 0,
        dataPointLabel: calculateData.label,
        dataPointColor: isLongChart
          ? higherIndex === 0
            ? theme.colors.summaryBlue
            : theme.colors.summaryBlueLight
          : dataPointColor,
        labelComponent: () =>
          label ? <Typography style={{ fontSize: 13, opacity: 0.5, width: 40 }}>{label}</Typography> : null,
        displayComponent: displayTooltip
          ? () => (
              <BloodPressureChartTooltip
                date={item?.date!}
                minSys={item?.min?.[systolicKey]}
                maxSys={item?.max?.[systolicKey]}
                minDias={item?.min?.[diastolicKey]}
                maxDias={item?.max?.[diastolicKey]}
                averageSys={item?.average?.[systolicKey]}
                averageDias={item?.average?.[diastolicKey]}
                color={dataPointColor}
                pulse={item?.average?.pulse}
                type={chartType}
              />
            )
          : undefined,
        focusedDataPointColor: dataPointColor,
        date: item?.date,
      };
    });

  const data = keys.map((key, index) => {
    const calculatedData = getBloodPressureChartData(key, subDays === 7, index);
    return {
      chartData: calculatedData,
      lineSegment: getLineSegmentsData(calculatedData),
    };
  });

  return {
    data: data[0]?.chartData,
    data2: data[1]?.chartData,
    // lineSegments: data[0]?.lineSegment,
    // lineSegments2: data[1]?.lineSegment,
  };
};
