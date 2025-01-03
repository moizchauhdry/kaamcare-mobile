import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { MedicalHistoryUnitList } from '../../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitList';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { MedicalHistoryUnitLayout } from '../../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitLayout';
import { useQueryFamilyMember } from '../../../../../hooks/query/medicalHistory/familyHistory/useQueryFamilyMember';
import { DiagnosisCard } from '../../../../../components/DataDisplay/AddMedicalData/MedicalHistory/DiagnosisCard/DiagnosisCard';
import { useQueryFamilyMemberData } from '../../../../../hooks/query/medicalHistory/familyHistory/useQueryFamilyMemberData';
import type { FamilyMemberDiagnosisModel } from '../../../../../model/api/medicalHistory/FamilyHistory';
import { parseFamilyMemberDiagnosisValues } from '../../../../../model/parsers/medicalHistory/FamilyHistoryParser';
import { useQueryFamilyMembersDiagnosisList } from '../../../../../hooks/query/medicalHistory/familyHistory/useQueryFamilyMembersDiagnosisList';
import { capitalize } from '../../../../../utils/string/string';

type FamilyHistoryMemberScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'FamilyHistoryMember'>;

export const FamilyHistoryMemberScreen = ({ navigation, route }: FamilyHistoryMemberScreenProps) => {
  const { name, id } = route.params;
  const data = useQueryFamilyMember(id, true);
  const { data: diagnosisData = [] } = useQueryFamilyMembersDiagnosisList();
  const diagnosis = useQueryFamilyMemberData(id!, diagnosisData);
  const properName = name || data?.familyMemberName || data?.relationshipName;
  const renderItem = (item: FamilyMemberDiagnosisModel) => {
    const values = parseFamilyMemberDiagnosisValues(item.values);

    return (
      <DiagnosisCard
        onPress={() =>
          navigation.navigate('FamilyHistoryDiagnosisForm', {
            edit: true,
            id: item.id,
            name: values.name!,
            userId: data?.id!,
            type: item.formType,
          })
        }
        {...item}
        name={values.name!}
        explanation={values.explanation}
      />
    );
  };

  return (
    <MedicalHistoryUnitLayout
      title={capitalize(properName ?? '')}
      editable
      onEditablePress={() =>
        navigation.navigate('FamilyMemberForm', { name: capitalize(properName ?? ''), id, isEdit: true })
      }
    >
      <MedicalHistoryUnitList
        data={diagnosis ?? []}
        renderItem={({ item }) => renderItem(item)}
        onAddButtonPress={() => navigation.navigate('FamilyHistorySelectMedicalHistory', { id: id! })}
        additionButtonText="Add history"
      />
    </MedicalHistoryUnitLayout>
  );
};
