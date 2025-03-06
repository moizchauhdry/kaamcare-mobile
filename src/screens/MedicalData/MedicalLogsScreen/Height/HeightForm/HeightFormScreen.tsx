import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from '../../../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { useQueryHeightLog } from '../../../../../hooks/query/medicalLogs/height/useQueryHeightLog';
import { useMutationHeightAdd } from '../../../../../hooks/query/medicalLogs/height/useMutationHeightAdd';
import { useMutationHeightUpdate } from '../../../../../hooks/query/medicalLogs/height/useMutationHeightUpdate';
import { useMutationHeightDelete } from '../../../../../hooks/query/medicalLogs/height/useMutationHeightDelete';
import type { NewHeightLog } from '../../../../../model/api/medicalLogs/Height';
import { HeightForm } from '../../../../../components/Forms/MedicalLogs/Height/HeightForm';
import { parseHeightApiToFormData } from '../../../../../model/parsers/medicalLogs/HeightParser';
import { FormSkeleton } from '../../../../../components/Forms/FormSkeleton';

type HeightFormScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'HeightForm'>;

export const HeightFormScreen = ({ route }: HeightFormScreenProps) => {
  const edit = route.params?.edit;
  const id = route.params?.id;
  const redirect = route.params?.redirectScreen;
  const isNewest = route.params?.isNewest;
  const days = route.params?.days;

  const { data: initialValues, isLoading } = useQueryHeightLog(id!, { enabled: Boolean(id) });
  const mutationAdd = useMutationHeightAdd(redirect, 'Height', days);
  const mutationUpdate = useMutationHeightUpdate(id!, isNewest, days);
  const mutationDelete = useMutationHeightDelete(id!, isNewest, days);

  const handleSubmit = (data: NewHeightLog) => {
    console.log('🔵 [HeightFormScreen] handleSubmit called:', {
      edit,
      id,
      data,
    });

    if (edit && initialValues) {
      console.log('🔵 [HeightFormScreen] Updating existing record');
      mutationUpdate.mutate({
        ...initialValues,
        ...data,
        id: id!,
      });
    } else {
      console.log('🔵 [HeightFormScreen] Creating new record');
      mutationAdd.mutate({ ...data });
    }
  };

  return (
    <ScreenModalLayout title="Height" isScrollable>
      {edit && isLoading ? (
        <FormSkeleton />
      ) : (
        <HeightForm
          initialValues={initialValues ? parseHeightApiToFormData(initialValues) : undefined}
          edit={edit}
          onSubmit={handleSubmit}
          onDelete={() => mutationDelete.mutate(id!)}
          isPending={mutationDelete.isPending || mutationAdd.isPending || mutationUpdate.isPending}
        />
      )}
    </ScreenModalLayout>
  );
};
