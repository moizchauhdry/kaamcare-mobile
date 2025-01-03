import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from 'components/Layouts/ScreenModalLayout/ScreenModalLayout';
import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';

import { QUERY_KEYS } from '../../../../../constants/query/queryKeys';
import { ElementWithAttachmentDataProvider } from '../../../../../context/ElementWithAttachmentDataContext';
import { useQueryScreeningExam } from '../../../../../hooks/query/primaryPrevention/screeningExams/useQueryScreeningExam';
import { useMutationScreeningExamAdd } from '../../../../../hooks/query/primaryPrevention/screeningExams/useMutationScreeningExamAdd';
import { useMutationScreeningExamUpdate } from '../../../../../hooks/query/primaryPrevention/screeningExams/useMutationScreeningExamUpdate';
import { useMutationScreeningExamDelete } from '../../../../../hooks/query/primaryPrevention/screeningExams/useMutationScreeningExamDelete';
import type { ScreeningExamFormData } from '../../../../../schemas/forms/primaryPrevention/screeningExam';
import { ScreeningExamForm } from '../../../../../components/Forms/PrimaryPrevention/ScreeningExam/ScreeningExamForm';
import {
  parseScreeningExamFormToApiData,
  parseScreeningExamApiToFormData,
} from '../../../../../model/parsers/primaryPrevention/ScreeningExamParser';

type ScreeningExamFormScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'ScreeningExamForm'>;

export const ScreeningExamFormScreen = ({ route }: ScreeningExamFormScreenProps) => {
  const { id } = route.params;
  const name = route.params?.name;
  const edit = route.params?.edit;

  const { data = null } = useQueryScreeningExam(id!);
  const mutationAdd = useMutationScreeningExamAdd();
  const mutationUpdate = useMutationScreeningExamUpdate(id!, data);
  const mutationDelete = useMutationScreeningExamDelete(id!, name);

  const isPending = mutationAdd.isPending || mutationUpdate.isPending || mutationDelete.isPending;

  const handleSubmit = (newData: ScreeningExamFormData) => {
    const properValue = parseScreeningExamFormToApiData(newData, name, true);

    if (data && edit) {
      mutationUpdate.mutate({ ...data, ...properValue, id: id! });
      return;
    }

    mutationAdd.mutate({ ...properValue });
  };

  return (
    <ScreenModalLayout title={name!} isScrollable>
      <ElementWithAttachmentDataProvider
        sectionName="screening-exams"
        name="primary-prevention"
        elementId={id!}
        keyList={[QUERY_KEYS.PRIMARY_PREVENTION_SCREENING_EXAMS_LIST_GET]}
      >
        <ScreeningExamForm
          initialValues={data ? parseScreeningExamApiToFormData(data) : undefined}
          onSubmit={handleSubmit}
          deletionData={{
            onDelete: () => mutationDelete.mutate(id!),
            listName: 'ScreeningExams',
            title: 'ScreeningExam',
          }}
          edit={edit}
          isPending={isPending}
        />
      </ElementWithAttachmentDataProvider>
    </ScreenModalLayout>
  );
};
