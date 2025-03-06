import type { ElementType } from 'react';
import { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

import { LineChart } from 'components/UI/LineChart/LineChart';
import moment from 'moment';
import { theme } from '../../../../../config/Theme';
import { useUnitsData } from '../../../../../context/UnitsContext';
import { useBloodPressureChartData } from '../../../../../hooks/useBloodPressureChartData';
import type { BloodPressureLogs } from '../../../../../model/api/medicalLogs/BloodPressure';
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
  // const maxValue = roundUpToNearest(findMax(chartData.data!.map((d: any) => d.value ?? 0)) ?? 0, 10);
  const maxValue = Math.max(...chartData.data.map((d: any) => d.value ?? 0)) + 5;

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
    .map((d: any) => {
      const barHeight = (((d.value ?? 0) - (d.diaValue ?? 0)) / maxValue) * 100;
      const startHeight = ((d.diaValue ?? 0) / maxValue) * 100;

      return {
        value: d.value ?? 0,
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
                {d.label ?? moment(d.date).format('MM.DD')}
              </Typography>
            </View>
          );
        },
        onPress: isDashboard ? undefined : () => handleFocus(d),
        barStyle: {
          height: `${barHeight}%`,
          minHeight: 20,
          // marginTop: `${startHeight}%`,
        },
        heightOffset: d.diaValue ?? 0,
        // yAxisLabels: 'H',
      };
    });

  return (
    <View
      style={{
        flex: 1,
        gap: 8,
        backgroundColor: theme.colors.white,
        padding: 16,

        overflow: 'hidden',
      }}
    >
      <View>
        <Typography style={{ fontSize: 12, opacity: 0.5 }}>
          {type === 'pressure' ? (pressure === 'mmHg' ? 'mmHg' : 'kPa') : 'bpm'}
        </Typography>
      </View>
      <View
        style={{ flex: 1, position: 'relative', paddingVertical: 15 }}
        onTouchEnd={isDashboard ? undefined : () => handleTouchEnd()}
      >
        {type === 'pressure' ? (
          barData.length > 0 ? (
            <BarChart
              data={barData}
              barWidth={22}
              barBorderRadius={4}
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
              // maxValue={maxValue + 20}
            />
          ) : null
        ) : barData.length > 0 ? (
          <LineChart
            daysDisplayType={days}
            thickness1={4}
            maxValue={maxValue + 10}
            color={theme.colors.primary}
            /* @ts-ignore */
            data={barData}
            areaChart
            scrollToIndex={chartData.scrollToIndex}
            startIndex={barData?.findIndex((elem) => elem.value !== null)}
            // endIndex={findLastValueIndex(chartData.data as lineDataItem[])}
            startFillColor="#C6C8FF"
            endFillColor={theme.colors.white}
            startOpacity={1}
            hideDataPoints={days === 2 || days === 3}
            endOpacity={0.1}
            mostNegativeValue={0}
            showDataPointLabelOnFocus
            dataPointsColor={theme.colors.primary}
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
