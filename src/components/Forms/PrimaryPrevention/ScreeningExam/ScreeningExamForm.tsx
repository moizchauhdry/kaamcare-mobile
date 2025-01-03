import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View } from 'react-native';
import { useEffect } from 'react';

import { TextInputControlled } from '../../../UI/Inputs/TextInput/TextInputControlled';
import { DeletionButton } from '../../../UI/Button/DeletionButton';
import { FormButtonControlled } from '../../common/FormButtonControlled/FormButtonControlled';
import { AttachmentInputControlled } from '../../../UI/Inputs/AttachmentsInput/AttachmentInputControlled';
import { SeparatedDateInputControlled } from '../../../UI/Inputs/SeparatedDateInput/SeparatedDateInputControlled';
import type { ScreeningExamFormData } from '../../../../schemas/forms/primaryPrevention/screeningExam';
import { screeningExamDefaultValues } from '../../../../constants/forms/primaryPrevention/screeningExam';
import { screeningExamSchema } from '../../../../schemas/forms/primaryPrevention/screeningExam';

type ScreeningExamFormProps = {
  initialValues?: ScreeningExamFormData;
  edit?: boolean;
  deletionData?: {
    title: string;
    listName: string;
    onDelete?: () => void;
  };
  onSubmit?: (values: ScreeningExamFormData) => void;
  isPending?: boolean;
};

export const ScreeningExamForm = ({
  deletionData,
  onSubmit,
  initialValues,
  edit,
  isPending,
}: ScreeningExamFormProps) => {
  const form = useForm<ScreeningExamFormData>({
    defaultValues: initialValues ?? screeningExamDefaultValues,
    resolver: zodResolver(screeningExamSchema),
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [form, initialValues]);

  const handleSubmitForm = (values: ScreeningExamFormData) => {
    onSubmit?.(values);
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
              name="screeningExam"
              onProceed={() => deletionData?.onDelete?.()}
            >
              Delete Screening Exam
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
