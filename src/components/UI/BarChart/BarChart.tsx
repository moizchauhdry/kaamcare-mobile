import { Dimensions } from 'react-native';
import { BarChart as RNBarChart } from 'react-native-gifted-charts';

import { theme } from '../../../config/Theme';

type BarChartProps = {
  daysDisplayType?: number;
  isLongChart?: boolean;
  data: { value: number; label: string }[];
  stackData?: { stacks: { value: number; color?: string }[]; label: string }[];
  showLine?: boolean;
  lineData?: { value: number; label: string }[];
};

export const BarChart = ({
  daysDisplayType,
  isLongChart,
  data,
  stackData,
  showLine = false,
  lineData,
  ...props
}: BarChartProps) => {
  const getSpacing = () => {
    const width = Dimensions.get('window').width - 100;
    switch (daysDisplayType) {
      case 1:
        return width / 7;
      case 2:
        return width / 31;
      case 3:
        return width / 95;
      default:
        return 50;
    }
  };

  return (
    <RNBarChart
      data={data}
      stackData={stackData} // Support for stacked bars
      barWidth={isLongChart ? 6 : 10}
      barBorderRadius={8}
      spacing={props.spacing ?? getSpacing()}
      lineBehindBars={showLine}
      lineData={showLine ? lineData : undefined}
      lineConfig={{
        color: 'rgba(79, 86, 253, 0.2)',
        thickness: 2,
        hideDataPoints: true,
        isSecondary: true,
      }}
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
      noOfSections={5}
      yAxisThickness={0}
      xAxisThickness={0}
      width={Dimensions.get('window').width - 96}
      adjustToWidth
      initialSpacing={0}
      endSpacing={0}
      formatYLabel={(label) => parseInt(label, 10).toString()}
      {...props}
    />
  );
};
