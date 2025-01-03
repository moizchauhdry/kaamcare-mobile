import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from 'components/Layouts/ScreenModalLayout/ScreenModalLayout';
import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';

import { useQueryDiagnosis } from '../../../../../hooks/query/medicalHistory/diagnosis/useQueryDiagnosis';
import { useMutationDiagnosisAdd } from '../../../../../hooks/query/medicalHistory/diagnosis/useMutationDiagnosisAdd';
import { useMutationDiagnosisUpdate } from '../../../../../hooks/query/medicalHistory/diagnosis/useMutationDiagnosisUpdate';
import { useMutationDiagnosisDelete } from '../../../../../hooks/query/medicalHistory/diagnosis/useMutationDiagnosisDelete';
import type { NewDiagnosis } from '../../../../../model/api/medicalHistory/Diagnosis';
import { parseDiagnosisHistoryApiToFormData } from '../../../../../model/parsers/medicalHistory/DiagnosisParser';
import { DiagnosisForm } from '../../../../../components/Forms/MedicalHistory/Diagnosis/DiagnosisForm';
import { QUERY_KEYS } from '../../../../../constants/query/queryKeys';
import { ElementWithAttachmentDataProvider } from '../../../../../context/ElementWithAttachmentDataContext';

type HearingHistoryFormScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'DiagnosisForm'>;

export const DiagnosisFormScreen = ({ route }: HearingHistoryFormScreenProps) => {
  const name = route.params?.name;
  const edit = route.params?.edit;
  const id = route.params?.id;
  const isCommonName = route.params?.isCommonName;
  const data = useQueryDiagnosis(id);
  const mutationAdd = useMutationDiagnosisAdd();
  const mutationUpdate = useMutationDiagnosisUpdate(id!);
  const mutationDelete = useMutationDiagnosisDelete(id!);
  const handleSubmit = (newData: NewDiagnosis) =>
    edit && data
      ? mutationUpdate.mutate({ ...data, ...newData, isCommonName: true })
      : mutationAdd.mutate({ ...newData, name: name!, isCommonName });
  const isLoading = mutationAdd.isPending || mutationDelete.isPending || mutationUpdate.isPending;

  return (
    <ScreenModalLayout title={name!} isScrollable>
      <ElementWithAttachmentDataProvider
        sectionName="diagnosis"
        elementId={id!}
        keyList={[QUERY_KEYS.MEDICAL_HISTORY_DIAGNOSIS_LIST_GET]}
      >
        <DiagnosisForm
          initialValues={data ? parseDiagnosisHistoryApiToFormData(data) : undefined}
          onSubmit={handleSubmit}
          deletionData={{
            onDelete: () => mutationDelete.mutate(id!),
            listName: 'Diagnosis History',
            title: name!,
          }}
          edit={edit}
          name={name!}
          isLoading={isLoading}
        />
      </ElementWithAttachmentDataProvider>
    </ScreenModalLayout>
  );
};
