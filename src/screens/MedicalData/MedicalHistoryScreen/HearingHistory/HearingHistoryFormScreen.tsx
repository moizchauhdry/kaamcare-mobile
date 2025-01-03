import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from 'components/Layouts/ScreenModalLayout/ScreenModalLayout';
import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';

import type { NewHearingHistory } from '../../../../model/api/medicalHistory/HearingHistory';
import { useQueryHearingHistorySingle } from '../../../../hooks/query/medicalHistory/hearingHistory/useQueryHearingHistorySingle';
import { useMutationHearingHistoryAdd } from '../../../../hooks/query/medicalHistory/hearingHistory/useMutationHearingHistoryAdd';
import { useMutationHearingHistoryUpdate } from '../../../../hooks/query/medicalHistory/hearingHistory/useMutationHearingHistoryUpdate';
import { useMutationHearingHistoryDelete } from '../../../../hooks/query/medicalHistory/hearingHistory/useMutationHearingHistoryDelete';
import { HearingHistoryForm } from '../../../../components/Forms/MedicalHistory/HearingHistory/HearingHistoryForm';
import { parseHearingHistoryApiToFormData } from '../../../../model/parsers/medicalHistory/HearingHistoryParser';
import { ElementWithAttachmentDataProvider } from '../../../../context/ElementWithAttachmentDataContext';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { hearingHistoryApiNames } from '../../../../constants/data/medicalHistory/hearingHistory';

type HearingHistoryFormScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'HearingHistoryForm'>;

export const HearingHistoryFormScreen = ({ route }: HearingHistoryFormScreenProps) => {
  const name = route.params?.name;
  const sectionName = route.params?.sectionName;
  const edit = route.params?.edit;
  const id = route.params?.id;
  const isCommonName = route.params?.isCommonName;
  const initialValues = useQueryHearingHistorySingle(sectionName!, id, edit);
  const mutationAdd = useMutationHearingHistoryAdd(sectionName!);
  const mutationUpdate = useMutationHearingHistoryUpdate(id!, sectionName!, initialValues);
  const mutationDelete = useMutationHearingHistoryDelete(id!, sectionName!, name);
  const handleSubmit = (data: NewHearingHistory) =>
    edit && initialValues
      ? mutationUpdate.mutate({ ...initialValues, ...data, isCommonName: true })
      : mutationAdd.mutate({ ...data, name: name!, isCommonName });
  const isLoading = mutationAdd.isPending || mutationDelete.isPending || mutationUpdate.isPending;

  return (
    <ScreenModalLayout title={name!} isScrollable>
      <ElementWithAttachmentDataProvider
        sectionName="hearing"
        elementId={id!}
        keyList={[QUERY_KEYS.MEDICAL_HISTORY_HEARING_HISTORY_ALL_LIST_GET]}
        sectionTypeName={hearingHistoryApiNames[sectionName!]}
      >
        <HearingHistoryForm
          initialValues={initialValues ? parseHearingHistoryApiToFormData(initialValues) : undefined}
          onSubmit={handleSubmit}
          deletionData={{
            onDelete: () => mutationDelete.mutate(id!),
            listName: 'Hearing History',
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
