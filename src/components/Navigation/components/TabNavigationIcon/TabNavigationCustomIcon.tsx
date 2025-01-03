import type { SvgProps } from 'react-native-svg';
import { SvgXml } from 'react-native-svg';
import { TouchableOpacity } from 'react-native';

import { icons } from 'config/Icons';

type TabNavigationCustomIconProps = {
  name: string;
  size?: number;
  onPress: () => void;
} & SvgProps;

export const TabNavigationCustomIcon = ({ size, name, onPress, ...props }: TabNavigationCustomIconProps) => {
  const svg = icons[name] ?? null;

  return (
    <TouchableOpacity
      style={{
        marginTop: -20,
      }}
      onPress={onPress}
    >
      <SvgXml height={size} preserveAspectRatio="xMinYMin slice" width={size} xml={svg} {...props} />
    </TouchableOpacity>
  );
};
