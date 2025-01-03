import { View } from 'react-native';
import type { LineChartPropsType, lineDataItem } from 'react-native-gifted-charts';

import { Typography } from '../../../../UI/Typography/Typography';
import { LineChart } from '../../../../UI/LineChart/LineChart';
import { convertInchesToFeetAndInches } from '../../../../../utils/medicalLogs/height';
import { theme } from '../../../../../config/Theme';
import { findLastValueIndex, findMax } from '../../../../../utils/array/array';
import { useHeightChartData } from '../../../../../hooks/useHeightChartData';
import type { HeightLogs } from '../../../../../model/api/medicalLogs/Height';
import { useUnitsData } from '../../../../../context/UnitsContext';
import { roundUpToNearest } from '../../../../../utils/number/number';

type HeightChartProps = {
  data: HeightLogs;
  days: number;
  startDate: Date;
  chartProps?: LineChartPropsType;
};

export const HeightChart = ({ data, days, startDate, chartProps }: HeightChartProps) => {
  const { length } = useUnitsData();
  const chartData = useHeightChartData(data, days, startDate);
  const maxValue = findMax(chartData.data);

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingLeft: 12 }}>
        <Typography style={{ fontSize: 12, opacity: 0.5 }}>{length === 'FeetInch' ? 'Ft' : 'cm'}</Typography>
      </View>
      {chartData ? (
        <LineChart
          daysDisplayType={days}
          formatYLabel={
            length === 'FeetInch'
              ? (label) => convertInchesToFeetAndInches(label)
              : (label) => parseInt(label, 10).toString()
          }
          thickness1={4}
          maxValue={maxValue ? roundUpToNearest(maxValue, 10) : undefined}
          color={theme.colors.summaryBlue}
          /* @ts-ignore */
          data={chartData.data}
          animation
          areaChart
          scrollToIndex={chartData.scrollToIndex}
          startIndex={chartData.data?.findIndex((elem) => elem.value !== null)}
          endIndex={findLastValueIndex(chartData.data as lineDataItem[])}
          startFillColor="#C6C8FF"
          endFillColor={theme.colors.white}
          startOpacity={1}
          hideDataPoints={days === 2 || days === 3}
          endOpacity={0.1}
          mostNegativeValue={0}
          showDataPointLabelOnFocus
          dataPointsColor={theme.colors.summaryBlue}
          // width={Dimensions.get('window').width - 96}
          {...chartProps}
        />
      ) : null}
    </View>
  );
};
