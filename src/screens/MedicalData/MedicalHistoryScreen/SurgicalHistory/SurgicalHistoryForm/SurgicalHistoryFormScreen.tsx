import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { useQuerySurgicalHistory } from 'hooks/query/medicalHistory/surgicalHistory/useQuerySurgicalHistory';
import { useMutationSurgicalHistoryDelete } from 'hooks/query/medicalHistory/surgicalHistory/useMutationSurgicalHistoryDelete';
import { useMutationSurgicalHistoryUpdate } from 'hooks/query/medicalHistory/surgicalHistory/useMutationSurgicalHistoryUpdate';
import { useMutationSurgicalHistoryAdd } from 'hooks/query/medicalHistory/surgicalHistory/useMutationSurgicalHistoryAdd';

import { ScreenModalLayout } from '../../../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { SurgicalHistoryForm } from '../../../../../components/Forms/MedicalHistory/SurgicalHistory/SurgicalHistoryForm';
import type { NewSurgicalHistory } from '../../../../../model/api/medicalHistory/SurgicalHistory';
import { parseSurgicalHistoryApiToFormData } from '../../../../../model/parsers/medicalHistory/SurgicalHistoryParser';
import { ElementWithAttachmentDataProvider } from '../../../../../context/ElementWithAttachmentDataContext';
import { QUERY_KEYS } from '../../../../../constants/query/queryKeys';

type SurgicalHistoryFormScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'SurgicalHistoryForm'>;

export const SurgicalHistoryFormScreen = ({ route }: SurgicalHistoryFormScreenProps) => {
  const { name, edit, id, isCommonName } = route.params;

  const data = useQuerySurgicalHistory(id, edit);
  const mutateDelete = useMutationSurgicalHistoryDelete(id!, name);
  const mutateUpdate = useMutationSurgicalHistoryUpdate(data);
  const mutateAdd = useMutationSurgicalHistoryAdd();
  const isPending = mutateAdd.isPending || mutateDelete.isPending || mutateUpdate.isPending;

  const handleSubmit = (values: NewSurgicalHistory) => {
    if (edit && data) {
      mutateUpdate.mutate({
        ...data,
        ...values,
        isCommonName: true,
      });

      return;
    }

    mutateAdd.mutate({ ...values, name, isCommonName });
  };

  return (
    <ScreenModalLayout title={name} isScrollable>
      <ElementWithAttachmentDataProvider
        sectionName="surgical-history"
        elementId={id!}
        keyList={[QUERY_KEYS.MEDICAL_HISTORY_SURGICAL_HISTORY_LIST_GET]}
      >
        <SurgicalHistoryForm
          onDelete={() => mutateDelete.mutate(id!)}
          onSubmit={handleSubmit}
          edit={edit}
          name={name}
          initialValues={data ? parseSurgicalHistoryApiToFormData(data) : undefined}
          isPending={isPending}
        />
      </ElementWithAttachmentDataProvider>
    </ScreenModalLayout>
  );
};
