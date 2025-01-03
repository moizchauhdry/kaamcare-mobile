import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View } from 'react-native';
import { useEffect } from 'react';

import { TextInputControlled } from '../../../UI/Inputs/TextInput/TextInputControlled';
import { DeletionButton } from '../../../UI/Button/DeletionButton';
import { FormButtonControlled } from '../../common/FormButtonControlled/FormButtonControlled';
import { medicalDeviceSchema } from '../../../../schemas/forms/medicalHistory/medicalDevice';
import { medicalDeviceFormDefaultValues } from '../../../../constants/forms/medicalhistory/medicalDevice';
import { AttachmentInputControlled } from '../../../UI/Inputs/AttachmentsInput/AttachmentInputControlled';
import type { DentalHistoryFormData } from '../../../../schemas/forms/medicalHistory/dentalHistory';
import type { DentalHistoryType, NewDentalHistory } from '../../../../model/api/medicalHistory/DentalHistory';
import { parseDentalHistoryFormToApiData } from '../../../../model/parsers/medicalHistory/DentalHistoryParser';
import { SeparatedDateInputControlled } from '../../../UI/Inputs/SeparatedDateInput/SeparatedDateInputControlled';

type DentalHistoryFormProps = {
  name: string;
  type: DentalHistoryType;
  initialValues?: DentalHistoryFormData;
  edit?: boolean;
  deletionData?: {
    title: string;
    listName: string;
    onDelete?: () => void;
  };
  onDeleteAttachment?: (id: string) => void;
  onSubmit?: (values: NewDentalHistory) => void;
  isPending?: boolean;
};

export const DentalHistoryForm = ({
  deletionData,
  onSubmit,
  initialValues,
  edit,
  name,
  isPending,
  type,
}: DentalHistoryFormProps) => {
  const form = useForm<DentalHistoryFormData>({
    defaultValues: initialValues ?? medicalDeviceFormDefaultValues,
    resolver: zodResolver(medicalDeviceSchema),
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [form, initialValues]);

  const handleSubmitForm = (values: DentalHistoryFormData) => {
    const data = parseDentalHistoryFormToApiData(values, name === 'Odontogram' ? 'Odontogram' : name, type);

    onSubmit?.(data);
  };

  return (
    <View style={{ flex: 1 }}>
      <FormProvider {...form}>
        <View style={{ gap: 16 }}>
          <SeparatedDateInputControlled label="Date" />
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
          {edit && deletionData ? (
            <DeletionButton
              title={deletionData?.title}
              listName={deletionData?.listName}
              name={name}
              onProceed={() => deletionData?.onDelete?.()}
            >
              Delete {name}
            </DeletionButton>
          ) : null}
          <FormButtonControlled
            enabled
            edit={edit}
            onPress={form.handleSubmit(handleSubmitForm)}
            disabled={isPending}
          />
        </View>
      </FormProvider>
    </View>
  );
};
