import { Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Typography } from '../../../components/UI/Typography/Typography';
import { moreScreenData } from '../../../constants/data/moreScreen';
import { Button } from '../../../components/UI/Button/Button';
import { MoreListItem } from '../../../components/DataDisplay/List/MoreListItem/MoreListItem';
import { theme } from '../../../config/Theme';
import { useAuth } from '../../../context/AuthContext';
import { ContributionComponent } from './components/ContributionComponent';

export const HomeScreen = () => {
  const { handleLogout } = useAuth();

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
