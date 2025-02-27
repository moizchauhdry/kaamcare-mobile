import type { NativeStackScreenProps } from 'react-native-screens/native-stack';
import * as SecureStore from 'expo-secure-store';

import { useMutationPutProfileInformation } from 'hooks/query/profile/useMutationPutProfileInformation';
import { MoreLayout } from 'components/Layouts/MoreLayout/MoreLayout';

import { PersonalInformationForm } from '../../../components/Forms/PersonalInformationForm/PersonalInformationForm';
import { useQueryGetProfileInformation } from '../../../hooks/query/profile/useQueryGetProfileInformation';
import {
  parseProfileInformationToApi,
  parseProfileInformationToForm,
} from '../../../model/parsers/profile/ProfileInformationParser';
import { PersonalInformationFormSkeleton } from '../../../components/Forms/PersonalInformationForm/PersonalInformationFormSkeleton';
import { WithSkeleton } from '../../../components/UI/Skeleton/WithSkeleton';
import type { MoreNavigationParamsList } from '../../../components/Navigation/MoreNavigation';
import { useMutationPutEmail } from '../../../hooks/query/profile/useMutationPutEmail';
import type { PersonalInformationFormData } from '../../../schemas/forms/personalInformation';
import { useUnitsData } from '../../../context/UnitsContext';

type PersonalInformationScreenProps = NativeStackScreenProps<MoreNavigationParamsList, 'PersonalInformation'>;

export const PersonalInformationScreen = ({ navigation }: PersonalInformationScreenProps) => {
  const { data, isLoading } = useQueryGetProfileInformation();
  const localUserData = JSON.parse(SecureStore.getItem('user-data') ?? '{}');

  const { mutate } = useMutationPutProfileInformation({
    onSettled: () => navigation.navigate('MyProfile'),
  });
  const { mutate: mutateEmail } = useMutationPutEmail();
  const { mass, length } = useUnitsData();

  const handleSubmit = (formValues: PersonalInformationFormData) => {
    mutate(parseProfileInformationToApi(formValues));

    if (formValues.email !== localUserData?.email) {
      mutateEmail(formValues.email!);
    }
  };

  return (
    <MoreLayout title="My Profile">
      <WithSkeleton isLoading={isLoading} skeleton={<PersonalInformationFormSkeleton />}>
        <PersonalInformationForm
          onSubmit={(formValues) => handleSubmit(formValues)}
          initialValues={localUserData ? parseProfileInformationToForm(localUserData, length, mass) : undefined}
        />
      </WithSkeleton>
    </MoreLayout>
  );
};
