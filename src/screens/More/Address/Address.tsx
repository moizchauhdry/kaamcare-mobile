import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { MoreLayout } from 'components/Layouts/MoreLayout/MoreLayout';

import { AddressForm } from '../../../components/Forms/AddressForm/AddressForm';
import { WithSkeleton } from '../../../components/UI/Skeleton/WithSkeleton';
import { useQueryAddressInformation } from '../../../hooks/query/profile/useQueryAddressInformation';
import { FormSkeleton } from '../../../components/Forms/FormSkeleton';
import {
  parseAddressInformationApiToFormData,
  parseAddressInformationFormToApiData,
} from '../../../model/parsers/profile/AddressInformationParser';
import { useMutationAddressInformation } from '../../../hooks/query/profile/useMutationAddressInformation';
import type { MoreNavigationParamsList } from '../../../components/Navigation/MoreNavigation';

type AddressScreenProps = NativeStackScreenProps<MoreNavigationParamsList, 'Address'>;

export const AddressScreen = ({ route, navigation }: AddressScreenProps) => {
  const edit = route.params?.edit;
  const { data, isLoading } = useQueryAddressInformation();
  const isEdit = edit || data?.isCreated;
  const { mutate, isPending } = useMutationAddressInformation(isEdit, {
    onSettled: () => navigation.navigate('MyProfile'),
  });

  return (
    <MoreLayout title="Address">
      <WithSkeleton isLoading={isLoading} skeleton={<FormSkeleton />}>
        <AddressForm
          onSubmit={(formValues) => mutate(parseAddressInformationFormToApiData(formValues))}
          initialValues={data ? parseAddressInformationApiToFormData(data) : undefined}
          edit={isEdit}
          isPending={isPending}
        />
      </WithSkeleton>
    </MoreLayout>
  );
};
