import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { EmergencyContactForm } from 'components/Forms/EmergencyContactForm/EmergencyContactForm';
import { useQueryGetEmergencyContact } from 'hooks/query/profile/useQueryGetEmergencyContact';
import { MoreLayout } from 'components/Layouts/MoreLayout/MoreLayout';

import { useMutationPutEmergencyContact } from '../../../hooks/query/profile/useMutationPutEmergencyContact';
import {
  parseEmergencyContactApiToFormData,
  parseEmergencyContactFormToApiData,
} from '../../../model/parsers/profile/EmergencyContactParser';
import type { MoreNavigationParamsList } from '../../../components/Navigation/MoreNavigation';
import { WithSkeleton } from '../../../components/UI/Skeleton/WithSkeleton';
import { FormSkeleton } from '../../../components/Forms/FormSkeleton';

type EmergencyContactScreenProps = NativeStackScreenProps<MoreNavigationParamsList, 'EmergencyContact'>;

export const EmergencyContactScreen = ({ route, navigation }: EmergencyContactScreenProps) => {
  const edit = route.params?.edit;
  const { data, isLoading } = useQueryGetEmergencyContact();
  const isEdit = edit || data?.isCreated;
  const { mutate, isPending } = useMutationPutEmergencyContact(isEdit, {
    onSettled: () => navigation.navigate('MyProfile'),
  });

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <MoreLayout title="Emergency Contact">
        <WithSkeleton isLoading={isLoading} skeleton={<FormSkeleton />}>
          <EmergencyContactForm
            edit={isEdit}
            initialValues={data ? parseEmergencyContactApiToFormData(data) : undefined}
            onSubmit={(values) => mutate(parseEmergencyContactFormToApiData(values))}
            isPending={isPending}
          />
        </WithSkeleton>
      </MoreLayout>
    </TouchableWithoutFeedback>
  );
};
