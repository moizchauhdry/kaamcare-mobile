import { Dimensions, View } from 'react-native';
import type { LineChartPropsType } from 'react-native-gifted-charts';
import { BarChart } from 'react-native-gifted-charts';
import type { ElementType } from 'react';
import { useState } from 'react';

import { LineChart } from '../../../../UI/LineChart/LineChart';
import { findFirstValueIndex, findLastValueIndex, findMax } from '../../../../../utils/array/array';
import { theme } from '../../../../../config/Theme';
import { useBloodSugarChartData } from '../../../../../hooks/useBloodSugarChartData';
import type { BloodSugarLogs } from '../../../../../model/api/medicalLogs/BloodSugar';
import { Typography } from '../../../../UI/Typography/Typography';
import { useUnitsData } from '../../../../../context/UnitsContext';
import { roundUpToNearest } from '../../../../../utils/number/number';
import { interpolateLinear } from '../../../../../utils/chart/chart';

type BloodSugarChartProps = {
  data: BloodSugarLogs;
  type: string;
  days: number;
  startDate: Date;
  chartProps?: LineChartPropsType;
  isHomeScreen?: boolean;
  isDashboard?: boolean;
};

export const BloodSugarChart = ({ data, type, days, chartProps, isDashboard }: BloodSugarChartProps) => {
  const [focusedItem, setFocusedItem] = useState<null | { displayComponent?: ElementType }>(null);
  const [isDisplay, setIsDisplay] = useState(false);
  const chartData = useBloodSugarChartData(data, type, days === 0);
  const { sugar } = useUnitsData();
  const sugarUnit = sugar === 'mmolL' ? 'mmol/L' : 'mg/dL';
  const Component = focusedItem?.displayComponent || null;
  const lineConfigLastIndex = findLastValueIndex(chartData.data);
  const lineConfigFirstIndex = chartData.data?.findIndex((elem) => Boolean(elem.value));
  const maxValue = findMax(chartData.data ?? []);
  const secondaryMax = findMax(chartData.secondaryData ?? []);
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

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <View>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingLeft: 12 }}>
          <Typography style={{ fontSize: 12, opacity: 0.5 }}>{type === 'sugar' ? sugarUnit : 'u'}</Typography>
          <Typography style={{ fontSize: 12, opacity: 0.5 }}>{type === 'sugar' ? 'g' : sugarUnit}</Typography>
        </View>
        <View style={{ flex: 1, position: 'relative' }} onTouchEnd={isDashboard ? undefined : () => handleTouchEnd()}>
          {type === 'sugar' ? (
            <LineChart
              data={chartData.data!}
              onFocus={isDashboard ? undefined : (item: { displayComponent?: ElementType }) => handleFocus(item)}
              secondaryData={chartData.secondaryData}
              secondaryLineConfig={{
                color: theme.colors.summaryBlueLight,
                startIndex: findFirstValueIndex(chartData.secondaryData),
                endIndex: findLastValueIndex(chartData.secondaryData),
                zIndex: 1,
              }}
              startIndex={lineConfigFirstIndex}
              endIndex={lineConfigLastIndex}
              lineSegments={chartData.lineSegments}
              secondaryYAxis={{
                maxValue: (secondaryMax ?? 180) + 20,
                mostNegativeValue: 0,
                noOfSections: 5,
                formatYLabel: (label) => parseInt(label, 10).toString(),
              }}
              onlyPositive
              maxValue={maxValue ? roundUpToNearest(maxValue, 10) : undefined}
              zIndex1={100}
              showStripOnFocus={days === 0 || days === 1}
              stripWidth={1}
              stripColor={theme.colors.textPrimary}
              stripOpacity={0.5}
              stripStrokeDashArray={[2]}
              spacing={50}
              adjustToWidth
              width={Dimensions.get('window').width - 90}
              focusEnabled
              {...chartProps}
            />
          ) : (
            <BarChart
              onPress={isDashboard ? undefined : (item: { displayComponent?: ElementType }) => handleFocus(item)}
              lineBehindBars
              secondaryYAxis={{
                noOfSections: 5,
                formatYLabel: chartData.data ? (value) => parseInt(value, 10).toString() : undefined,
              }}
              formatYLabel={(label) => parseInt(label, 10).toString()}
              lineData={interpolateLinear(chartData.data)}
              showLine={data.length > 0}
              lineConfig={{
                color: 'rgba(79, 86, 253, 0.2)',
                thickness: 2,
                hideDataPoints: true,
                startIndex: lineConfigFirstIndex === -1 ? 0 : lineConfigFirstIndex,
                endIndex: lineConfigLastIndex === -1 ? 0 : lineConfigLastIndex,
                isSecondary: true,
              }}
              noOfSections={5}
              stackData={chartData.stackedData}
              barBorderRadius={10}
              barWidth={6}
              spacing={65}
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
              initialSpacing={0}
              endSpacing={0}
              xAxisLabelTextStyle={{
                fontSize: 13,
                lineHeight: 18,
                color: theme.colors.textPrimary,
                opacity: 0.5,
              }}
              {...chartProps}
            />
          )}
          {isDisplay && focusedItem && Component ? (
            <View
              style={{
                position: 'absolute',
                top: '30%',
                left: 0,
                right: 0,
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{ translateY: -50 }],
              }}
            >
              <Component />
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};
