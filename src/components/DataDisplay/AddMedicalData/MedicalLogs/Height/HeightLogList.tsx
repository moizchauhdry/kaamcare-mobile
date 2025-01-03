import { View } from 'react-native';

import type { HeightLogs } from '../../../../../model/api/medicalLogs/Height';
import { HeightCard } from './HeightCard';

type HeightLogListProps = {
  data?: HeightLogs;
  days?: number;
};

export const HeightLogList = ({ data, days }: HeightLogListProps) => {
  if (!data) {
    return null;
  }

  return (
    <View style={{ gap: 8 }}>
      {data.map((elem, index) => (
        <HeightCard key={elem.id} {...elem} isNewest={index === 0} days={days} />
      ))}
    </View>
  );
};
