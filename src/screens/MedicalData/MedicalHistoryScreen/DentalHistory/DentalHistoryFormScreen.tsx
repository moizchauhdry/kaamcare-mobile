import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from 'components/Layouts/ScreenModalLayout/ScreenModalLayout';
import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';
import { useMutationDentalHistoryAdd } from 'hooks/query/medicalHistory/dentalHistory/useMutationDentalHistoryAdd';
import { useQueryDentalHistorySingle } from 'hooks/query/medicalHistory/dentalHistory/useQueryDentalHistorySingle';
import { useMutationDentalHistoryUpdate } from 'hooks/query/medicalHistory/dentalHistory/useMutationDentalHistoryUpdate';
import { useMutationDentalHistoryDelete } from 'hooks/query/medicalHistory/dentalHistory/useMutationDentalHistoryDelete';
import { DentalHistoryForm } from 'components/Forms/MedicalHistory/DentalHistory/DentalHistoryForm';
import { parseDentalHistoryApiToFormData } from 'model/parsers/medicalHistory/DentalHistoryParser';
import type { NewDentalHistory } from 'model/api/medicalHistory/DentalHistory';

import { dentalHistoryTypeFromSectionName } from '../../../../constants/data/medicalHistory/dentalHistory';
import { ElementWithAttachmentDataProvider } from '../../../../context/ElementWithAttachmentDataContext';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';

type DentalHistoryFormScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'DentalHistoryForm'>;

export const DentalHistoryFormScreen = ({ route }: DentalHistoryFormScreenProps) => {
  const name = route.params?.name;
  const sectionName = route.params?.sectionName;
  const edit = route.params?.edit;
  const id = route.params?.id;
  const isCommonName = route.params?.isCommonName;
  const dentalType = dentalHistoryTypeFromSectionName[sectionName!]!;
  const initialValues = useQueryDentalHistorySingle(sectionName!, id, edit);
  const mutationAdd = useMutationDentalHistoryAdd(sectionName!);
  const mutationUpdate = useMutationDentalHistoryUpdate(id!, sectionName!, initialValues);
  const mutationDelete = useMutationDentalHistoryDelete(id!, sectionName!, name);
  const isPending = mutationAdd.isPending || mutationUpdate.isPending || mutationDelete.isPending;

  const handleSubmit = (data: NewDentalHistory) =>
    edit && initialValues
      ? mutationUpdate.mutate({ ...initialValues, ...data, isCommonName: true })
      : mutationAdd.mutate({ ...data, name: name!, isCommonName });

  return (
    <ScreenModalLayout title={name!} isScrollable>
      <ElementWithAttachmentDataProvider
        sectionName="dental-history"
        elementId={id!}
        keyList={[QUERY_KEYS.MEDICAL_HISTORY_DENTAL_HISTORY_LIST_GET]}
      >
        <DentalHistoryForm
          initialValues={initialValues ? parseDentalHistoryApiToFormData(initialValues) : undefined}
          onSubmit={handleSubmit}
          deletionData={{
            onDelete: () => mutationDelete.mutate(id!),
            listName: 'Dental History Diagnosis',
            title: name!,
          }}
          edit={edit}
          name={name!}
          type={dentalType}
          isPending={isPending}
        />
      </ElementWithAttachmentDataProvider>
    </ScreenModalLayout>
  );
};
