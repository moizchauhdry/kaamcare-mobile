import type { TextStyle } from 'react-native';
import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import check from '../../../../assets/icons/check.svg';
import checkSquare from '../../../../assets/icons/check-square.svg';
import outlinedCircle from '../../../../assets/icons/outlined-circle.svg';
import outlineSquare from '../../../../assets/icons/square-empty.svg';
import { Typography } from '../../Typography/Typography';

export type CheckboxProps = {
  value: string | number;
  label: string;
  disabled?: boolean;
  onPress?: (value: string | number, selected?: boolean) => void;
  selected?: boolean;
  labelStyles?: TextStyle;
  variant?: 'circle' | 'square';
};

export const Checkbox = ({
  variant = 'circle',
  value,
  label,
  disabled,
  onPress,
  selected,
  labelStyles,
}: CheckboxProps) => (
  <TouchableOpacity disabled={disabled} onPress={() => onPress?.(value, selected)}>
    <View style={{ flexDirection: 'row', gap: 8 }}>
      {selected ? (
        <SvgXml xml={variant === 'circle' ? check : checkSquare} width={24} height={24} />
      ) : (
        <SvgXml xml={variant === 'circle' ? outlinedCircle : outlineSquare} />
      )}
      <Typography color={disabled ? 'gray' : 'primary'} style={labelStyles}>
        {label}
      </Typography>
    </View>
  </TouchableOpacity>
);
