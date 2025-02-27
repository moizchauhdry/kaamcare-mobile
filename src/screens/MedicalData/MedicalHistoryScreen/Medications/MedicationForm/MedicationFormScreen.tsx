import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from '../../../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { MedicationForm } from '../../../../../components/Forms/MedicalHistory/Medication/MedicationForm';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { useQueryMedication } from '../../../../../hooks/query/medicalHistory/medication/useQueryMedication';
import { parseMedicationApiToFormData } from '../../../../../model/parsers/medicalHistory/MedicationParser';
import { useMutationMedicationDelete } from '../../../../../hooks/query/medicalHistory/medication/useMutationMedicationDelete';
import { useMutationMedicationAdd } from '../../../../../hooks/query/medicalHistory/medication/useMutationMedicationAdd';
import { useMutationMedicationUpdate } from '../../../../../hooks/query/medicalHistory/medication/useMutationMedicationUpdate';
import type { NewMedication } from '../../../../../model/api/medicalHistory/Medications';

type MedicationFormScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'MedicationForm'>;

export const MedicationFormScreen = ({ route, navigation }: MedicationFormScreenProps) => {
  const { name, edit, id, isCommonName } = route.params;

  const handleSettled = () => navigation.reset({ routes: [{ name: 'Medications' }] });

  const { data } = useQueryMedication(id);
  const mutateDelete = useMutationMedicationDelete(id!, { onSettled: handleSettled });
  const mutateUpdate = useMutationMedicationUpdate({ onSettled: handleSettled });
  const mutateAdd = useMutationMedicationAdd({ onSettled: handleSettled });
  const isPending = mutateAdd.isPending || mutateUpdate.isPending || mutateDelete.isPending;

  const handleSubmit = (values: NewMedication) => {
    if (edit && data) {
      mutateUpdate.mutate({
        ...data,
        ...values,
        isCommonName: true,
      });

      return;
    }

    mutateAdd.mutate({ ...values, medication_name: name, isCommonName });
  };

  return (
    <ScreenModalLayout title={name} isScrollable>
      <MedicationForm
        onDelete={() => mutateDelete.mutate(id!)}
        onSubmit={handleSubmit}
        edit={edit}
        medicationName={name}
        initialValues={data ? parseMedicationApiToFormData(data) : undefined}
        isPending={isPending}
      />
    </ScreenModalLayout>
  );
};
