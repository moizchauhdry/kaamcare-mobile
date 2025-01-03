import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from 'components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { SmokingForm } from 'components/Forms/MedicalHistory/SocialHistory/SmokingForm/SmokingForm';

import { useMutationSocialHistoryAdd } from '../../../../../hooks/query/medicalHistory/socialHistory/useMutationSocialHistoryAdd';
import { useMutationSocialHistoryUpdate } from '../../../../../hooks/query/medicalHistory/socialHistory/useMutationSocialHistoryUpdate';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { useQuerySocialHistorySingle } from '../../../../../hooks/query/medicalHistory/socialHistory/useQuerySocialHistorySingle';
import { parseSocialHistorySmokingApiToFormData } from '../../../../../model/parsers/medicalHistory/SocialHistoryParser';
import { useMutationSocialHistoryDelete } from '../../../../../hooks/query/medicalHistory/socialHistory/useMutationSocialHistoryDelete';
import type { NewSocialHistory } from '../../../../../model/api/medicalHistory/SocialHistory';

type SmokingFormScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'SocialHistorySmokingForm'>;

export const SmokingFormScreen = ({ route }: SmokingFormScreenProps) => {
  const { edit, id } = route.params;
  const { data } = useQuerySocialHistorySingle('smoking', id);
  const mutationAdd = useMutationSocialHistoryAdd('smoking');
  const mutationUpdate = useMutationSocialHistoryUpdate(id!, 'smoking');
  const mutationDelete = useMutationSocialHistoryDelete(id!, 'smoking');
  const isPending = mutationAdd.isPending || mutationDelete.isPending || mutationUpdate.isPending;

  const handleSubmit = (values: NewSocialHistory, editFromType?: boolean, idFromType?: string) => {
    if (editFromType && idFromType) {
      mutationUpdate.mutate({
        id: idFromType,
        ...values,
      });

      return;
    }

    if (edit && data) {
      mutationUpdate.mutate({
        ...data,
        ...values,
      });

      return;
    }

    mutationAdd.mutate({ ...values, group: 'Smoking' });
  };

  return (
    <ScreenModalLayout title="Smoking" isScrollable>
      <SmokingForm
        onDelete={() => mutationDelete.mutate(id!)}
        onSubmit={handleSubmit}
        edit={edit}
        initialValues={data ? parseSocialHistorySmokingApiToFormData(data) : undefined}
        isPending={isPending}
      />
    </ScreenModalLayout>
  );
};
