import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from 'components/Layouts/ScreenModalLayout/ScreenModalLayout';

import { useMutationSocialHistoryAdd } from '../../../../../hooks/query/medicalHistory/socialHistory/useMutationSocialHistoryAdd';
import { useMutationSocialHistoryUpdate } from '../../../../../hooks/query/medicalHistory/socialHistory/useMutationSocialHistoryUpdate';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { useQuerySocialHistorySingle } from '../../../../../hooks/query/medicalHistory/socialHistory/useQuerySocialHistorySingle';
import { parseSocialHistoryDrugUseApiToFormData } from '../../../../../model/parsers/medicalHistory/SocialHistoryParser';
import { useMutationSocialHistoryDelete } from '../../../../../hooks/query/medicalHistory/socialHistory/useMutationSocialHistoryDelete';
import { DrugUseForm } from '../../../../../components/Forms/MedicalHistory/SocialHistory/DrugUseForm/DrugUseForm';
import type { NewSocialHistory } from '../../../../../model/api/medicalHistory/SocialHistory';

type DrugFormScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'SocialHistoryDrugForm'>;

export const DrugFormScreen = ({ route }: DrugFormScreenProps) => {
  const { edit, id } = route.params;
  const { data } = useQuerySocialHistorySingle('recreationalDrugUse', id);
  const mutationAdd = useMutationSocialHistoryAdd('recreationalDrugUse');
  const mutationUpdate = useMutationSocialHistoryUpdate(id!, 'recreationalDrugUse');
  const mutationDelete = useMutationSocialHistoryDelete(id!, 'recreationalDrugUse');
  const isPending = mutationAdd.isPending || mutationDelete.isPending || mutationUpdate.isPending;

  const handleSubmit = (values: NewSocialHistory) => {
    if (edit && data) {
      mutationUpdate.mutate({
        ...data,
        ...values,
      });

      return;
    }

    mutationAdd.mutate({ ...values, group: 'RecreationalDrugUse' });
  };

  return (
    <ScreenModalLayout title="Recreational drug use" isScrollable>
      <DrugUseForm
        onDelete={() => mutationDelete.mutate(id)}
        onSubmit={handleSubmit}
        edit={edit}
        initialValues={data ? parseSocialHistoryDrugUseApiToFormData(data) : undefined}
        isPending={isPending}
      />
    </ScreenModalLayout>
  );
};
