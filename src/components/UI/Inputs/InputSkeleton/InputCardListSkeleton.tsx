import { View } from 'react-native';

import { Skeleton } from '../../Skeleton/Skeleton';

type InputCardListSkeletonType = {
  itemsNumber: number;
};

export const InputCardListSkeleton = ({ itemsNumber }: InputCardListSkeletonType) => (
  <View style={{ gap: 8 }}>
    <Skeleton style={{ height: itemsNumber * 100, borderRadius: 8 }} />
  </View>
);
