import type { StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity, View } from 'react-native';

import { styles } from './PaginationDotted.styles';

type PaginationDottedProps = {
  size: number;
  active: number;
  onDotPress: (index: number) => void;
  activeStyle?: StyleProp<ViewStyle>;
};

export const PaginationDotted = ({ size, active, onDotPress, activeStyle }: PaginationDottedProps) => {
  const renderDots = () =>
    Array.from({ length: size }, (_, i) => i + 1).map((elem) => (
      <TouchableOpacity
        activeOpacity={0.8}
        key={elem}
        onPress={() => onDotPress(elem - 1)}
        style={[styles.paginationDot, active === elem && (activeStyle ?? styles.active)]}
      />
    ));

  return <View style={{ gap: 4, justifyContent: 'center', flexDirection: 'row', flex: 0.2 }}>{renderDots()}</View>;
};
