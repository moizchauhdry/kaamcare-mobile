import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import type { PropsWithChildren } from 'react';

import { Typography } from '../../Typography/Typography';
import { theme } from '../../../../config/Theme';
import chevronUp from '../../../../assets/icons/chevron-up.svg';
import chevronDown from '../../../../assets/icons/chevron-down.svg';

type AccordionItemPros = PropsWithChildren<{
  title: string;
  onHeaderPress: () => void;
  expanded?: boolean;
}>;

export const AccordionItem = ({ children, title, expanded, onHeaderPress }: AccordionItemPros) => {
  const body =
    typeof children === 'string' ? (
      <View style={{ paddingTop: 8 }}>
        <Typography size="md">{children}</Typography>
      </View>
    ) : (
      <View style={{ paddingTop: 8 }}>{children}</View>
    );

  return (
    <View style={{ paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: theme.colors.lightBlue }}>
      <TouchableOpacity onPress={onHeaderPress}>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          <SvgXml xml={expanded ? chevronUp : chevronDown} />
          <Typography size="md" weight="semiBold">
            {title}
          </Typography>
        </View>
      </TouchableOpacity>
      {expanded && body}
    </View>
  );
};
