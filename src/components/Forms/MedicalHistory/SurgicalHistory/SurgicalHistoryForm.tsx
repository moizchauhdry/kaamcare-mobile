import { View } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import { SeparatedDateInputControlled } from '../../../UI/Inputs/SeparatedDateInput/SeparatedDateInputControlled';
import { TextInputControlled } from '../../../UI/Inputs/TextInput/TextInputControlled';
import { AttachmentInputControlled } from '../../../UI/Inputs/AttachmentsInput/AttachmentInputControlled';
import { DeletionButton } from '../../../UI/Button/DeletionButton';
import { FormButtonControlled } from '../../common/FormButtonControlled/FormButtonControlled';
import type { NewSurgicalHistory } from '../../../../model/api/medicalHistory/SurgicalHistory';
import type { SurgicalHistoryFormData } from '../../../../schemas/forms/medicalHistory/surgicalHistory';
import { surgicalHistorySchema } from '../../../../schemas/forms/medicalHistory/surgicalHistory';
import { surgicalHistoryDefaultValues } from '../../../../constants/forms/medicalhistory/surgicalHistory';
import { parseSurgicalHistoryFormToApiData } from '../../../../model/parsers/medicalHistory/SurgicalHistoryParser';

type SurgicalHistoryFormProps = {
  name: string;
  initialValues?: SurgicalHistoryFormData;
  edit?: boolean;
  onDelete?: () => void;
  onSubmit?: (values: NewSurgicalHistory) => void;
  isPending?: boolean;
};

export const SurgicalHistoryForm = ({
  name,
  initialValues,
  edit,
  onDelete,
  onSubmit,
  isPending,
}: SurgicalHistoryFormProps) => {
  const form = useForm<SurgicalHistoryFormData>({
    defaultValues: initialValues ?? surgicalHistoryDefaultValues,
    resolver: zodResolver(surgicalHistorySchema),
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [form, initialValues]);

  const handleSubmitForm = (values: SurgicalHistoryFormData) => {
    const data = parseSurgicalHistoryFormToApiData(values, name);

    onSubmit?.({ ...data, name });
  };
  const handleFilesSelected = (files: any[]) => {
    form.setValue('attachment', files);
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
            choose={handleFilesSelected}
          />
          {edit && onDelete ? (
            <DeletionButton
              title="Delete Surgical History"
              listName="Surgical history"
              name={name}
              onProceed={() => onDelete()}
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
