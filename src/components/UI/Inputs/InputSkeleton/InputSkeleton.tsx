import { View } from 'react-native';

import { Skeleton } from '../../Skeleton/Skeleton';

export const InputSkeleton = () => (
  <View style={{ gap: 8 }}>
    <Skeleton style={{ width: 100, height: 22, borderRadius: 8 }} />
    <Skeleton style={{ height: 48, borderRadius: 8 }} />
  </View>
);
