import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from 'components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { HealthcareProviderForm } from 'components/Forms/HealthcareProviderForm/HealthcareProviderForm';
import { useMutationHealthcareProvider } from 'hooks/query/profile/useMutationHealthcareProvider';
import {
  parseHealthcareProviderApiToFormData,
  parseHealthcareProviderFormToApiData,
} from 'model/parsers/profile/HealthcareProviderParser';
import type { HealthcareProviderFormData } from 'schemas/forms/healthcareProvider';
import { useMutationHealthcareProviderDelete } from 'hooks/query/profile/useMutationHealthcareProviderDelete';
import type { MoreNavigationParamsList } from 'components/Navigation/MoreNavigation';

import { useQueryHealthcareProvider } from '../../../hooks/query/profile/useQueryHealthcareProvider';

type HealthcareProviderScreenProps = NativeStackScreenProps<MoreNavigationParamsList, 'HealthcareProvider'>;

export const HealthcareProviderScreen = ({ route, navigation }: HealthcareProviderScreenProps) => {
  const id = route?.params?.id;
  const isPrimaryInList = route?.params?.isPrimaryInList ?? false;
  const initialData = useQueryHealthcareProvider(id!);
  const isEdit: boolean = Boolean(id) && Boolean(initialData);
  const { mutate } = useMutationHealthcareProvider(
    { edit: isEdit, id },
    {
      onSettled: () => navigation.navigate('MyProfile'),
    },
  );
  const { mutate: mutateDelete } = useMutationHealthcareProviderDelete(
    { id },
    {
      onMutate: () => navigation.navigate('MyProfile'),
    },
  );

  const handleSubmitForm = (values: HealthcareProviderFormData) => {
    mutate({ healthcareProviderId: id!, ...parseHealthcareProviderFormToApiData(values) });
  };

  return (
    <ScreenModalLayout title={`${isEdit ? 'Edit' : 'Add'} healthcare provider`} isScrollable>
      <HealthcareProviderForm
        isPrimaryInList={isPrimaryInList}
        initialValues={initialData && isEdit ? parseHealthcareProviderApiToFormData(initialData) : undefined}
        onSubmit={handleSubmitForm}
        onDelete={() => mutateDelete(id!)}
        edit={isEdit}
      />
    </ScreenModalLayout>
  );
};
