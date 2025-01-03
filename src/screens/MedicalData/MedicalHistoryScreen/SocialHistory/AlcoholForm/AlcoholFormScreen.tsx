import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from 'components/Layouts/ScreenModalLayout/ScreenModalLayout';

import { useMutationSocialHistoryAdd } from '../../../../../hooks/query/medicalHistory/socialHistory/useMutationSocialHistoryAdd';
import { useMutationSocialHistoryUpdate } from '../../../../../hooks/query/medicalHistory/socialHistory/useMutationSocialHistoryUpdate';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { useQuerySocialHistorySingle } from '../../../../../hooks/query/medicalHistory/socialHistory/useQuerySocialHistorySingle';
import { parseSocialHistoryAlcoholApiToFormData } from '../../../../../model/parsers/medicalHistory/SocialHistoryParser';
import { useMutationSocialHistoryDelete } from '../../../../../hooks/query/medicalHistory/socialHistory/useMutationSocialHistoryDelete';
import { AlcoholForm } from '../../../../../components/Forms/MedicalHistory/SocialHistory/AlcoholForm/AlcoholForm';
import type { NewSocialHistory } from '../../../../../model/api/medicalHistory/SocialHistory';

type SmokingFormScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'SocialHistoryAlcoholForm'>;

export const AlcoholFormScreen = ({ route }: SmokingFormScreenProps) => {
  const { edit, id } = route.params;
  const { data } = useQuerySocialHistorySingle('alcohol', id);
  const mutationAdd = useMutationSocialHistoryAdd('alcohol');
  const mutationUpdate = useMutationSocialHistoryUpdate(id!, 'alcohol');
  const mutationDelete = useMutationSocialHistoryDelete(id!, 'alcohol');
  const isPending = mutationAdd.isPending || mutationUpdate.isPending || mutationDelete.isPending;

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

    mutationAdd.mutate({ ...values, group: 'Alcohol' });
  };

  return (
    <ScreenModalLayout title="Alcohol" isScrollable>
      <AlcoholForm
        onDelete={() => mutationDelete.mutate(id!)}
        onSubmit={handleSubmit}
        edit={edit}
        initialValues={data ? parseSocialHistoryAlcoholApiToFormData(data) : undefined}
        isPending={isPending}
      />
    </ScreenModalLayout>
  );
};
