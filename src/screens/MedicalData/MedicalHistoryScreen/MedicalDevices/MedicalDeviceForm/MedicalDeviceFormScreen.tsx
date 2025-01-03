import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from '../../../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { useQueryMedicalDevice } from '../../../../../hooks/query/medicalHistory/medicalDevices/useQueryMedicalDevice';
import { useMutationMedicalDeviceDelete } from '../../../../../hooks/query/medicalHistory/medicalDevices/useMutationMedicalDeviceDelete';
import { useMutationMedicalDeviceUpdate } from '../../../../../hooks/query/medicalHistory/medicalDevices/useMutationMedicalDeviceUpdate';
import { useMutationMedicalDeviceAdd } from '../../../../../hooks/query/medicalHistory/medicalDevices/useMutationMedicalDeviceAdd';
import type { NewMedicalDevice } from '../../../../../model/api/medicalHistory/MedicalDevices';
import { parseMedicalDeviceApiToFormData } from '../../../../../model/parsers/medicalHistory/MedicalDevicesParser';
import { MedicalDeviceForm } from '../../../../../components/Forms/MedicalHistory/MedicalDeviceForm/MedicalDeviceForm';
import { ElementWithAttachmentDataProvider } from '../../../../../context/ElementWithAttachmentDataContext';
import { QUERY_KEYS } from '../../../../../constants/query/queryKeys';

type MedicalDeviceFormScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'MedicalDeviceForm'>;

export const MedicalDeviceFormScreen = ({ route }: MedicalDeviceFormScreenProps) => {
  const { name, edit, id, isCommonName } = route.params;

  const initialValues = useQueryMedicalDevice(id, edit);
  const mutateDelete = useMutationMedicalDeviceDelete(id!, name);
  const mutateUpdate = useMutationMedicalDeviceUpdate(initialValues);
  const mutateAdd = useMutationMedicalDeviceAdd();
  const isPending = mutateAdd.isPending || mutateUpdate.isPending || mutateDelete.isPending;

  const handleSubmit = (values: NewMedicalDevice) => {
    if (edit && initialValues) {
      mutateUpdate.mutate({
        ...initialValues,
        ...values,
        isCommonName: true,
      });

      return;
    }

    mutateAdd.mutate({ ...values, name, isCommonName });
  };

  return (
    <ScreenModalLayout title={name} isScrollable>
      <ElementWithAttachmentDataProvider
        sectionName="medical-devices"
        elementId={id!}
        keyList={[QUERY_KEYS.MEDICAL_HISTORY_MEDICAL_DEVICES_GET]}
      >
        <MedicalDeviceForm
          onDelete={() => mutateDelete.mutate(id!)}
          onSubmit={handleSubmit}
          edit={edit}
          medicalDeviceName={name}
          initialValues={initialValues ? parseMedicalDeviceApiToFormData(initialValues) : undefined}
          isPending={isPending}
        />
      </ElementWithAttachmentDataProvider>
    </ScreenModalLayout>
  );
};
