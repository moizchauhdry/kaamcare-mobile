import { View } from 'react-native';

import { MedicalDataTiles } from 'components/DataDisplay/AddMedicalData/AddMedicalData/MedicalDataTiles';
import { AddMedicalDataLayout } from 'components/Layouts/AddMedicalDataLayout/AddMedicalDataLayout';

export const AddMedicalDataHomeScreen = () => (
  <AddMedicalDataLayout title="Add medical data">
    <View style={{ paddingTop: 3, paddingHorizontal: 16 }}>
      <MedicalDataTiles />
    </View>
  </AddMedicalDataLayout>
);
