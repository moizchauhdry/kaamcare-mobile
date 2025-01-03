import type { ListRenderItem } from 'react-native';
import { FlatList, View } from 'react-native';

import { AdditionButton } from '../../UI/Button/AdditionButton';

type MedicalHistoryUnitListProps<T> = {
  data: T[];
  renderItem: ListRenderItem<T>;
  onAddButtonPress?: () => void;
  additionButtonText?: string;
};

export const MedicalHistoryUnitList = <T,>({
  additionButtonText,
  onAddButtonPress,
  data,
  renderItem,
}: MedicalHistoryUnitListProps<T>) => (
  <View style={{ gap: 18, flex: 1 }}>
    {additionButtonText ? (
      <View>
        <AdditionButton onPress={onAddButtonPress}>{additionButtonText}</AdditionButton>
      </View>
    ) : null}
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ gap: 8 }}
        scrollEnabled={data.length > 4}
        data={data}
        renderItem={renderItem}
        contentOffset={{ x: 0, y: 8 }}
      />
    </View>
  </View>
);
