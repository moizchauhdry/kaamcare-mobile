import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, View } from 'react-native';
import pillIcon from 'assets/icons/pill.svg';
import goalsOfCare from 'assets/icons/goals-of-care.svg';
import medicalHistory from 'assets/icons/medical-history.svg';
import spo2Icon from 'assets/icons/spo2.svg';
import weightIcon from 'assets/icons/weight.svg';
import heightIcon from 'assets/icons/height.svg';
import bloodPressureIcon from 'assets/icons/b-p.svg';
import bloodSugarIcon from 'assets/icons/blood-sugar.svg';
import primaryPrevention from 'assets/icons/primary-prevention.svg';
import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';

import { SearchInput2 } from 'components/UI/Inputs/SearchInput/SearchInput2o';
import { useEffect, useState } from 'react';
import { MedicalDataTile } from './components/MedicalDataTile';

const medicalData = [
  { title: 'Blood Pressure', screen: 'BloodPressureForm', icon: bloodPressureIcon },
  { title: 'Blood Sugar', screen: 'BloodSugarForm', icon: bloodSugarIcon },
  { title: 'Height', screen: 'HeightForm', icon: heightIcon },
  { title: 'Weight', screen: 'WeightForm', icon: weightIcon },
  { title: 'SpO2', screen: 'SaturationForm', icon: spo2Icon },
  { title: 'Pill Tracker', screen: 'PillTrackerHome', icon: pillIcon },
  { title: 'Medical History', screen: 'MedicalHistory', icon: medicalHistory },
  { title: 'Preventive Care', screen: 'PrimaryPrevention', icon: primaryPrevention },
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

  let filteredTiles = medicalData.filter((item) => item.title.toLowerCase().includes(delayedSearchValue.toLowerCase()));

  if (filteredTiles.length % 2 !== 0) {
    filteredTiles = [...filteredTiles, { title: 'Placeholder', screen: '', icon: null }];
  }

  return (
    <>
      <View style={{ marginBottom: 12 }}>
        <SearchInput2 placeholder="Search" value={searchValue} onChangeText={setSearchValue} />
      </View>
      <FlatList
        data={filteredTiles}
        keyExtractor={(item) => item.title}
        numColumns={2}
        columnWrapperStyle={{ flex: 1, justifyContent: 'space-between', marginBottom: 16 }}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{
          marginBottom: 100,
        }}
        renderItem={({ item }) =>
          item.screen ? (
            <View style={{ flex: 1, paddingHorizontal: 4 }}>
              <MedicalDataTile title={item.title} onPress={() => navigation.navigate(item.screen)} icon={item.icon} />
            </View>
          ) : (
            <View style={{ flex: 1, paddingHorizontal: 4, opacity: 0 }} />
          )
        }
      />
    </>
  );
};
