import { Dimensions, View } from 'react-native';
import type { LineChartPropsType, lineDataItem } from 'react-native-gifted-charts';

import { Typography } from '../../../../UI/Typography/Typography';
import { LineChart } from '../../../../UI/LineChart/LineChart';
import { theme } from '../../../../../config/Theme';
import { findLastValueIndex, findMax } from '../../../../../utils/array/array';
import { useWeightChartData } from '../../../../../hooks/useWeightChartData';
import type { WeightLogs } from '../../../../../model/api/medicalLogs/Weight';
import { useUnitsData } from '../../../../../context/UnitsContext';
import { roundUpToNearest } from '../../../../../utils/number/number';

type WeightChartProps = {
  data: WeightLogs;
  days: number;
  startDate: Date;
  chartProps?: LineChartPropsType;
};

export const WeightChart = ({ data, days, startDate, chartProps }: WeightChartProps) => {
  const { mass } = useUnitsData();
  const chartData = useWeightChartData(data, days, startDate);
  const maxValue = findMax(chartData.data);

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingLeft: 12 }}>
        <Typography style={{ fontSize: 12, opacity: 0.5 }}>{mass === 'Pound' ? 'lbs' : 'kg'}</Typography>
      </View>
      <LineChart
        thickness1={4}
        daysDisplayType={days}
        color={theme.colors.summaryBlue}
        maxValue={maxValue ? roundUpToNearest(maxValue, 10) : undefined}
        formatYLabel={(label) => parseInt(label, 10).toString()}
        /* @ts-ignore */
        data={chartData.data}
        areaChart
        scrollToIndex={chartData.scrollToIndex}
        startIndex={chartData?.data.findIndex((elem) => elem.value !== null)}
        endIndex={findLastValueIndex(chartData.data as lineDataItem[])}
        startFillColor="#C6C8FF"
        endFillColor={theme.colors.white}
        startOpacity={1}
        mostNegativeValue={0}
        hideDataPoints={days === 2 || days === 3}
        endOpacity={0.1}
        dataPointsColor={theme.colors.summaryBlue}
        // adjustToWidth
        width={Dimensions.get('window').width - 64}
        {...chartProps}
      />
    </View>
  );
};
