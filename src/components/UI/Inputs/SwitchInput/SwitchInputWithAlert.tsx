import type { SwitchProps as RNSwitchInputWithAlertProps, SwitchChangeEvent } from 'react-native';
import { Switch as RNSwitchInputWithAlert, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { theme } from 'config/Theme';

import type { DangerAlertType } from '../../../../hooks/useAlert';
import { useAlert } from '../../../../hooks/useAlert';

export type SwitchInputWithAlertProps = RNSwitchInputWithAlertProps & {
  disabled?: boolean;
  isHorizontal?: boolean;
  switchInputToggleOffAlertData?: DangerAlertType;
  switchInputToggleOnAlertData?: DangerAlertType;
  alertType?: 'danger' | 'default';
  isValidatingNonEmpty?: boolean;
  isNonEmpty?: boolean;
  enableAlert?: boolean;
};

export type SwitchInputWithAlertPropsComponent = SwitchInputWithAlertProps & {
  onChange: ((event: SwitchChangeEvent | boolean) => void | Promise<void>) | ((...event: any[]) => void) | null;
  currentValue: boolean;
};

export const SwitchInputWithAlert = ({
  onChange,
  currentValue,
  switchInputToggleOnAlertData,
  switchInputToggleOffAlertData,
  alertType,
  isValidatingNonEmpty,
  isNonEmpty,
  enableAlert = true,
  ...restProps
}: SwitchInputWithAlertPropsComponent) => {
  const { showDangerAlert, showConfirmationAlert } = useAlert();
  const isAlert = (switchInputToggleOffAlertData && currentValue) || (switchInputToggleOnAlertData && !currentValue);
  const handleValueChange = (value: boolean) => {
    const alertOptions = value ? switchInputToggleOnAlertData : switchInputToggleOffAlertData;

    if (alertOptions && enableAlert) {
      const properAlertOptions = {
        ...alertOptions,
        onProceed: () => {
          alertOptions?.onProceed?.();
          onChange?.(value);
        },
      };
      const showAlert = alertType === 'danger' ? showDangerAlert : showConfirmationAlert;

      if (!isValidatingNonEmpty || (isValidatingNonEmpty && isNonEmpty)) {
        showAlert(properAlertOptions);
      } else {
        onChange?.(value);
      }
    } else {
      onChange?.(value);
    }
  };

  return (
    <View>
      {isAlert ? (
        <TouchableOpacity onPress={() => handleValueChange(!currentValue)}>
          <View pointerEvents="none">
            <RNSwitchInputWithAlert
              trackColor={{ false: theme.colors.gray200, true: theme.colors.blue }}
              ios_backgroundColor={theme.colors.gray200}
              value={currentValue}
              {...restProps}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <RNSwitchInputWithAlert
          trackColor={{ false: theme.colors.gray200, true: theme.colors.blue }}
          ios_backgroundColor={theme.colors.gray200}
          onValueChange={handleValueChange}
          value={currentValue}
          {...restProps}
        />
      )}
    </View>
  );
};
