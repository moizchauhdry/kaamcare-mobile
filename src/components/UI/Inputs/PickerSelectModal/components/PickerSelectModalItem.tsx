import { TouchableWithoutFeedback, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import outlinedCircle from 'assets/icons/outlined-circle.svg';
import standaloneCheck from 'assets/icons/check-standalone.svg';
import { Typography } from 'components/UI/Typography/Typography';
import { theme } from 'config/Theme';

type PickerSelectModalItemProps = {
  label: string;
  value: string;
  selected?: boolean;
  subLabel?: string;
  onPress?: (value: string) => void;
};

export const PickerSelectModalItem = ({ label, subLabel, value, selected, onPress }: PickerSelectModalItemProps) => (
  <TouchableWithoutFeedback onPress={() => onPress?.(selected ? '' : value)}>
    <View
      style={{
        flex: 1,
        gap: 18,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: theme.colors.lightBlue,
        paddingHorizontal: 16,
        paddingVertical: 16,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: selected ? theme.colors.primary : theme.colors.white,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        {selected ? <SvgXml xml={standaloneCheck} /> : <SvgXml xml={outlinedCircle} />}
      </View>
      <View>
        <Typography>{label}</Typography>
        {subLabel && <Typography size="xs">{subLabel}</Typography>}
      </View>
    </View>
  </TouchableWithoutFeedback>
);
