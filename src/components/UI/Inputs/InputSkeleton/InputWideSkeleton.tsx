import { View } from 'react-native';

import { Skeleton } from '../../Skeleton/Skeleton';

export const InputWideSkeleton = () => (
  <View style={{ gap: 8 }}>
    <Skeleton style={{ width: 100, height: 22 }} />
    <Skeleton style={{ height: 68, borderRadius: 8 }} />
  </View>
);
