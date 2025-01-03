import { FlatList, View } from 'react-native';

import { theme } from '../../../../../config/Theme';
import { Typography } from '../../../Typography/Typography';
import type { PickerSelectModalItemData } from '../PickerSelectModal';
import { PickerSelectModalItem } from './PickerSelectModalItem';

type PickerSelectModalContentProps = {
  data: PickerSelectModalItemData[] | readonly PickerSelectModalItemData[];
  onItemSelect: (value: string) => void;
  selectedValue: string;
  dataTitle?: string;
};

export const PickerSelectModalContent = ({
  dataTitle,
  data,
  onItemSelect,
  selectedValue,
}: PickerSelectModalContentProps) => (
  <View style={{ flex: 1 }}>
    <View style={{ gap: 16 }}>
      {dataTitle ? (
        <Typography style={{ paddingLeft: 16 }} weight="semiBold">
          {dataTitle}
        </Typography>
      ) : null}
      <FlatList
        style={{ backgroundColor: theme.colors.white }}
        data={data}
        renderItem={(listData) => (
          <PickerSelectModalItem
            onPress={(value) => onItemSelect?.(value)}
            selected={listData.item.value === selectedValue}
            label={listData.item.label}
            value={listData.item.value}
            subLabel={listData.item.subLabel}
          />
        )}
      />
    </View>
  </View>
);
