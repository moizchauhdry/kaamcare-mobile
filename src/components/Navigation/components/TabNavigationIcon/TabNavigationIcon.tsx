import type { SvgProps } from 'react-native-svg';
import { SvgXml } from 'react-native-svg';
import { useIsFocused } from '@react-navigation/native';

import { theme } from '../../../../config/Theme';
import { icons } from '../../../../config/Icons';

type TabNavigationIconProps = {
  name: string;
  size?: number;
} & SvgProps;

export const TabNavigationIcon = ({ size, name, ...props }: TabNavigationIconProps) => {
  const focus = useIsFocused();
  const svg = icons[name] ?? null;

  return (
    <SvgXml
      height={size}
      color={focus ? theme.colors.primary : theme.colors.textPrimary}
      preserveAspectRatio="xMinYMin slice"
      width={size}
      xml={svg}
      {...props}
    />
  );
};
