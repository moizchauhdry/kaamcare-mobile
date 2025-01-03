import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { Typography } from 'components/UI/Typography/Typography';

import { styles } from './medicalDataTile.styles';

type MedicalDataTileProps = {
  title: string;
  onPress: () => void;
  icon: any;
};

export const MedicalDataTile = ({ title, onPress, icon }: MedicalDataTileProps) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <SvgXml preserveAspectRatio="xMinYMin slice" xml={icon} />
    <Typography weight="semiBold" style={{ fontSize: 20, lineHeight: 25, textAlign: 'center' }}>
      {title}
    </Typography>
  </TouchableOpacity>
);
