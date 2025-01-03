import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from '../../../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { FamilyMemberForm } from '../../../../../components/Forms/MedicalHistory/FamilyHistory/FamilyMemberForm';
import { useQueryFamilyMember } from '../../../../../hooks/query/medicalHistory/familyHistory/useQueryFamilyMember';
import { parseFamilyMemberToFormData } from '../../../../../model/parsers/medicalHistory/FamilyHistoryParser';
import { useMutationFamilyMemberAdd } from '../../../../../hooks/query/medicalHistory/familyHistory/useMutationFamilyMemberAdd';
import { useMutationFamilyMemberUpdate } from '../../../../../hooks/query/medicalHistory/familyHistory/useMutationFamilyMemberUpdate';
import { useMutationFamilyMemberDelete } from '../../../../../hooks/query/medicalHistory/familyHistory/useMutationFamilyMemberDelete';
import type { NewFamilyMember } from '../../../../../model/api/medicalHistory/FamilyHistory';

type FamilyMemberFormScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'FamilyMemberForm'>;

export const FamilyMemberFormScreen = ({ route }: FamilyMemberFormScreenProps) => {
  const { isEdit, id } = route.params;
  const initialValues = useQueryFamilyMember(id, true);

  const mutateAdd = useMutationFamilyMemberAdd();
  const mutateUpdate = useMutationFamilyMemberUpdate(id);
  const mutateDelete = useMutationFamilyMemberDelete(
    id,
    initialValues?.relationshipName || initialValues?.familyMemberName,
  );
  const isLoading = mutateDelete.isPending || mutateUpdate.isPending || mutateAdd.isPending;

  const handleSubmit = (newData: NewFamilyMember) => {
    if (isEdit && initialValues) {
      mutateUpdate.mutate({ ...initialValues, ...newData });

      return;
    }

    mutateAdd.mutate(newData);
  };

  return (
    <ScreenModalLayout title={isEdit ? 'Edit family member' : 'Add family member'} isScrollable>
      <FamilyMemberForm
        onSubmit={handleSubmit}
        edit={isEdit}
        onDelete={() => mutateDelete.mutate(id!)}
        isLoading={isLoading}
        initialValues={initialValues ? parseFamilyMemberToFormData(initialValues) : undefined}
      />
    </ScreenModalLayout>
  );
};
