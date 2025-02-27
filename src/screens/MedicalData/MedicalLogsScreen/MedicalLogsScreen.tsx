import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView, View } from 'react-native';

import { TypographySuperScript } from 'components/UI/Typography/Typography';
import { SelectWithChevron } from 'components/UI/SelectWithChevron/SelectWithChevron';
import { medicalLogsScreenData } from 'constants/data/addMedicalDataScreen';
import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';
import { AddMedicalDataLayout } from 'components/Layouts/AddMedicalDataLayout/AddMedicalDataLayout';
import { SearchInput2 } from 'components/UI/Inputs/SearchInput/SearchInput2o';
import { useState, useEffect } from 'react';

export const MedicalLogsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const [searchValue, setSearchValue] = useState('');
  const [filteredData, setFilteredData] = useState(medicalLogsScreenData);

  useEffect(() => {
    const handler = setTimeout(() => {
      const searchText = searchValue.toLowerCase();
      setFilteredData(medicalLogsScreenData.filter((item) => item.title.toLowerCase().includes(searchText)));
    }, 250);

    return () => clearTimeout(handler); // Cleanup to prevent unnecessary executions
  }, [searchValue]);

  return (
    <AddMedicalDataLayout title="">
      <View style={{ marginVertical: 25, marginHorizontal: 12 }}>
        <SearchInput2 placeholder="Search" value={searchValue} onChangeText={setSearchValue} />
      </View>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {filteredData.map((item, index) => (
          <SelectWithChevron
            key={item.id}
            label={item.title}
            isBorder={index < filteredData.length - 1}
            onPress={() => navigation.navigate(item.addNavigation as keyof AddMedicalDataNavigationParamsList)}
          >
            {item?.lowerIndex && <TypographySuperScript>{item.lowerIndex}</TypographySuperScript>}
          </SelectWithChevron>
        ))}
      </ScrollView>
    </AddMedicalDataLayout>
  );
};
