import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from '../../../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { SaturationForm } from '../../../../../components/Forms/MedicalLogs/Saturation/SaturationForm';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { useQuerySaturationLog } from '../../../../../hooks/query/medicalLogs/saturation/useQuerySaturationLog';
import { useMutationSaturationLogAdd } from '../../../../../hooks/query/medicalLogs/saturation/useMutationSaturationLogAdd';
import { useMutationSaturationLogUpdate } from '../../../../../hooks/query/medicalLogs/saturation/useMutationSaturationLogUpdate';
import { useMutationSaturationLogDelete } from '../../../../../hooks/query/medicalLogs/saturation/useMutationSaturationLogDelete';
import type { NewSaturationLog } from '../../../../../model/api/medicalLogs/Saturation';
import { parseSaturationApiToFormData } from '../../../../../model/parsers/medicalLogs/SaturationParser';
import { FormSkeleton } from '../../../../../components/Forms/FormSkeleton';

type SaturationFormScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'SaturationForm'>;

export const SaturationFormScreen = ({ route }: SaturationFormScreenProps) => {
  const edit = route.params?.edit;
  const id = route.params?.id;
  const days = route.params?.days;

  const { data: initialValues, isLoading } = useQuerySaturationLog(id!, { enabled: Boolean(id) });

  const mutationAdd = useMutationSaturationLogAdd(days);
  const mutationUpdate = useMutationSaturationLogUpdate(id!, days);
  const mutationDelete = useMutationSaturationLogDelete(id!, days);

  const handleSubmit = (data: NewSaturationLog) =>
    edit && initialValues
      ? mutationUpdate.mutate({ ...initialValues, ...data, id: id! })
      : mutationAdd.mutate({ ...data });

  return (
    <ScreenModalLayout title="SpO2" isScrollable>
      {edit && isLoading ? (
        <FormSkeleton />
      ) : (
        <SaturationForm
          onDelete={() => mutationDelete.mutate(id!)}
          onSubmit={handleSubmit}
          initialValues={initialValues ? parseSaturationApiToFormData(initialValues) : undefined}
          edit={edit}
          isPending={mutationDelete.isPending || mutationAdd.isPending || mutationUpdate.isPending}
        />
      )}
    </ScreenModalLayout>
  );
};
