import { View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import { Typography } from '../../../components/UI/Typography/Typography';
import { settingsScreenData } from '../../../constants/data/moreScreen';
import { MoreListItem } from '../../../components/DataDisplay/List/MoreListItem/MoreListItem';
import { theme } from '../../../config/Theme';
import trash from '../../../assets/icons/trash.svg';
import { useAuth } from '../../../context/AuthContext';

export const SettingsScreen = () => {
  const navigation = useNavigation();
  const { handlePasswordReset } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background, gap: 8 }}>
      <View style={{ paddingHorizontal: 16 }}>
        <Typography size="lg">Settings</Typography>
      </View>
      <View style={{ backgroundColor: theme.colors.white }}>
        <FlatList
          data={settingsScreenData}
          renderItem={(data) => (
            <MoreListItem
              key={data.item.id}
              title={data.item.title}
              name={data.item.name}
              // onPress={data.item.onPress}
            />
          )}
        />
      </View>
      <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}
          onPress={() => navigation.navigate('DeleteAccount' as never)}
        >
          <SvgXml xml={trash} />
          <Typography style={{ color: theme.colors.danger }}>Delete account</Typography>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
