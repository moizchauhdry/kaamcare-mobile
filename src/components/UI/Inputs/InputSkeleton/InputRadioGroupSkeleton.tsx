import { View } from 'react-native';

import { Skeleton } from '../../Skeleton/Skeleton';

type InputRadioGroupType = {
  itemsNumber: number;
};

export const InputRadioGroupSkeleton = ({ itemsNumber }: InputRadioGroupType) => (
  <View style={{ gap: 8 }}>
    <Skeleton style={{ height: itemsNumber * 54, borderRadius: 8 }} />
  </View>
);
