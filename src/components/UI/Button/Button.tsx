import type { TouchableOpacityProps } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

import type { ButtonWeight } from './Button.styles';
import { variants, styles, weights } from './Button.styles';

type ButtonProps = TouchableOpacityProps & {
  variant?: 'default' | 'secondary' | 'danger';
  weight?: ButtonWeight;
  icon?: string;
};

export const Button = ({ icon, children, variant = 'default', weight = 'normal', ...props }: ButtonProps) => (
  <TouchableOpacity
    style={[props.style, styles.button, variants[variant].button, props.disabled && styles.disabled]}
    activeOpacity={0.8}
    {...props}
  >
    {icon && <SvgXml xml={icon} />}
    <Text style={[styles.text, variants[variant].text, weights[weight]]}>{children}</Text>
  </TouchableOpacity>
);
