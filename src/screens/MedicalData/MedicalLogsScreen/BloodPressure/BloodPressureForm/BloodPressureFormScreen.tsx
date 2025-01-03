import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from '../../../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { BloodPressureForm } from '../../../../../components/Forms/MedicalLogs/BloodPressure/BloodPressureForm';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { useQueryBloodPressureLog } from '../../../../../hooks/query/medicalLogs/bloodPressure/useQueryBloodPressureLog';
import { useMutationBloodPressureLogAdd } from '../../../../../hooks/query/medicalLogs/bloodPressure/useMutationBloodPressureLogAdd';
import { useMutationBloodPressureLogUpdate } from '../../../../../hooks/query/medicalLogs/bloodPressure/useMutationBloodPressureLogUpdate';
import { useMutationBloodPressureLogDelete } from '../../../../../hooks/query/medicalLogs/bloodPressure/useMutationBloodPressureLogDelete';
import type { NewBloodPressureLog } from '../../../../../model/api/medicalLogs/BloodPressure';
import { parseBloodPressureApiToFormData } from '../../../../../model/parsers/medicalLogs/BloodPressureParser';
import { FormSkeleton } from '../../../../../components/Forms/FormSkeleton';
import { useUnitsData } from '../../../../../context/UnitsContext';

type BloodPressureFormScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'BloodPressureForm'>;

export const BloodPressureFormScreen = ({ route }: BloodPressureFormScreenProps) => {
  const { pressure } = useUnitsData();
  const edit = route.params?.edit;
  const id = route.params?.id;
  const days = route.params?.days;
  const { data: initialValues, isLoading } = useQueryBloodPressureLog(id!, { enabled: Boolean(id) });
  const mutationAdd = useMutationBloodPressureLogAdd(days);
  const mutationUpdate = useMutationBloodPressureLogUpdate(id!, days);
  const mutationDelete = useMutationBloodPressureLogDelete(id!, days);

  const handleSubmit = (data: NewBloodPressureLog) =>
    edit && initialValues
      ? mutationUpdate.mutate({ ...initialValues, ...data, id: id! })
      : mutationAdd.mutate({ ...data });

  return (
    <ScreenModalLayout title="Blood Pressure & Pulse" isScrollable>
      {edit && isLoading ? (
        <FormSkeleton />
      ) : (
        <BloodPressureForm
          onDelete={() => mutationDelete.mutate(id!)}
          onSubmit={handleSubmit}
          initialValues={initialValues ? parseBloodPressureApiToFormData(initialValues, pressure) : undefined}
          edit={edit}
          isPending={mutationDelete.isPending || mutationUpdate.isPending || mutationAdd.isPending}
        />
      )}
    </ScreenModalLayout>
  );
};
