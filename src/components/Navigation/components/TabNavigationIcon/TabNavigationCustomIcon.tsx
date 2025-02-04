/* eslint-disable @typescript-eslint/consistent-type-imports */
import type { SvgProps } from 'react-native-svg';
import { SvgXml } from 'react-native-svg';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import { icons } from 'config/Icons';

type TabNavigationCustomIconProps = {
  name: string;
  size?: number;
  onPress: () => void;
  styles?: StyleProp<ViewStyle>;
} & SvgProps;

export const TabNavigationCustomIcon = ({ size, name, onPress, styles, ...props }: TabNavigationCustomIconProps) => {
  const svg = icons[name] ?? null;

  return (
    <TouchableOpacity style={[styles]} onPress={onPress}>
      <SvgXml height={size} preserveAspectRatio="xMinYMin slice" width={size} xml={svg} {...props} />
    </TouchableOpacity>
  );
};
