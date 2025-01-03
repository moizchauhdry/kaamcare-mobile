import { SvgXml } from 'react-native-svg';
import type { TouchableOpacityProps } from 'react-native';
import { TouchableOpacity } from 'react-native';

import plusCircle from '../../../assets/icons/plus-circle.svg';
import { Typography } from '../Typography/Typography';
import { theme } from '../../../config/Theme';

type AdditionButtonProps = TouchableOpacityProps;

export const AdditionButton = ({ style, children, ...props }: AdditionButtonProps) => (
  <TouchableOpacity
    style={[{ flexDirection: 'row', gap: 8, alignItems: 'center', paddingVertical: 12 }, style]}
    {...props}
  >
    <SvgXml xml={plusCircle} />
    <Typography style={{ color: theme.colors.primary }}>{children}</Typography>
  </TouchableOpacity>
);
