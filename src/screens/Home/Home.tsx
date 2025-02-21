import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import { useState } from 'react';

import { SwitchTab } from 'components/UI/SwitchTab/SwitchTab';
import { medicalDataTabs } from 'constants/data/homeDataScreen';
import { HomeDataTiles } from 'components/DataDisplay/Home/HomeDataTiles';
import { MedicalLogs } from 'components/DataDisplay/Home/MedicalLogsData/MedicalLogs';
import { HealthInsurance } from 'components/DataDisplay/Home/HealthInsuranceCardsData/HealthInsurance';
import { MyProfile } from 'components/DataDisplay/Home/MyProfileData/MyProfile';

import { theme } from '../../config/Theme';
import { HomeTitle } from '../../components/DataDisplay/Home/HomeTitle/HomeTitle';
import { ContributionComponent } from '../More/HomeScreen/components/ContributionComponent';
// import { OfflineSimulator } from '../../components/OfflineSimulator/OfflineSimulator';
import HomeMedicalLogCard from 'components/DataDisplay/Home/MedicalLogsData/HomeMedicalLogCard';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';

export const Home = () => {
  const [selected, setSelected] = useState<number>(0);
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const contentAboveTheList = (
    <View style={{ gap: 16 }}>
      <HomeTitle />
      <MyProfile />
      {/* <ContributionComponent /> */}
      <HealthInsurance />
      {/* <MedicalLogs /> */}
      <HomeMedicalLogCard navigation={navigation} />
      <SwitchTab tabs={medicalDataTabs} selected={selected} onSelect={setSelected} />
    </View>
  );

  const contentBellowTheList = <View style={{ marginTop: 32 }} />;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 16,
        paddingBottom: -32,
      }}
    >
      <HomeDataTiles
        selected={selected}
        contentAboveTheList={contentAboveTheList}
        contentBellowTheList={contentBellowTheList}
      />
    </SafeAreaView>
  );
};
