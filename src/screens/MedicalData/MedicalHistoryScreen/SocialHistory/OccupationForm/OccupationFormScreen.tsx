import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from 'components/Layouts/ScreenModalLayout/ScreenModalLayout';

import { useMutationSocialHistoryAdd } from '../../../../../hooks/query/medicalHistory/socialHistory/useMutationSocialHistoryAdd';
import { useMutationSocialHistoryUpdate } from '../../../../../hooks/query/medicalHistory/socialHistory/useMutationSocialHistoryUpdate';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { useQuerySocialHistorySingle } from '../../../../../hooks/query/medicalHistory/socialHistory/useQuerySocialHistorySingle';
import { parseSocialHistorySmokingApiToFormData } from '../../../../../model/parsers/medicalHistory/SocialHistoryParser';
import { useMutationSocialHistoryDelete } from '../../../../../hooks/query/medicalHistory/socialHistory/useMutationSocialHistoryDelete';
import { OccupationForm } from '../../../../../components/Forms/MedicalHistory/SocialHistory/OccupationForm/OccupationForm';
import type { NewSocialHistory } from '../../../../../model/api/medicalHistory/SocialHistory';

type OccupationFormScreenProps = NativeStackScreenProps<
  AddMedicalDataNavigationParamsList,
  'SocialHistoryOccupationForm'
>;

export const OccupationFormScreen = ({ route }: OccupationFormScreenProps) => {
  const { edit, id } = route.params;
  const { data } = useQuerySocialHistorySingle('occupation', id);
  const mutationAdd = useMutationSocialHistoryAdd('occupation');
  const mutationUpdate = useMutationSocialHistoryUpdate(id!, 'occupation');
  const mutationDelete = useMutationSocialHistoryDelete(id!, 'occupation');
  const isPending = mutationAdd.isPending || mutationDelete.isPending || mutationUpdate.isPending;

  const handleSubmit = (values: NewSocialHistory) => {
    if (edit && data) {
      mutationUpdate.mutate({
        ...data,
        ...values,
      });

      return;
    }

    mutationAdd.mutate({ ...values, group: 'Occupation' });
  };

  return (
    <ScreenModalLayout title="Occupation" isScrollable>
      <OccupationForm
        onDelete={() => mutationDelete.mutate(id)}
        onSubmit={handleSubmit}
        edit={edit}
        initialValues={data ? parseSocialHistorySmokingApiToFormData(data) : undefined}
        isPending={isPending}
      />
    </ScreenModalLayout>
  );
};
