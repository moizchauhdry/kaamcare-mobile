import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { MedicalHistoryUnitLayout } from '../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitLayout';
import { MedicalHistoryUnitList } from '../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitList';
import { FamilyHistoryMemberCard } from '../../../../components/DataDisplay/AddMedicalData/MedicalHistory/FamilyHistory/FamilyHistoryMemberCard';
import { useQueryFamilyMembersList } from '../../../../hooks/query/medicalHistory/familyHistory/useQueryFamilyMembersList';
import { useQueryFamilyMembersDiagnosisList } from '../../../../hooks/query/medicalHistory/familyHistory/useQueryFamilyMembersDiagnosisList';

type FamilyHistoryScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'FamilyHistory'>;

export const FamilyHistoryScreen = ({ navigation }: FamilyHistoryScreenProps) => {
  const { data = [] } = useQueryFamilyMembersList();
  useQueryFamilyMembersDiagnosisList();

  return (
    <MedicalHistoryUnitLayout title="Family history">
      <MedicalHistoryUnitList
        data={data}
        renderItem={({ item }) => <FamilyHistoryMemberCard {...item} />}
        onAddButtonPress={() => navigation.navigate('FamilyMemberForm', { isEdit: false })}
        additionButtonText="Add family member"
      />
    </MedicalHistoryUnitLayout>
  );
};
