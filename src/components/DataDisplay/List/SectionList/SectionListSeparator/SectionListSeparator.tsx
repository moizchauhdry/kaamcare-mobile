import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import chevronDown from '../../../../../assets/icons/chevron-down.svg';
import chevronUp from '../../../../../assets/icons/chevron-up.svg';
import plus from '../../../../../assets/icons/plus-circle.svg';
import { Typography } from '../../../../UI/Typography/Typography';
import { theme } from '../../../../../config/Theme';

type SectionListSeparatorProps = {
  title: string;
  count: number;
  additionalCountText?: string;
  isExpanded?: boolean;
  onExpandablePress?: (title: string) => void;
  onAdditionPress?: () => void;
};

export const SectionListSeparator = ({
  title,
  count,
  additionalCountText,
  isExpanded,
  onExpandablePress,
  onAdditionPress,
}: SectionListSeparatorProps) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
      backgroundColor: theme.colors.background,
    }}
  >
    <View style={{ flexDirection: 'row', gap: 4, flex: 1 }}>
      <TouchableOpacity disabled={count === 0} onPress={() => onExpandablePress?.(title)}>
        {isExpanded ? <SvgXml xml={chevronDown} /> : <SvgXml xml={chevronUp} />}
      </TouchableOpacity>
      <Typography weight="semiBold">
        {title} {`(${count}${additionalCountText ? ` ${additionalCountText}` : ''})`}
      </Typography>
    </View>
    <View>
      <TouchableOpacity onPress={onAdditionPress}>
        <SvgXml xml={plus} />
      </TouchableOpacity>
    </View>
  </View>
);
