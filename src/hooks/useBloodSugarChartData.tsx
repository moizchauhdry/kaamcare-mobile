import type { lineDataItem, stackDataItem } from 'react-native-gifted-charts';

import { calculateAveragesBloodSugarValues, filterDataByHours } from '../utils/medicalLogs/filterData';
import { getDateFromSeparatedModel, getHourFromDate } from '../utils/date/date';
import type { BloodSugarLogs } from '../model/api/medicalLogs/BloodSugar';
import { getFilteredDailyChartXAxis, getLineSegmentsData } from '../utils/chart/chart';
import { insulinColors } from '../constants/data/medicalLogs/bloodSugar';
import { theme } from '../config/Theme';
import type { InsulinStats } from '../utils/medicalLogs/bloodSugar';
import { BloodSugarChartTooltip } from '../components/DataDisplay/AddMedicalData/MedicalLogs/BloodSugar/BloodSugarChartTooltip';
import { useUnitsData } from '../context/UnitsContext';
import { InsulinChartTooltip } from '../components/DataDisplay/AddMedicalData/MedicalLogs/BloodSugar/InsulinChartTooltip';
import { dayXAxis } from '../constants/data/medicalLogs/common';

export const useBloodSugarChartData = (data: BloodSugarLogs, type: string, isSingleDay?: boolean) => {
  const { sugar } = useUnitsData();
  const keys: ('bloodSugarStats' | 'carbsStats' | 'insulinStats')[] =
    type === 'sugar' ? ['bloodSugarStats', 'carbsStats'] : ['bloodSugarStats', 'insulinStats'];
  const properData = data.map((elem) => ({ ...elem, commonDate: getDateFromSeparatedModel(elem.date) }));
  const properCalculatedData = calculateAveragesBloodSugarValues(filterDataByHours(properData), sugar);

  const getInsulinChartData = (): stackDataItem[] =>
    dayXAxis.map((elem) => {
      const item = properCalculatedData.find((inner) => getHourFromDate(inner!.commonDate!) === elem);

      const stacks = item?.insulinStats
        ? Object.keys(item?.insulinStats!).map((insulin) => ({
            value: item?.insulinStats[insulin as keyof InsulinStats]!.average,
            color: insulinColors[`${insulin}Acting`.toLowerCase()],
            marginBottom: 1,
          }))
        : [{ value: 0 }, { value: 0 }, { value: 0 }];

      return {
        stacks,
        label: elem,
        labelTextStyle: {
          fontSize: 13,
          opacity: 0.5,
        },
        focusedDataPointColor: item?.color,
        displayComponent: () => (
          <InsulinChartTooltip
            date={item?.commonDate!}
            intermediate={item?.insulinStats.intermediate.average}
            rapid={item?.insulinStats.rapid.average}
            long={item?.insulinStats.long.average}
          />
        ),
      };
    });

  const getBloodSugarChartData = (key: 'bloodSugarStats' | 'carbsStats' | 'insulinStats'): lineDataItem[] => {
    if (key === 'insulinStats') {
      return [];
    }

    return dayXAxis.map((elem) => {
      const item = properCalculatedData.find((inner) => getHourFromDate(inner!.commonDate!) === elem);
      const properValue = item?.[key].average ?? null;

      return {
        value: properValue!,
        label: elem,
        hideDataPoint: properValue === 0 || type === 'insulin',
        dataPointColor: key === 'bloodSugarStats' ? item?.color : theme.colors.summaryBlueLight,
        labelTextStyle: {
          fontSize: 13,
          opacity: 0.5,
        },
        focusedDataPointColor: key === 'bloodSugarStats' ? item?.color : theme.colors.summaryBlueLight,
        displayComponent:
          key === 'bloodSugarStats'
            ? () => (
                <BloodSugarChartTooltip
                  isSingleDay={isSingleDay}
                  date={item?.commonDate!}
                  minBloodSugar={item?.bloodSugarStats?.min}
                  maxBloodSugar={item?.bloodSugarStats?.max}
                  color={item?.color}
                  minCarbs={item?.carbsStats.min}
                  maxCarbs={item?.carbsStats.max}
                  averageBloodSugar={item?.bloodSugarStats?.average}
                  averageCarbs={item?.carbsStats?.average}
                />
              )
            : undefined,
      };
    });
  };

  const chartData = keys.map((key) => {
    const calculatedData = getBloodSugarChartData(key);
    return {
      data: calculatedData,
      stackData: key === 'insulinStats' ? getInsulinChartData() : [],
      lineSegment: calculatedData ? getLineSegmentsData(calculatedData) : undefined,
    };
  });
  const filteredData = getFilteredDailyChartXAxis(chartData[0]?.data!, dayXAxis);
  const isSecondaryDataFilled = chartData[1]?.data.some((elem) => Boolean(elem.value));

  return {
    data: filteredData.data as lineDataItem[],
    stackedData: chartData[1]?.stackData.slice(
      filteredData.startIndex,
      filteredData.startIndex ? filteredData.startIndex + filteredData.data.length : filteredData.data.length,
    ),
    secondaryData: isSecondaryDataFilled
      ? chartData[1]?.data!.slice(
          filteredData.startIndex,
          filteredData.startIndex ? filteredData.startIndex + filteredData.data.length : filteredData.data.length,
        )
      : [],
    lineSegments: chartData[0]?.lineSegment,
    lineSegments2: chartData[1]?.lineSegment,
  };
};
