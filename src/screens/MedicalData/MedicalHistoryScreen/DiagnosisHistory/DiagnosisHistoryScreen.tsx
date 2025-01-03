import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import diagnosisIcon from 'assets/icons/diagnosis.svg';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { MedicalHistoryUnitLayout } from '../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitLayout';
import { MedicalHistoryUnitEmpty } from '../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitEmpty';
import { MedicalHistoryUnitList } from '../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitList';
import { useQueryDiagnosisList } from '../../../../hooks/query/medicalHistory/diagnosis/useQueryDiagnosisList';
import { DiagnosisCard } from '../../../../components/DataDisplay/AddMedicalData/MedicalHistory/DiagnosisCard/DiagnosisCard';

type DiagnosisHistoryScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'Diagnosis'>;

export const DiagnosisHistoryScreen = ({ navigation }: DiagnosisHistoryScreenProps) => {
  const { data = [] } = useQueryDiagnosisList();

  return (
    <MedicalHistoryUnitLayout title="Diagnosis">
      {data.length > 0 ? (
        <MedicalHistoryUnitList
          data={data}
          renderItem={({ item }) => <DiagnosisCard {...item} />}
          onAddButtonPress={() => navigation.navigate('SelectDiagnosis')}
          additionButtonText="Add diagnosis"
        />
      ) : (
        <MedicalHistoryUnitEmpty
          contentTitle="Start adding diagnosis"
          description="Your diagnosis section is empty.\nTap the button to add your first diagnosis."
          buttonText="Add diagnosis"
          onButtonPress={() => navigation.navigate('SelectDiagnosis')}
          icon={diagnosisIcon}
        />
      )}
    </MedicalHistoryUnitLayout>
  );
};
