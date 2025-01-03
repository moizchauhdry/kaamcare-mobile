import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { ScrollView } from 'react-native';

import { TypographySuperScript } from 'components/UI/Typography/Typography';
import { SelectWithChevron } from 'components/UI/SelectWithChevron/SelectWithChevron';
import { medicalLogsScreenData } from 'constants/data/addMedicalDataScreen';
import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';
import { AddMedicalDataLayout } from 'components/Layouts/AddMedicalDataLayout/AddMedicalDataLayout';

export const MedicalLogsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  return (
    <AddMedicalDataLayout title="Medical Logs">
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        {medicalLogsScreenData.map((item, index) => (
          <SelectWithChevron
            key={item.id}
            label={item.title}
            isBorder={index < medicalLogsScreenData.length - 1}
            onPress={() => navigation.navigate(item.addNavigation as keyof AddMedicalDataNavigationParamsList)}
          >
            {item?.lowerIndex && <TypographySuperScript>{item.lowerIndex}</TypographySuperScript>}
          </SelectWithChevron>
        ))}
      </ScrollView>
    </AddMedicalDataLayout>
  );
};
