import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { CaregiverForm } from 'components/Forms/CaregiverForm/CaregiverForm';
import { MoreLayout } from 'components/Layouts/MoreLayout/MoreLayout';

import { WithSkeleton } from '../../../components/UI/Skeleton/WithSkeleton';
import { FormSkeleton } from '../../../components/Forms/FormSkeleton';
import type { MoreNavigationParamsList } from '../../../components/Navigation/MoreNavigation';
import { useQueryCaregiverGet } from '../../../hooks/query/profile/useQueryCaregiverGet';
import { useMutationCaregiver } from '../../../hooks/query/profile/useMutationCaregiver';
import {
  parseCaregiverApiToFormData,
  parseCaregiverFormToApiData,
} from '../../../model/parsers/profile/CaregiverParser';

type CaregiverScreenProps = NativeStackScreenProps<MoreNavigationParamsList, 'Caregiver'>;

export const CaregiverScreen = ({ route, navigation }: CaregiverScreenProps) => {
  const edit = route.params?.edit;
  const { data, isLoading } = useQueryCaregiverGet();
  const isEdit = edit || data?.isCreated;
  const { mutate, isPending } = useMutationCaregiver(isEdit, {
    onSettled: () => navigation.navigate('MyProfile'),
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <MoreLayout title="Caregiver">
        <WithSkeleton isLoading={isLoading} skeleton={<FormSkeleton />}>
          <CaregiverForm
            edit={isEdit}
            initialValues={data ? parseCaregiverApiToFormData(data) : undefined}
            onSubmit={(values) => mutate(parseCaregiverFormToApiData(values))}
            isPending={isPending}
          />
        </WithSkeleton>
      </MoreLayout>
    </TouchableWithoutFeedback>
  );
};
