import { View } from 'react-native';
import type { LineChartPropsType } from 'react-native-gifted-charts';
import type { ElementType } from 'react';
import { useState } from 'react';

import { useSaturationChartData } from '../../../../../hooks/useSaturationChartData';
import { LineChart } from '../../../../UI/LineChart/LineChart';
import { theme } from '../../../../../config/Theme';
import type { SaturationApiLog } from '../../../../../model/api/medicalLogs/Saturation';
import { Typography } from '../../../../UI/Typography/Typography';
import { findFirstValueIndex, findLastValueIndex } from '../../../../../utils/array/array';

type SaturationChartProps = {
  data: SaturationApiLog[];
  days: number;
  startDate: Date;
  chartProps?: LineChartPropsType;
  isDashboard?: boolean;
};

export const SaturationChart = ({ data, days, startDate, chartProps, isDashboard }: SaturationChartProps) => {
  const [focusedItem, setFocusedItem] = useState<null | { displayComponent?: ElementType }>(null);
  const [isDisplay, setIsDisplay] = useState(false);
  const chartData = useSaturationChartData(data, days, startDate);
  const Component = focusedItem?.displayComponent || null;
  const isLongChart = days === 2 || days === 3;
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
    <View style={{ flex: 1, position: 'relative' }}>
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingLeft: 12 }}>
        <Typography style={{ fontSize: 12, opacity: 0.5 }}>%</Typography>
      </View>
      <View style={{ flex: 1, position: 'relative' }} onTouchEnd={isDashboard ? undefined : () => handleTouchEnd()}>
        <LineChart
          {...chartData}
          isLongChart={isLongChart}
          maxValue={100}
          startIndex={startIndex}
          endIndex={endIndex}
          onFocus={isDashboard ? undefined : (item: { displayComponent?: ElementType }) => handleFocus(item)}
          daysDisplayType={days}
          zIndex1={100}
          showStripOnFocus={isDashboard ? false : days === 0 || days === 1}
          stripWidth={isDashboard ? 0 : 1}
          stripColor={theme.colors.textPrimary}
          stripOpacity={0.5}
          stripStrokeDashArray={[2]}
          showDataPointLabelOnFocus
          mostNegativeValue={0}
          {...chartProps}
        />
        {isDisplay && focusedItem && Component ? (
          <View
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
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
