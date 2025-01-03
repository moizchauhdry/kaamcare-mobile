import type { LineChartPropsType } from 'react-native-gifted-charts';
import { LineChart as RNLineChart } from 'react-native-gifted-charts';
import { Dimensions } from 'react-native';

import { theme } from '../../../config/Theme';

type LineChartProps = LineChartPropsType & {
  daysDisplayType?: number;
  isLongChart?: boolean;
};

export const LineChart = ({ daysDisplayType, isLongChart, ...props }: LineChartProps) => {
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
    <RNLineChart
      thickness={2}
      thickness1={2}
      thickness2={2}
      focusEnabled
      color1={theme.colors.summaryBlue}
      color2={theme.colors.summaryBlueLight}
      width={Dimensions.get('window').width}
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
      dataPointsWidth={isLongChart ? 2 : 10}
      dataPointsHeight={isLongChart ? 2 : 10}
      dataPointsRadius={isLongChart ? 2 : 6}
      dataPointsColor={isLongChart ? theme.colors.summaryBlue : undefined}
      dataPointsColor2={isLongChart ? theme.colors.summaryBlueLight : undefined}
      spacing={props.spacing ?? getSpacing()}
      formatYLabel={(label) => parseInt(label, 10).toString()}
      {...props}
    />
  );
};
