import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { MoreLayout } from 'components/Layouts/MoreLayout/MoreLayout';

import { PharmacyForm } from '../../../components/Forms/PharmacyForm/PharmacyForm';
import { useQueryPharmacy } from '../../../hooks/query/profile/useQueryPharmacy';
import { parsePharmacyApiToFormData, parsePharmacyFormToApiData } from '../../../model/parsers/profile/PharmacyParser';
import type { MoreNavigationParamsList } from '../../../components/Navigation/MoreNavigation';
import { useMutationPharmacy } from '../../../hooks/query/profile/useMutationPharmacy';
import { WithSkeleton } from '../../../components/UI/Skeleton/WithSkeleton';
import { PharmacyFormSkeleton } from '../../../components/Forms/PharmacyForm/PharmacyFormSkeleton';

type PharmacyScreenProps = NativeStackScreenProps<MoreNavigationParamsList, 'Pharmacy'>;

export const PharmacyScreen = ({ route, navigation }: PharmacyScreenProps) => {
  const edit = route.params?.edit;
  const { data, isLoading } = useQueryPharmacy({
    retry: false,
  });
  const isEdit = edit || data?.isCreated;
  const { mutate, isPending } = useMutationPharmacy(isEdit, {
    onSettled: () => navigation.navigate('MyProfile'),
  });

  return (
    <MoreLayout title="Pharmacy">
      <WithSkeleton isLoading={isLoading && Boolean(edit)} skeleton={<PharmacyFormSkeleton />}>
        <PharmacyForm
          onSubmit={(formValues) => mutate(parsePharmacyFormToApiData(formValues))}
          edit={isEdit}
          initialValues={data ? parsePharmacyApiToFormData(data) : undefined}
          isPending={isPending}
        />
      </WithSkeleton>
    </MoreLayout>
  );
};
