import { View } from 'react-native';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { AddMedicalDataLayout } from '../../../../../components/Layouts/AddMedicalDataLayout/AddMedicalDataLayout';
import { FamilyHistoryDataTiles } from '../../../../../components/DataDisplay/AddMedicalData/MedicalHistory/FamilyHistory/FamilyHistoryDataTiles';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';

type FamilyHistorySelectMedicalHistoryScreenProps = NativeStackScreenProps<
  AddMedicalDataNavigationParamsList,
  'FamilyHistorySelectMedicalHistory'
>;
export const FamilyHistorySelectMedicalHistoryScreen = ({ route }: FamilyHistorySelectMedicalHistoryScreenProps) => (
  <AddMedicalDataLayout title="Choose diagnosis type">
    <View style={{ paddingTop: 3, paddingHorizontal: 16 }}>
      <FamilyHistoryDataTiles id={route.params.id} />
    </View>
  </AddMedicalDataLayout>
);
