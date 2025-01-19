import { Text, View, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { http } from 'services/http/ApiServices';
import { useSignupStore } from 'screens/Intro/Signup/store';

import { theme } from '../../../config/Theme';
import { Button } from '../../../components/UI/Button/Button';
import { moreScreenData } from '../../../constants/data/moreScreen';
import { Typography } from '../../../components/UI/Typography/Typography';
import { ContributionComponent } from './components/ContributionComponent';
import { MoreListItem } from '../../../components/DataDisplay/List/MoreListItem/MoreListItem';

export const HomeScreen = () => {
  const setIsLogged = useSignupStore((store) => store.setIsLogged);

  const handleLogout = () => {
    SecureStore.deleteItemAsync('id-token');
    SecureStore.deleteItemAsync('refresh-token');
    SecureStore.deleteItemAsync('expires-on');
    SecureStore.deleteItemAsync('refresh-token-expires-on');
    SecureStore.deleteItemAsync('b2c_type');
    http.removeHeader('Authorization');
    setIsLogged(false);

    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background, gap: 8 }}>
      <View
        style={{
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          paddingVertical: 16,
          borderBottomColor: theme.colors.backgroundDark,
        }}
      >
        <Typography size="xl">More</Typography>
      </View>
      <ContributionComponent />
      <View style={{ backgroundColor: theme.colors.white, paddingVertical: 16 }}>
        <FlatList
          data={moreScreenData}
          renderItem={(data) => <MoreListItem key={data.item.id} title={data.item.title} name={data.item.name} />}
        />
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <Button variant="secondary" onPress={handleLogout}>
          <Text>Log out</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};
