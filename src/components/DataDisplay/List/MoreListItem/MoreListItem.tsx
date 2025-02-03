import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import chevronRight from '../../../../assets/icons/chevron-right.svg';
import { Typography } from '../../../UI/Typography/Typography';
import { theme } from '../../../../config/Theme';

type MoreListItemProps = {
  title: string;
  name: string;
  onPress?: () => void;
};

export const MoreListItem = ({ title, name, onPress }: MoreListItemProps) => {
  const navigation = useNavigation();

  const handleItemPress = () => {
    navigation.navigate(name as never);
  };

  return (
    <TouchableWithoutFeedback onPress={onPress ?? handleItemPress}>
      <View
        style={{
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 8,
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          borderBottomColor: theme.colors.lightBlue,
        }}
      >
        <Typography style={{ paddingVertical: 4, flexShrink: 1, flex: 1 }}>{title}</Typography>
        <SvgXml xml={chevronRight} />
      </View>
    </TouchableWithoutFeedback>
  );
};
