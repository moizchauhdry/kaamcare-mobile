import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import chevronRight from 'assets/icons/chevron-right.svg';
import { theme } from 'config/Theme';

import { Typography } from '../Typography/Typography';

type SelectWithChevronProps = {
  label: string | (string | React.JSX.Element);
  subLabel?: string | (string | React.JSX.Element) | null;
  onPress?: () => void;
  isBorder?: boolean;
  children?: React.ReactNode;
};

export const SelectWithChevron = ({ label, subLabel, onPress, isBorder = true, children }: SelectWithChevronProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      gap: 18,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomWidth: isBorder ? 0.5 : 0,
      borderColor: theme.colors.lightBlue,
      paddingLeft: 24,
      paddingRight: 16,
      paddingVertical: 13,
      // backgroundColor: theme.colors.white,
    }}
  >
    <View style={{ flexDirection: 'column', flex: 1 }}>
      <Typography weight="normal" numberOfLines={2}>
        {label}
        {children}
      </Typography>
      {subLabel}
    </View>
    <SvgXml xml={chevronRight} />
  </TouchableOpacity>
);
