import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, View } from 'react-native';

import goalsOfCare from 'assets/icons/goals-of-care.svg';
import medicalHistory from 'assets/icons/medical-history.svg';
import medicalLogs from 'assets/icons/medical-logs.svg';
import primaryPrevention from 'assets/icons/primary-prevention.svg';
import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';

import { SearchInput2 } from 'components/UI/Inputs/SearchInput/SearchInput2o';
import { useEffect, useState } from 'react';
import { MedicalDataTile } from './components/MedicalDataTile';

const medicalData = [
  { title: 'Medical Logs', screen: 'MedicalLogs', icon: medicalLogs },
  { title: 'Medical History', screen: 'MedicalHistory', icon: medicalHistory },
  { title: 'Primary Prevention', screen: 'PrimaryPrevention', icon: primaryPrevention },
  // { title: 'Pill Tracker', screen: 'PillTrackerIntro', icon: pillTrackerIcon },
  { title: 'Goals of Care', screen: 'GoalsOfCare', icon: goalsOfCare },
];

export const MedicalDataTiles = () => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const [searchValue, setSearchValue] = useState('');
  const [delayedSearchValue, setDelayedSearchValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDelayedSearchValue(searchValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchValue]);

  const filteredTiles = medicalData.filter((item) =>
    item.title.toLowerCase().includes(delayedSearchValue.toLowerCase()),
  );

  return (
    <>
      <View style={{ marginBottom: 12 }}>
        <SearchInput2 placeholder="Search" value={searchValue} onChangeText={setSearchValue} />
      </View>
      <FlatList
        data={filteredTiles}
        keyExtractor={(item) => item.title}
        numColumns={2} // Ensures two tiles per row
        columnWrapperStyle={{ flex: 1, justifyContent: 'space-between', marginBottom: 16 }} // Ensures alignment
        contentContainerStyle={{ flexGrow: 1 }} // Prevents single column issue
        renderItem={({ item }) => (
          <View style={{ flex: 1, paddingHorizontal: 4 }}>
            <MedicalDataTile title={item.title} onPress={() => navigation.navigate(item.screen)} icon={item.icon} />
          </View>
        )}
      />
    </>
  );
};
