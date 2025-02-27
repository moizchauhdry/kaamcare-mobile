import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import type { TextStyle } from 'react-native';
import { View } from 'react-native';

import outlinedCircle from 'assets/icons/outlined-circle.svg';
import check from 'assets/icons/check.svg';

import { Typography } from '../Typography/Typography';
import { styles } from './RadioButton.styles';
import { Card } from '../Card/Card';

export type RadioButtonProps = {
  disabled?: boolean;
  id: string;
  onPress?: (id: string | number) => void;
  selected?: boolean;
  label: string;
  subLabel?: string;
  labelStyles?: TextStyle;
  value: string | number;
};

export default function RadioButton2o({
  disabled = false,
  value,
  onPress,
  selected = false,
  labelStyles,
  label,
  subLabel,
}: RadioButtonProps) {
  const handlePress = () => {
    onPress?.(selected ? '' : value);
  };

  return (
    <Card style={{ paddingVertical: 15 }}>
      <TouchableOpacity
        disabled={disabled}
        onPress={handlePress}
        style={{
          alignItems: 'center',
          //   gap: 10,
          flexDirection: 'row',
          //   paddingVertical: 11,
          justifyContent: 'space-between',
        }}
      >
        {subLabel ? (
          <View style={{ flexDirection: 'column', gap: 0, paddingRight: 24 }}>
            <Typography color={disabled ? 'gray' : 'primary'} style={labelStyles}>
              {label}
            </Typography>
            <Typography color={disabled ? 'gray' : 'primary'} style={{ fontSize: 13, lineHeight: 13, margin: 0 }}>
              {subLabel}
            </Typography>
          </View>
        ) : (
          <Typography color={disabled ? 'gray' : 'primary'} style={labelStyles}>
            {label}
          </Typography>
        )}
        {selected ? <SvgXml xml={check} width={25} height={25} /> : <SvgXml xml={outlinedCircle} />}
      </TouchableOpacity>
    </Card>
  );
}
