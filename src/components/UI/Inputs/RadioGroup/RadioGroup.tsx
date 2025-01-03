import { View } from 'react-native';

import type { RadioButtonProps } from 'components/UI/RadioButton/RadioButton';
import RadioButton from 'components/UI/RadioButton/RadioButton';

import { styles } from './RadioGroup.styles';

export type RadioGroupProps = {
  onPress?: (id: string | number) => void;
  radioButtons?: RadioButtonProps[];
  value?: string;
  disabled?: boolean;
  children?: React.ReactNode;
};

export default function RadioGroup({ onPress, radioButtons, value, disabled, children }: RadioGroupProps) {
  return (
    <View style={styles.containerWrapper}>
      {radioButtons?.map((button) => (
        <View style={{ flex: 1 }} key={`radio-button-${button.id}`}>
          <RadioButton selected={button.value === value} onPress={onPress} disabled={disabled} {...button} />
          {button.value === value && children}
        </View>
      ))}
    </View>
  );
}
