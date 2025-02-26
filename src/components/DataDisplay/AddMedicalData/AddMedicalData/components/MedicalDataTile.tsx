import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { Typography } from 'components/UI/Typography/Typography';

import { styles } from './medicalDataTile.styles';
import { theme } from 'config/Theme';
import { MedicalLogs } from 'components/DataDisplay/Home/MedicalLogsData/MedicalLogs';
import { MedicalLogs2o } from 'components/DataDisplay/Home/MedicalLogsData/MedicalLogs2o';

type MedicalDataTileProps = {
  title: string;
  onPress: () => void;
  icon: any;
  isHome?: boolean;
};

export const MedicalDataTile = ({ title, onPress, icon, isHome }: MedicalDataTileProps) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={isHome}
    style={[
      styles.container,
      {
        height: isHome ? 'auto' : 120,
      },
    ]}
  >
    <SvgXml preserveAspectRatio="xMinYMin slice" xml={icon} />
    <Typography weight="semiBold" style={{ fontSize: 20, lineHeight: 30, textAlign: 'center', marginTop: 10 }}>
      {title}
    </Typography>
    {isHome && (
      <View>
        <Typography
          weight="semiBold"
          style={{
            fontSize: 17,
            lineHeight: 25,
            color: theme.colors.gray200,
            fontWeight: '400',
            textAlign: 'center',
            fontStyle: 'italic',
            marginBottom: 4,
          }}
        >
          Track your Blood pressure, Blood sugar, Weight, Height, SpO2 or Heart rate.
        </Typography>
        <View style={{ height: 100 }}>
          <MedicalLogs2o isHome={true} />
        </View>
      </View>
    )}
  </TouchableOpacity>
);
