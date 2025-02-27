import type { SwitchSelectorProps } from 'react-native-switch-selector';
import SwitchSelector from 'react-native-switch-selector';
import { View } from 'react-native';

import { theme } from '../../../../config/Theme';

type SwitchSelectorComponentProps = SwitchSelectorProps;

export const SwitchSelector2oComponent = ({ initial = -1, value, ...props }: SwitchSelectorComponentProps) => {
  const valueIndex = props?.options.findIndex((elem) => elem?.value === value);

  return (
    <View>
      <SwitchSelector
        borderRadius={8}
        style={{
          backgroundColor: theme.colors.white,
          borderColor: theme.colors.gray200,
          borderWidth: 1,
          borderRadius: 8,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        selectedTextContainerStyle={{ height: 45, borderBottomWidth: 2, borderColor: theme.colors.primary }}
        textStyle={{
          color: theme.colors.textPrimary,
          fontSize: 17,
          lineHeight: 22,
        }}
        textContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        selectedTextStyle={{
          flex: 1,
          fontWeight: '600',
          color: theme.colors.textPrimary,
          fontSize: 17,
          lineHeight: 22,
        }}
        buttonMargin={2}
        buttonColor={'transparent'}
        value={valueIndex}
        initial={valueIndex === -1 ? initial : valueIndex}
        {...props}
      />
    </View>
  );
};
