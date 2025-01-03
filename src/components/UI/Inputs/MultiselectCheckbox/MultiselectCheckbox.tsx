import { View } from 'react-native';
import { useState } from 'react';
import type { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import type { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

import { Checkbox } from '../Checkbox/Checkbox';
import { theme } from '../../../../config/Theme';

type MultiselectCheckboxProps = {
  data: { value: string | number; label: string }[];
  initialValues?: (string | number)[];
  onValuesChange?: (data: (string | number)[]) => void;
  containerStyles?: StyleProp<ViewStyle> | undefined;
};

export const MultiselectCheckbox = ({
  initialValues,
  data,
  onValuesChange,
  containerStyles,
}: MultiselectCheckboxProps) => {
  const [selectedData, setSelectedData] = useState<(string | number)[]>(initialValues ?? []);

  const handleCheckboxPress = (value: string | number, isSelected?: boolean) => {
    const newData: (string | number)[] = isSelected
      ? selectedData.filter((elem) => elem !== value)
      : [...selectedData, value];

    setSelectedData(newData);
    onValuesChange?.(newData);
  };

  return (
    <View
      style={[
        {
          borderRadius: 8,
          paddingVertical: 8,
          paddingHorizontal: 26,
          backgroundColor: theme.colors.white,
          gap: 18,
        },
        containerStyles,
      ]}
    >
      {data.map((elem) => (
        <Checkbox
          key={elem.value}
          onPress={handleCheckboxPress}
          selected={selectedData.includes(elem.value)}
          value={elem.value}
          label={elem.label}
          variant="square"
        />
      ))}
    </View>
  );
};
