import type { SwitchProps as RNSwitchInputProps } from 'react-native';
import { Switch as RNSwitchInput } from 'react-native';

import { theme } from 'config/Theme';

export type SwitchInputProps = RNSwitchInputProps & {
  disabled?: boolean;
  isHorizontal?: boolean;
};

export const SwitchInput = ({ ...restProps }: SwitchInputProps) => (
  <RNSwitchInput
    trackColor={{ false: theme.colors.gray200, true: theme.colors.blue }}
    ios_backgroundColor={theme.colors.gray200}
    {...restProps}
  />
);
