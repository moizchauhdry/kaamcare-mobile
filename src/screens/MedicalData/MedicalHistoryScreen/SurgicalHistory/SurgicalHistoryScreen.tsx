import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { MedicalHistoryUnitLayout } from '../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitLayout';
import { MedicalHistoryUnitList } from '../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitList';
import { MedicalHistoryUnitEmpty } from '../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitEmpty';
import surgicalHistoryIcon from '../../../../assets/icons/surgical.svg';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { useQuerySurgicalHistoryList } from '../../../../hooks/query/medicalHistory/surgicalHistory/useQuerySurgicalHistoryList';
import { SurgicalHistoryCard } from '../../../../components/DataDisplay/AddMedicalData/MedicalHistory/SurgicalHistory/SurgicalHistoryCard';

type SurgicalHistoryScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'SurgicalHistory'>;

export const SurgicalHistoryScreen = ({ navigation }: SurgicalHistoryScreenProps) => {
  const { data = { surgicalHistory: [] } } = useQuerySurgicalHistoryList();
  console.log('data of SurgicalHistoryScreen====', JSON.stringify(data));

  return (
    <MedicalHistoryUnitLayout title="Surgical History">
      {data.surgicalHistory.length > 0 ? (
        <MedicalHistoryUnitList
          data={data.surgicalHistory}
          renderItem={({ item }) => <SurgicalHistoryCard {...item} />}
          onAddButtonPress={() => navigation.navigate('SelectSurgicalHistory')}
          additionButtonText="Add surgical history"
        />
      ) : (
        <MedicalHistoryUnitEmpty
          contentTitle="Start adding surgical history"
          description="Your surgical history section is empty. Tap the button to add your first item"
          buttonText="Add surgical history"
          onButtonPress={() => navigation.navigate('SelectSurgicalHistory')}
          icon={surgicalHistoryIcon}
        />
      )}
    </MedicalHistoryUnitLayout>
  );
};
