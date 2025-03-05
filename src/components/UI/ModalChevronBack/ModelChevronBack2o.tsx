import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import chevron from 'assets/icons/chevron-left.svg';

export const ModalChevronBack2o = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 8, flex: 1 }}>
    <SvgXml xml={chevron} />
  </TouchableOpacity>
);
