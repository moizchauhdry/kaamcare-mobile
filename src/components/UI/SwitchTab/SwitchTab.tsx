import { TouchableOpacity, View } from 'react-native';

import { styles, typographyProps } from './SwitchTab.styles';
import { Typography } from '../Typography/Typography';

type Tab<TData> = {
  value: TData extends string ? string : number;
  label: string;
};

type SwitchTabProps<TData> = {
  selected: TData;
  tabs: Tab<TData>[];
  onSelect:
    | React.Dispatch<React.SetStateAction<TData extends string ? string : number>>
    | ((days: TData extends string ? string : number) => void);
  children?: React.ReactNode;
  type?: 'selector' | 'normal';
};

export const SwitchTab = <TData,>({ onSelect, selected, tabs, type = 'selector' }: SwitchTabProps<TData>) => (
  <View style={styles[type].wrapper}>
    {tabs?.map(({ value, label }: Tab<TData>) => {
      const textProps = selected === value ? typographyProps[type].active : typographyProps[type].default;
      return (
        <TouchableOpacity
          key={value}
          style={[styles[type].element, selected === value ? styles[type].elementActive : undefined]}
          onPress={() => onSelect(value)}
        >
          <Typography {...textProps}>{label}</Typography>
        </TouchableOpacity>
      );
    })}
  </View>
);
