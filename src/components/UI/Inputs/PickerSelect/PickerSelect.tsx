import type { PickerSelectProps as RNPickerSelectProps, Item } from 'react-native-picker-select';
import { SvgXml } from 'react-native-svg';
import RNPickerSelect from 'react-native-picker-select';
import { Platform } from 'react-native';

import { styles as inputStyles } from '../TextInput/TextInput.styles';
import { theme } from '../../../../config/Theme';
import select from '../../../../assets/icons/select.svg';

type PickerSelectProps = {
  onValueChange: (value: any, index: number) => void;
  items: Item[];
  value: string;
  pickerSelectProps?: RNPickerSelectProps;
  error?: boolean;
};

export const PickerSelect = ({ error, value, items, onValueChange, pickerSelectProps }: PickerSelectProps) => (
  <RNPickerSelect
    value={value}
    items={items}
    onValueChange={onValueChange}
    placeholder={{ label: 'Select', value: null, color: Platform.OS === 'android' ? theme.colors.gray200 : undefined }}
    useNativeAndroidPickerStyle={false}
    style={{
      inputIOS: [inputStyles.input, error ? inputStyles.inputError : undefined],
      inputAndroid: [inputStyles.input, error ? inputStyles.inputError : undefined],
      headlessAndroidContainer: [{ position: 'relative' }],
      modalViewMiddle: { backgroundColor: theme.colors.gray },
      modalViewBottom: { backgroundColor: theme.colors.white },
      iconContainer: { paddingRight: 12, paddingTop: 12 },
    }}
    Icon={() => <SvgXml xml={select} color={theme.colors.primary} />}
    {...pickerSelectProps}
  />
);
