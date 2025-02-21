import { View } from 'react-native';

import { MedicalDataTiles } from 'components/DataDisplay/AddMedicalData/AddMedicalData/MedicalDataTiles';
import { AddMedicalDataLayout } from 'components/Layouts/AddMedicalDataLayout/AddMedicalDataLayout';
import { Typography } from 'components/UI/Typography/Typography';

export const AddMedicalDataHomeScreen = () => {
  return (
    <AddMedicalDataLayout title="Add medical data">
      <View style={{ paddingTop: 3, paddingHorizontal: 16 }}>
        <Typography style={{ fontSize: 28, fontWeight: '700' }} size="xl" weight="bolder">
          Add medical data
        </Typography>
        <MedicalDataTiles />
      </View>
    </AddMedicalDataLayout>
  );
};
