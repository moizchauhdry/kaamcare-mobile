import { TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import searchIcon from 'assets/icons/search.svg';

import { useQueryGetProfileInformation } from '../../../../hooks/query/profile/useQueryGetProfileInformation';
import { Typography } from '../../../UI/Typography/Typography';
import { theme } from '../../../../config/Theme';
import type { HomeNavigatorParamsList } from '../../../Navigation/LoggednNavigation';

export const HomeTitle = () => {
  const { data } = useQueryGetProfileInformation();
  const navigation = useNavigation<StackNavigationProp<HomeNavigatorParamsList>>();

  const renderContent = () => {
    if (!data || !data.firstName) {
      return 'Welcome in KaamCare!';
    }

    return `${data.firstName} ${data.lastName ? `${data.lastName.slice(0, 1).toUpperCase()}.` : ''}`;
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography size="lg">{renderContent()}</Typography>
        <TouchableOpacity onPress={() => navigation.navigate('HomeSearch')}>
          <SvgXml stroke={theme.colors.primary} xml={searchIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
