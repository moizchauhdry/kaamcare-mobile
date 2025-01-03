import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from '../../../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { BloodSugarForm } from '../../../../../components/Forms/MedicalLogs/BloodSugar/BloodSugarForm';
import { useMutationBloodSugarLogAdd } from '../../../../../hooks/query/medicalLogs/bloodSugar/useMutationBloodSugarLogAdd';
import { useMutationBloodSugarLogDelete } from '../../../../../hooks/query/medicalLogs/bloodSugar/useMutationBloodSugarLogDelete';
import { useQueryBloodSugarLog } from '../../../../../hooks/query/medicalLogs/bloodSugar/useQueryBloodSugarLog';
import type { NewBloodSugarLog } from '../../../../../model/api/medicalLogs/BloodSugar';
import { useMutationBloodSugarLogUpdate } from '../../../../../hooks/query/medicalLogs/bloodSugar/useMutationBloodSugarLogUpdate';
import { parseBloodSugarApiToFormData } from '../../../../../model/parsers/medicalLogs/BloodSugarParser';
import { useUnitsData } from '../../../../../context/UnitsContext';

type BloodPressureFormScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'BloodSugarForm'>;

export const BloodSugarFormScreen = ({ route }: BloodPressureFormScreenProps) => {
  const edit = route.params?.edit;
  const id = route.params?.id;
  const days = route.params?.days;
  const { sugar } = useUnitsData();

  const { data: initialValues } = useQueryBloodSugarLog(id!, { enabled: Boolean(id) });

  const mutationAdd = useMutationBloodSugarLogAdd(days);
  const mutationUpdate = useMutationBloodSugarLogUpdate(id!, days);
  const mutationDelete = useMutationBloodSugarLogDelete(id!, days);

  const handleSubmit = (data: NewBloodSugarLog) =>
    edit && initialValues
      ? mutationUpdate.mutate({ ...initialValues, ...data, id: id! })
      : mutationAdd.mutate({ ...data });

  return (
    <ScreenModalLayout title="Blood Sugar" isScrollable>
      <BloodSugarForm
        initialValues={initialValues ? parseBloodSugarApiToFormData(initialValues, sugar) : undefined}
        edit={edit}
        onSubmit={handleSubmit}
        onDelete={() => mutationDelete.mutate(id!)}
        isPending={mutationDelete.isPending || mutationAdd.isPending || mutationUpdate.isPending}
      />
    </ScreenModalLayout>
  );
};
