import { BarChart } from 'react-native-gifted-charts';
import { Dimensions, View } from 'react-native';
import type { ElementType } from 'react';
import { useState } from 'react';

import { useBloodPressureChartData } from '../../../../../hooks/useBloodPressureChartData';
import type { BloodPressureLogs } from '../../../../../model/api/medicalLogs/BloodPressure';
import { theme } from '../../../../../config/Theme';
import { Typography } from '../../../../UI/Typography/Typography';
import { useUnitsData } from '../../../../../context/UnitsContext';
import { findFirstValueIndex, findLastValueIndex, findMax } from '../../../../../utils/array/array';
import { roundUpToNearest } from '../../../../../utils/number/number';

type BloodPressureChartProps = {
  data: BloodPressureLogs;
  type: string;
  days: number;
  startDate: Date;
  isDashboard?: boolean;
};

export const BloodPressureChart = ({ data, type, days, startDate, isDashboard }: BloodPressureChartProps) => {
  const [focusedItem, setFocusedItem] = useState<null | { displayComponent?: ElementType }>(null);
  const [isDisplay, setIsDisplay] = useState(false);
  const { pressure } = useUnitsData();
  const chartData = useBloodPressureChartData(data, type, days, startDate);

  const maxValue = roundUpToNearest(findMax(chartData.data!.map((d) => d.value ?? 0)) ?? 0, 10);
  const Component = focusedItem?.displayComponent || null;
  const isDaily = days === 0;

  const handleFocus = (item: { displayComponent?: ElementType }) => {
    if (item.displayComponent) {
      setFocusedItem(item);
      setIsDisplay(true);
    }
  };

  const handleTouchEnd = () => {
    if (isDisplay) {
      setIsDisplay(false);
      setFocusedItem(null);
    }
  };

  // Convert chartData.data into the format needed for BarChart

  const barData = chartData.data
    .filter((d) => d.value !== null) // Exclude null values
    .map((d) => ({
      value: d.value ?? 0,
      label: d.label,
      frontColor: d.dataPointColor || theme.colors.primary, // Default to primary theme color if not specified
      onPress: isDashboard ? undefined : () => handleFocus(d),
    }));
  console.log('chartData=====', chartData);

  return (
    <View style={{ flex: 1, gap: 8 }}>
      <View>
        <Typography style={{ fontSize: 12, opacity: 0.5 }}>
          {type === 'pressure' ? (pressure === 'mmHg' ? 'mmHg' : 'kPa') : 'bpm'}
        </Typography>
      </View>
      <View style={{ flex: 1, position: 'relative' }} onTouchEnd={isDashboard ? undefined : () => handleTouchEnd()}>
        {barData.length > 0 ? (
          <BarChart
            data={barData}
            barWidth={15}
            barBorderRadius={8}
            spacing={40}
            adjustToWidth
            width={Dimensions.get('window').width - 96}
            yAxisThickness={0}
            xAxisThickness={0}
            yAxisTextStyle={{
              fontSize: 13,
              lineHeight: 18,
              color: theme.colors.textPrimary,
              opacity: 0.5,
            }}
            xAxisLabelTextStyle={{
              fontSize: 13,
              lineHeight: 18,
              color: theme.colors.textPrimary,
              opacity: 0.5,
            }}
            maxValue={maxValue}
          />
        ) : null}
        {isDisplay && focusedItem && Component ? (
          <View
            style={{
              position: 'absolute',
              top: isDaily ? '50%' : '35%',
              left: isDaily ? '50%' : '35%',
              transform: [{ translateX: -50 }, { translateY: -50 }],
            }}
          >
            <Component />
          </View>
        ) : null}
      </View>
    </View>
  );
};
