import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from 'components/Layouts/ScreenModalLayout/ScreenModalLayout';
import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';

import { useMutationVisionHistoryAdd } from '../../../../hooks/query/medicalHistory/visionHistory/useMutationVisionHistoryAdd';
import { useMutationVisionHistoryUpdate } from '../../../../hooks/query/medicalHistory/visionHistory/useMutationVisionHistoryUpdate';
import { useMutationVisionHistoryDelete } from '../../../../hooks/query/medicalHistory/visionHistory/useMutationVisionHistoryDelete';
import { useQueryVisionHistorySingle } from '../../../../hooks/query/medicalHistory/visionHistory/useQueryVisionHistorySingle';
import type { NewVisionHistoryModel } from '../../../../model/api/medicalHistory/VisionHistory';
import { VisionHistoryForm } from '../../../../components/Forms/MedicalHistory/VisionHistory/VisionHistoryForm';
import { parseVisionHistoryApiToFormData } from '../../../../model/parsers/medicalHistory/VisionHistoryParser';
import { ElementWithAttachmentDataProvider } from '../../../../context/ElementWithAttachmentDataContext';
import { QUERY_KEYS } from '../../../../constants/query/queryKeys';
import { visionHistoryApiNames } from '../../../../constants/data/medicalHistory/visionHistory';

type VisionHistoryFormScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'VisionHistoryForm'>;

export const VisionHistoryFormScreen = ({ route }: VisionHistoryFormScreenProps) => {
  const name = route.params?.name;
  const sectionName = route.params?.sectionName;
  const edit = route.params?.edit;
  const id = route.params?.id;
  const isCommonName = route.params?.isCommonName;
  const initialValues = useQueryVisionHistorySingle(sectionName!, id, edit);
  const mutationAdd = useMutationVisionHistoryAdd(sectionName!);
  const mutationUpdate = useMutationVisionHistoryUpdate(id!, sectionName!, initialValues);
  const mutationDelete = useMutationVisionHistoryDelete(id!, sectionName!, name);
  const isPending = mutationAdd.isPending || mutationDelete.isPending || mutationUpdate.isPending;

  const handleSubmit = (data: NewVisionHistoryModel) =>
    edit && initialValues
      ? mutationUpdate.mutate({ ...initialValues, ...data, isCommonName: true })
      : mutationAdd.mutate({ ...data, isCommonName });

  return (
    <ScreenModalLayout title={name!} isScrollable>
      <ElementWithAttachmentDataProvider
        sectionName="vision"
        elementId={id!}
        sectionTypeName={visionHistoryApiNames[sectionName!]}
        keyList={[QUERY_KEYS.MEDICAL_HISTORY_VISION_HISTORY_ALL_LIST_GET]}
      >
        <VisionHistoryForm
          initialValues={initialValues ? parseVisionHistoryApiToFormData(initialValues) : undefined}
          onSubmit={handleSubmit}
          deletionData={{
            onDelete: () => mutationDelete.mutate(id!),
            listName: 'Vision history',
            title: name!,
          }}
          edit={edit}
          sectionName={sectionName}
          name={name!}
          isPending={isPending}
        />
      </ElementWithAttachmentDataProvider>
    </ScreenModalLayout>
  );
};
