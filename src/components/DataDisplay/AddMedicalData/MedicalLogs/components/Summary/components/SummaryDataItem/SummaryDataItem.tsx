import { View } from 'react-native';

import { Typography } from '../../../../../../../UI/Typography/Typography';
import { styles, colors } from './SummaryDataItem.styles';

export type SummaryDataItemColorType = 'purple' | 'blue' | 'lightBlue' | 'green' | 'pink';

type SummaryDataItemProps = {
  data: number | number[];
  type: 'min-max' | 'average' | 'total' | 'single';
  color?: SummaryDataItemColorType;
};

const typeTexts = {
  'min-max': 'Min - Max',
  average: 'Average',
  total: 'Total',
};

export const SummaryDataItem = ({ data, color = 'blue', type }: SummaryDataItemProps) => {
  const renderData = () => {
    if (type === 'min-max' && Array.isArray(data)) {
      return `${data[0]} - ${data[1]}`;
    }

    return data;
  };

  return (
    <View style={[styles.container, colors[color]]}>
      <Typography size="sm" weight="semiBold">
        {renderData()}
      </Typography>
      {type !== 'single' ? (
        <Typography color="gray" size="sm">
          {typeTexts[type]}
        </Typography>
      ) : null}
    </View>
  );
};
