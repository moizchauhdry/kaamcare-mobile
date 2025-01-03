import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from 'components/Layouts/ScreenModalLayout/ScreenModalLayout';
import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';
import { useMutationAllergyAdd } from 'hooks/query/medicalHistory/allergies/useMutationAllergyAdd';
import { useMutationAllergyUpdate } from 'hooks/query/medicalHistory/allergies/useMutationAllergyUpdate';
import { useMutationAllergyDelete } from 'hooks/query/medicalHistory/allergies/useMutationAllergyDelete';
import { AllergyForm } from 'components/Forms/MedicalHistory/Allergy/AllergyForm';

import { useQueryGetSingleElement } from '../../../../../hooks/query/useQueryGetSingleElement';
import { QUERY_KEYS } from '../../../../../constants/query/queryKeys';
import type { Allergy } from '../../../../../model/api/medicalHistory/Allergies';

type AddAllergyScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'AddAllergy'>;

export const AddAllergyScreen = ({ route, navigation }: AddAllergyScreenProps) => {
  const allergyName = route.params?.name;
  const edit = route.params?.edit;
  const isCommonName = route.params?.isCommonName;
  const allergy = useQueryGetSingleElement<Allergy>(
    allergyName!,
    [QUERY_KEYS.MEDICAL_HISTORY_ALLERGIES_GET],
    'allergyName',
  );

  const handleSettled = () => navigation.reset({ routes: [{ name: 'Allergies' }] });

  const mutationAdd = useMutationAllergyAdd({
    onSettled: handleSettled,
  });
  const mutationUpdate = useMutationAllergyUpdate(allergyName!, {
    onSettled: handleSettled,
  });
  const mutationDelete = useMutationAllergyDelete(allergy?.userAllergyId!, {
    onSettled: handleSettled,
  });
  const isPending = mutationAdd.isPending || mutationUpdate.isPending || mutationDelete.isPending;

  const handleSubmit = (explanation?: string) => {
    if (allergy && edit) {
      mutationUpdate.mutate({ ...allergy, explanation, isCommonName: true });
      return;
    }

    mutationAdd.mutate({ allergyName: allergyName!, explanation, isCommonName });
  };

  return (
    <ScreenModalLayout title={allergyName!} isScrollable>
      <AllergyForm
        onSubmit={handleSubmit}
        onDelete={() => mutationDelete.mutate(allergy?.userAllergyId!)}
        explanation={allergy?.explanation ?? ''}
        edit={edit}
        allergyName={allergyName}
        isPending={isPending}
      />
    </ScreenModalLayout>
  );
};
