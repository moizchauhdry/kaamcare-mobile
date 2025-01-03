import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View } from 'react-native';
import { useEffect } from 'react';

import { TextInputControlled } from '../../../UI/Inputs/TextInput/TextInputControlled';
import { DeletionButton } from '../../../UI/Button/DeletionButton';
import { FormButtonControlled } from '../../common/FormButtonControlled/FormButtonControlled';
import { parseMedicalDeviceFormToApiData } from '../../../../model/parsers/medicalHistory/MedicalDevicesParser';
import type { MedicalDeviceFormData } from '../../../../schemas/forms/medicalHistory/medicalDevice';
import { medicalDeviceSchema } from '../../../../schemas/forms/medicalHistory/medicalDevice';
import { medicalDeviceFormDefaultValues } from '../../../../constants/forms/medicalhistory/medicalDevice';
import { AttachmentInputControlled } from '../../../UI/Inputs/AttachmentsInput/AttachmentInputControlled';
import type { NewMedicalDevice } from '../../../../model/api/medicalHistory/MedicalDevices';
import { SeparatedDateInputControlled } from '../../../UI/Inputs/SeparatedDateInput/SeparatedDateInputControlled';

type MedicalDeviceFormProps = {
  medicalDeviceName: string;
  initialValues?: MedicalDeviceFormData;
  edit?: boolean;
  onSubmit?: (values: NewMedicalDevice) => void;
  onDelete?: () => void;
  isPending?: boolean;
};

export const MedicalDeviceForm = ({
  onDelete,
  onSubmit,
  initialValues,
  edit,
  medicalDeviceName,
  isPending,
}: MedicalDeviceFormProps) => {
  const form = useForm<MedicalDeviceFormData>({
    defaultValues: initialValues ?? medicalDeviceFormDefaultValues,
    resolver: zodResolver(medicalDeviceSchema),
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [form, initialValues]);

  const handleSubmitForm = (values: MedicalDeviceFormData) => {
    onSubmit?.(parseMedicalDeviceFormToApiData(values, medicalDeviceName));
  };

  return (
    <View style={{ flex: 1 }}>
      <FormProvider {...form}>
        <View style={{ gap: 16 }}>
          <View style={{ gap: 8, flexDirection: 'column', paddingRight: 8 }}>
            <SeparatedDateInputControlled label="Date" />
          </View>
          <TextInputControlled
            name="explanation"
            label="Explanation"
            inputProps={{
              isWide: true,
              placeholder: 'Enter any relevant information here...',
              maxLength: 240,
              style: { height: 200 },
            }}
          />
          <AttachmentInputControlled
            name="attachment"
            attachmentInputProps={{ description: 'You can upload with a maximum size of up to 4 mb.' }}
          />
          {edit ? (
            <DeletionButton
              title="Delete Medical Device"
              listName="Medical devices"
              name={medicalDeviceName}
              onProceed={() => onDelete?.()}
            >
              Delete medical device
            </DeletionButton>
          ) : null}
          <FormButtonControlled
            edit={edit}
            onPress={form.handleSubmit(handleSubmitForm)}
            enabled
            disabled={isPending}
          />
        </View>
      </FormProvider>
    </View>
  );
};
