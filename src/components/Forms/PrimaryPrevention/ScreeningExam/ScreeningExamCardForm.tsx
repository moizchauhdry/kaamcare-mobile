import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View } from 'react-native';
import { useEffect } from 'react';

import { TextInputControlled } from '../../../UI/Inputs/TextInput/TextInputControlled';
import { DeletionButton } from '../../../UI/Button/DeletionButton';
import { FormButtonControlled } from '../../common/FormButtonControlled/FormButtonControlled';
import { AttachmentInputControlled } from '../../../UI/Inputs/AttachmentsInput/AttachmentInputControlled';
import {
  screeningExamCardSchema,
  type ScreeningExamCardFormData,
} from '../../../../schemas/forms/primaryPrevention/screeningExam';
import { SeparatedDateInputControlled } from '../../../UI/Inputs/SeparatedDateInput/SeparatedDateInputControlled';
import { screeningExamCardDefaultValues } from '../../../../constants/forms/primaryPrevention/screeningExam';

type ScreeningExamCardFormProps = {
  initialValues?: ScreeningExamCardFormData;
  edit?: boolean;
  deletionData?: {
    title: string;
    listName: string;
    onDelete?: () => void;
  };
  onSubmit?: (values: ScreeningExamCardFormData) => void;
  isPending?: boolean;
};

export const ScreeningExamCardForm = ({
  deletionData,
  onSubmit,
  initialValues,
  edit,
  isPending,
}: ScreeningExamCardFormProps) => {
  const form = useForm<ScreeningExamCardFormData>({
    defaultValues: initialValues ?? screeningExamCardDefaultValues,
    resolver: zodResolver(screeningExamCardSchema),
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [form, initialValues]);

  const handleSubmitForm = (values: ScreeningExamCardFormData) => {
    onSubmit?.(values);
  };

  return (
    <View style={{ flex: 1 }}>
      <FormProvider {...form}>
        <View style={{ gap: 16 }}>
          <TextInputControlled name="title" label="Screening exam name" inputProps={{ placeholder: 'Type in title' }} />
          <SeparatedDateInputControlled label="Diagnosis date" />
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
              name="exam"
              onProceed={() => deletionData?.onDelete?.()}
            >
              Delete exam
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
