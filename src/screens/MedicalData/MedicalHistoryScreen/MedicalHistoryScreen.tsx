import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native';

import { medicalHistoryScreenData } from 'constants/data/addMedicalDataScreen';
import { SelectWithChevron } from 'components/UI/SelectWithChevron/SelectWithChevron';
import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';
import { AddMedicalDataLayout } from 'components/Layouts/AddMedicalDataLayout/AddMedicalDataLayout';

export const MedicalHistoryScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();

  return (
    <AddMedicalDataLayout title="Medical History">
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {medicalHistoryScreenData.map((item, index) => (
          <SelectWithChevron
            key={item.id}
            label={item.title}
            isBorder={index < medicalHistoryScreenData.length - 1}
            onPress={() => navigation.navigate(item.addNavigation as any)}
          />
        ))}
      </ScrollView>
    </AddMedicalDataLayout>
  );
};
