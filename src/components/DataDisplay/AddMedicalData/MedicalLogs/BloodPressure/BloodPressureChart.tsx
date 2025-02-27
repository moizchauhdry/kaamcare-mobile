import type { ElementType } from 'react';
import { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import { theme } from '../../../../../config/Theme';
import { useUnitsData } from '../../../../../context/UnitsContext';
import { useBloodPressureChartData } from '../../../../../hooks/useBloodPressureChartData';
import type { BloodPressureLogs } from '../../../../../model/api/medicalLogs/BloodPressure';
import { findMax } from '../../../../../utils/array/array';
import { roundUpToNearest } from '../../../../../utils/number/number';
import { Typography } from '../../../../UI/Typography/Typography';

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
  const chartData: any = useBloodPressureChartData(data, type, days, startDate);
  // console.log('chartData=====', chartData);
  // console.log('type=====', type);
  // console.log('data=====', data);

  const maxValue = roundUpToNearest(findMax(chartData.data!.map((d: any) => d.value ?? 0)) ?? 0, 10);
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
    .filter((d: any) => d.value !== null) // Exclude null values
    .map((d: any) => ({
      value: d.value ?? 0,
      // barStyle: { height: d.value - d.diaValue },
      // label: d.diaValue,
      // secondaryLabel: 'hh',
      // labelsDistanceFromXaxis: 10,
      frontLabel: d.dataPointLabel,
      frontColor: d.dataPointColor || theme.colors.primary, // Default to primary theme color if not specified
      topLabelComponent: () => {
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 30,
            }}
          >
            <Typography style={{ fontSize: 12, color: theme.colors.textPrimary, fontWeight: '600' }}>
              {d.value ?? 0}
            </Typography>
          </View>
        );
      },
      labelComponent: () => {
        return (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              // height: 30,
              // backgroundColor: 'red',
              // width: 30,
            }}
          >
            {type === 'pressure' && (
              <Typography style={{ fontSize: 12, color: theme.colors.textPrimary, fontWeight: '600' }}>
                {d.diaValue ?? 0}
              </Typography>
            )}
            <Typography style={{ fontSize: 12, color: theme.colors.textPrimary, fontWeight: '600' }}>
              {d.label ?? ''}
            </Typography>
          </View>
        );
      },
      // secondaryLabelComponent: () => {
      //   return (
      //     <View>
      //       <Typography>HiH</Typography>
      //     </View>
      //   );
      // },
      onPress: isDashboard ? undefined : () => handleFocus(d),
    }));

  return (
    <View
      style={{
        flex: 1,
        gap: 8,
        backgroundColor: theme.colors.white,
        padding: 16,
        borderRadius: 8,
        shadowColor: theme.colors.shadowPrimary,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 1,
        shadowOpacity: 0.9,
        elevation: 4,
        borderColor: theme.colors.backgroundDark,
        borderWidth: 1,
        overflow: 'hidden',
      }}
    >
      <View>
        <Typography style={{ fontSize: 12, opacity: 0.5 }}>
          {type === 'pressure' ? (pressure === 'mmHg' ? 'mmHg' : 'kPa') : 'bpm'}
        </Typography>
      </View>
      <View
        style={{ flex: 1, position: 'relative', paddingTop: 30 }}
        onTouchEnd={isDashboard ? undefined : () => handleTouchEnd()}
      >
        {barData.length > 0 ? (
          <BarChart
            data={barData}
            barWidth={22}
            barBorderRadius={4}
            // barStyle={{ height: 100 }}
            spacing={40}
            adjustToWidth
            width={Dimensions.get('window').width - 140}
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
            maxValue={maxValue + 20}
          />
        ) : null}
        {isDisplay && focusedItem && Component ? (
          <View
            style={{
              position: 'absolute',
              top: isDaily ? '10%' : '15%',
              left: isDaily ? '50%' : '50%',
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
