import { View, ScrollView, SafeAreaView } from 'react-native';

import { Typography } from '../../../components/UI/Typography/Typography';
import { theme } from '../../../config/Theme';
import { ProfileDataList } from '../../../components/DataDisplay/Profile/ProfileDataList';
import { HealthcareProvidersList } from '../../../components/DataDisplay/Profile/HealthcareProvidersList';

export const MyProfile = () => (
  <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
    <ScrollView automaticallyAdjustKeyboardInsets>
      <View style={{ gap: 8 }}>
        <View style={{ paddingHorizontal: 16 }}>
          <Typography size="lg">My Profile</Typography>
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <ProfileDataList />
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <View style={{ height: 1, backgroundColor: theme.colors.backgroundDark }} />
        </View>
        <HealthcareProvidersList />
      </View>
    </ScrollView>
  </SafeAreaView>
);
