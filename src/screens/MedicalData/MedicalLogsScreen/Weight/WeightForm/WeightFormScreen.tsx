import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from '../../../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { WeightForm } from '../../../../../components/Forms/MedicalLogs/Weight/WeightForm';
import { useQueryWeightLog } from '../../../../../hooks/query/medicalLogs/weight/useQueryWeightLog';
import type { NewWeightLog } from '../../../../../model/api/medicalLogs/Weight';
import { useMutationWeightAdd } from '../../../../../hooks/query/medicalLogs/weight/useMutationWeightAdd';
import { useMutationWeightUpdate } from '../../../../../hooks/query/medicalLogs/weight/useMutationWeightUpdate';
import { useMutationWeightDelete } from '../../../../../hooks/query/medicalLogs/weight/useMutationWeightDelete';
import { parseWeightApiToFormData } from '../../../../../model/parsers/medicalLogs/WeightParser';
import { FormSkeleton } from '../../../../../components/Forms/FormSkeleton';
import { useUnitsData } from '../../../../../context/UnitsContext';

type WeightFormScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'WeightForm'>;

export const WeightFormScreen = ({ route }: WeightFormScreenProps) => {
  const edit = route.params?.edit;
  const id = route.params?.id;
  const redirect = route.params?.redirectScreen;
  const isNewest = route.params?.isNewest;
  const days = route.params?.days;
  const { mass } = useUnitsData();

  const { data: initialValues, isLoading } = useQueryWeightLog(id!, { enabled: Boolean(id) });
  const mutationAdd = useMutationWeightAdd(redirect, 'Weight', days);
  const mutationUpdate = useMutationWeightUpdate(id!, isNewest, days);
  const mutationDelete = useMutationWeightDelete(id!, isNewest, days);

  const handleSubmit = (data: NewWeightLog) =>
    edit && initialValues
      ? mutationUpdate.mutate({ ...initialValues, ...data, id: id! })
      : mutationAdd.mutate({ ...data });

  return (
    <ScreenModalLayout title="Weight" isScrollable>
      {edit && isLoading ? (
        <FormSkeleton />
      ) : (
        <WeightForm
          initialValues={initialValues ? parseWeightApiToFormData(initialValues, mass) : undefined}
          edit={edit}
          onSubmit={handleSubmit}
          onDelete={() => mutationDelete.mutate(id!)}
          isPending={mutationDelete.isPending || mutationUpdate.isPending || mutationAdd.isPending}
        />
      )}
    </ScreenModalLayout>
  );
};
