import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import chevron from 'assets/icons/chevron-left.svg';

export const ModalChevronBack = () => (
  <View style={{ paddingLeft: 8 }}>
    <SvgXml xml={chevron} />
  </View>
);
