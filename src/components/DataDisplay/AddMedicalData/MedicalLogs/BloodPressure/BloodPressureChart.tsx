import type { LineChartPropsType } from 'react-native-gifted-charts';
import { Dimensions, View } from 'react-native';
import type { ElementType } from 'react';
import { useState } from 'react';

import { useBloodPressureChartData } from '../../../../../hooks/useBloodPressureChartData';
import type { BloodPressureLogs } from '../../../../../model/api/medicalLogs/BloodPressure';
import { LineChart } from '../../../../UI/LineChart/LineChart';
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
  chartProps?: LineChartPropsType;
  isDashboard?: boolean;
};

export const BloodPressureChart = ({
  data,
  type,
  days,
  startDate,
  chartProps,
  isDashboard,
}: BloodPressureChartProps) => {
  const [focusedItem, setFocusedItem] = useState<null | { displayComponent?: ElementType }>(null);
  const [isDisplay, setIsDisplay] = useState(false);
  const { pressure } = useUnitsData();
  const chartData = useBloodPressureChartData(data, type, days, startDate);
  const maxValue1 = roundUpToNearest(findMax(chartData.data!) ?? 0, 10);
  const maxValue2 = roundUpToNearest(findMax(chartData.data2 ?? []) ?? 0, 10);
  const properMaxValue = maxValue2 > maxValue1 ? maxValue2 : maxValue1;
  const Component = focusedItem?.displayComponent || null;
  const isLongChart = days === 2 || days === 3;
  const isDaily = days === 0;
  const startIndex = findFirstValueIndex(chartData.data);
  const endIndex = findLastValueIndex(chartData.data);

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
    <View style={{ flex: 1, gap: 8 }}>
      <View>
        <View>
          <Typography style={{ fontSize: 12, opacity: 0.5 }}>
            {type === 'pressure' ? (pressure === 'mmHg' ? 'mmHg' : 'kPa') : 'bpm'}
          </Typography>
        </View>
        <View style={{ flex: 1, position: 'relative' }} onTouchEnd={isDashboard ? undefined : () => handleTouchEnd()}>
          {chartData.data ? (
            <LineChart
              {...chartData}
              formatYLabel={(label) => parseInt(label, 10).toString()}
              onFocus={isDashboard ? undefined : (item: { displayComponent?: ElementType }) => handleFocus(item)}
              daysDisplayType={days}
              zIndex1={100}
              startIndex={startIndex}
              endIndex={endIndex}
              startIndex2={startIndex}
              endIndex2={endIndex}
              scrollToIndex={chartData.scrollToIndex}
              showStripOnFocus={isDashboard ? false : days === 0 || days === 1}
              stripWidth={isDashboard ? 0 : 1}
              stripColor={theme.colors.textPrimary}
              stripOpacity={0.5}
              stripStrokeDashArray={[2]}
              isLongChart={isLongChart}
              mostNegativeValue={0}
              onlyPositive
              focusEnabled={!isLongChart}
              width={Dimensions.get('window').width - 96}
              // hideDataPoints={days === 2 || days === 3}
              maxValue={properMaxValue || (type === 'pressure' ? (pressure === 'mmHg' ? 200 : 27) : undefined)}
              {...chartProps}
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
    </View>
  );
};
