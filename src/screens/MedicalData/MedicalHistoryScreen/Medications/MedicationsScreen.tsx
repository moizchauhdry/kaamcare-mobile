import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { MedicalHistoryUnitLayout } from '../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitLayout';
import { MedicalHistoryUnitList } from '../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitList';
import { MedicalHistoryUnitEmpty } from '../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitEmpty';
import medication from '../../../../assets/icons/carbon_medication.svg';
import { MedicationCard } from '../../../../components/DataDisplay/AddMedicalData/MedicalHistory/MedicationCard/MedicationCard';
import { useQueryMedications } from '../../../../hooks/query/medicalHistory/medication/useQueryMedications';

type MedicationsScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'Medications'>;

export const MedicationsScreen = ({ navigation }: MedicationsScreenProps) => {
  const { data = [] } = useQueryMedications();

  return (
    <MedicalHistoryUnitLayout title="Medications">
      {data.length > 0 ? (
        <MedicalHistoryUnitList
          data={data}
          renderItem={({ item }) => <MedicationCard {...item} />}
          onAddButtonPress={() => navigation.navigate('SelectMedication')}
          additionButtonText="Add medications"
        />
      ) : (
        <MedicalHistoryUnitEmpty
          contentTitle="Start adding medications"
          description="Your medications list is empty. Tap the button to add your first medication"
          buttonText="Add medication"
          onButtonPress={() => navigation.navigate('SelectMedication')}
          icon={medication}
        />
      )}
    </MedicalHistoryUnitLayout>
  );
};
