import { View } from 'react-native';

import type { WeightLogs } from '../../../../../model/api/medicalLogs/Weight';
import { WeightCard } from './WeightCard';

type WeightLogListProps = {
  data?: WeightLogs;
  days?: number;
};

export const WeightLogList = ({ data, days }: WeightLogListProps) => {
  if (!data) {
    return null;
  }

  return (
    <View style={{ gap: 8 }}>
      {data.map((elem, index) => (
        <WeightCard key={elem.id} {...elem} isNewest={index === 0} days={days} />
      ))}
    </View>
  );
};
