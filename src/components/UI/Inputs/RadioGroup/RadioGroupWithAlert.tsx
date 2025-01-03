import { View } from 'react-native';

import RadioButton from 'components/UI/RadioButton/RadioButton';
import type { DangerAlertType } from 'hooks/useAlert';
import { useAlert } from 'hooks/useAlert';

import { styles } from './RadioGroup.styles';

export type RadioGroupWithAlertProps = {
  disabled?: boolean;
  isValidatingNonEmpty?: boolean;
  isNonEmpty?: boolean;
  radioButtonChangeAlertData?: DangerAlertType & {
    isSourceInfo?: boolean;
  };
};

export type RadioGroupWithAlertPropsComponent = RadioGroupWithAlertProps & {
  onPress: (id: string) => void;
  radioButtons: any[];
  currentValue: string;
  disabled?: boolean;
  children?: React.ReactNode;
};

export default function RadioGroupWithAlert({
  onPress,
  radioButtons,
  currentValue,
  disabled,
  children,
  radioButtonChangeAlertData,
  isValidatingNonEmpty,
  isNonEmpty,
}: RadioGroupWithAlertPropsComponent) {
  const { showDangerAlert } = useAlert();

  const handleValueChange = (value: string) => {
    if (radioButtonChangeAlertData && currentValue && value !== '') {
      const current = radioButtons?.find((item) => item?.value === currentValue);
      const destination = radioButtons?.find((item) => item?.value === value);
      let alertMessage;
      if (destination && current) {
        alertMessage = `${radioButtonChangeAlertData?.isSourceInfo ? `You are about to switch your current choice from “${current?.label}” to “${destination?.label}.” ` : ''}${radioButtonChangeAlertData?.description || ''}`;
      } else {
        alertMessage = radioButtonChangeAlertData?.description;
      }

      if (!isValidatingNonEmpty || (isValidatingNonEmpty && isNonEmpty)) {
        showDangerAlert({
          ...radioButtonChangeAlertData,
          description: alertMessage,
          onProceed: () => {
            radioButtonChangeAlertData?.onProceed?.();
            onPress?.(value);
          },
        });
      } else {
        onPress?.(value);
      }
    } else {
      onPress?.(value);
    }
  };

  return (
    <View style={styles.containerWrapper}>
      {radioButtons?.map((button) => (
        <View style={{ flex: 1 }} key={`radio-button-${button.id}`}>
          <RadioButton
            label={button.label}
            sublabel={button.subLabel}
            selected={button.value === currentValue}
            onPress={handleValueChange}
            disabled={disabled}
            {...button}
          />
          {button.value === currentValue && children}
        </View>
      ))}
    </View>
  );
}
