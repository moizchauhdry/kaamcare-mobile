import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native';

import { SelectWithChevron } from 'components/UI/SelectWithChevron/SelectWithChevron';
import { goalsOfCareScreenData } from 'constants/data/addMedicalDataScreen';
import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';
import { AddMedicalDataLayout } from 'components/Layouts/AddMedicalDataLayout/AddMedicalDataLayout';

export const GoalsOfCareScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();

  return (
    <AddMedicalDataLayout title="Goals Of Care">
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {goalsOfCareScreenData.map((item, index) => (
          <SelectWithChevron
            key={item.id}
            label={item.title}
            isBorder={index < goalsOfCareScreenData.length - 1}
            onPress={() => navigation.navigate(item.listNavigation)}
          />
        ))}
      </ScrollView>
    </AddMedicalDataLayout>
  );
};
