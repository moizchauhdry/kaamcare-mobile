import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { ScreenModalLayout } from '../../../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { DiagnosisForm } from '../../../../../components/Forms/MedicalHistory/Diagnosis/DiagnosisForm';
import { DentalHistoryForm } from '../../../../../components/Forms/MedicalHistory/DentalHistory/DentalHistoryForm';
import { VisionHistoryForm } from '../../../../../components/Forms/MedicalHistory/VisionHistory/VisionHistoryForm';
import { HearingHistoryForm } from '../../../../../components/Forms/MedicalHistory/HearingHistory/HearingHistoryForm';
import { useQueryFamilyMemberSingleDiagnosis } from '../../../../../hooks/query/medicalHistory/familyHistory/useQueryFamilyMemberSingleDiagnosis';
import {
  parseFamilyMemberDiagnosisFormToApiData,
  parseFamilyMemberDiagnosisToFormData,
} from '../../../../../model/parsers/medicalHistory/FamilyHistoryParser';
import type { NewDentalHistory } from '../../../../../model/api/medicalHistory/DentalHistory';
import type { NewVisionHistoryModel } from '../../../../../model/api/medicalHistory/VisionHistory';
import type { NewHearingHistory } from '../../../../../model/api/medicalHistory/HearingHistory';
import type { NewDiagnosis } from '../../../../../model/api/medicalHistory/Diagnosis';
import { useMutationFamilyMemberDiagnosisAdd } from '../../../../../hooks/query/medicalHistory/familyHistory/useMutationFamilyMemberDiagnosisAdd';
import { useMutationFamilyMemberDiagnosisUpdate } from '../../../../../hooks/query/medicalHistory/familyHistory/useMutationFamilyMemberDiagnosisUpdate';
import { useMutationFamilyMemberDiagnosisDelete } from '../../../../../hooks/query/medicalHistory/familyHistory/useMutationFamilyMemberDiagnosisDelete';
import { QUERY_KEYS } from '../../../../../constants/query/queryKeys';
import { ElementWithAttachmentDataProvider } from '../../../../../context/ElementWithAttachmentDataContext';

type FamilyHistoryDiagnosisFormScreenProps = NativeStackScreenProps<
  AddMedicalDataNavigationParamsList,
  'FamilyHistoryDiagnosisForm'
>;

const FORM = {
  StandardDiagnosis: DiagnosisForm,
  DentalDiagnosis: DentalHistoryForm,
  VisionDiagnosis: VisionHistoryForm,
  HearingDiagnosis: HearingHistoryForm,
};

export const FamilyHistoryDiagnosisFormScreen = ({ route }: FamilyHistoryDiagnosisFormScreenProps) => {
  const { name, id, userId, type, edit, isCommonName } = route.params;
  const Component = FORM[type];
  const data = useQueryFamilyMemberSingleDiagnosis(userId, id, type);
  const initialValues = data ? parseFamilyMemberDiagnosisToFormData(data) : undefined;
  const mutationAdd = useMutationFamilyMemberDiagnosisAdd(userId, type);
  const mutationUpdate = useMutationFamilyMemberDiagnosisUpdate(userId, id, type, initialValues);
  const mutationDelete = useMutationFamilyMemberDiagnosisDelete(userId, id, type);
  const isLoading = mutationDelete.isPending || mutationUpdate.isPending || mutationAdd.isPending;

  const handleSubmit = (newData: NewDentalHistory | NewVisionHistoryModel | NewHearingHistory | NewDiagnosis) => {
    const parsedData = parseFamilyMemberDiagnosisFormToApiData(edit ? newData : { ...initialValues, ...newData }, name);

    return edit && initialValues
      ? mutationUpdate.mutate({
          ...initialValues,
          ...parsedData,
          id: data?.id,
          familyMemberId: userId,
          formType: type,
          isCommonName: true,
        })
      : mutationAdd.mutate({ ...parsedData, familyMemberId: userId, formType: type, isCommonName });
  };

  return (
    <ScreenModalLayout title={name!} isScrollable>
      <ElementWithAttachmentDataProvider
        sectionName="family-history"
        elementId={id!}
        keyList={[QUERY_KEYS.MEDICAL_HISTORY_FAMILY_HISTORY_DIAGNOSIS_LIST_GET]}
      >
        <Component
          edit={edit}
          isPending={isLoading}
          isLoading={mutationDelete.isPending || mutationUpdate.isPending || mutationAdd.isPending}
          onSubmit={handleSubmit}
          name={name!}
          type="Diagnosis"
          initialValues={initialValues}
          deletionData={{
            title: name,
            listName: 'Family Member Diagnosis',
            onDelete: () => mutationDelete.mutate(id),
          }}
        />
      </ElementWithAttachmentDataProvider>
    </ScreenModalLayout>
  );
};
