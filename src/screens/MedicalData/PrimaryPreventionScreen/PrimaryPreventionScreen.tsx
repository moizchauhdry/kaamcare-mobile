import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native';

import { primaryPreventionScreenData } from 'constants/data/addMedicalDataScreen';
import { SelectWithChevron } from 'components/UI/SelectWithChevron/SelectWithChevron';
import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';
import { AddMedicalDataLayout } from 'components/Layouts/AddMedicalDataLayout/AddMedicalDataLayout';

export const PrimaryPreventionScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();

  return (
    <AddMedicalDataLayout title="Primary Prevention">
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {primaryPreventionScreenData.map((item, index) => (
          <SelectWithChevron
            key={item.id}
            label={item.title}
            isBorder={index < primaryPreventionScreenData.length - 1}
            onPress={() => navigation.navigate(item.listNavigation as any)}
          />
        ))}
      </ScrollView>
    </AddMedicalDataLayout>
  );
};
