import { View } from 'react-native';

import { Skeleton } from '../../Skeleton/Skeleton';

type InputSwitchSkeletonType = {
  isHorizontal?: boolean;
};

export const InputSwitchSkeleton = ({ isHorizontal }: InputSwitchSkeletonType) => (
  <View style={{ gap: 8 }}>
    <Skeleton style={{ height: isHorizontal ? 38 : 68, borderRadius: 8 }} />
  </View>
);
