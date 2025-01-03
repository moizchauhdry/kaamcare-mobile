import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View } from 'react-native';
import { useEffect } from 'react';

import { TextInputControlled } from '../../../UI/Inputs/TextInput/TextInputControlled';
import { DeletionButton } from '../../../UI/Button/DeletionButton';
import { FormButtonControlled } from '../../common/FormButtonControlled/FormButtonControlled';
import { AttachmentInputControlled } from '../../../UI/Inputs/AttachmentsInput/AttachmentInputControlled';
import { SeparatedDateInputControlled } from '../../../UI/Inputs/SeparatedDateInput/SeparatedDateInputControlled';
import type { DiagnosisFormType } from '../../../../schemas/forms/medicalHistory/diagnosis';
import { diagnosisSchema } from '../../../../schemas/forms/medicalHistory/diagnosis';
import { parseDiagnosisHistoryFormToApiData } from '../../../../model/parsers/medicalHistory/DiagnosisParser';
import type { NewDiagnosis } from '../../../../model/api/medicalHistory/Diagnosis';
import { diagnosisDefaultValues } from '../../../../constants/forms/medicalhistory/diagnosis';

type DiagnosisFormProps = {
  name: string;
  initialValues?: DiagnosisFormType;
  edit?: boolean;
  deletionData?: {
    title: string;
    listName: string;
    onDelete?: () => void;
  };
  onDeleteAttachment?: (id: string) => void;
  onSubmit?: (values: NewDiagnosis) => void;
  isLoading?: boolean;
};

export const DiagnosisForm = ({ deletionData, onSubmit, initialValues, edit, name, isLoading }: DiagnosisFormProps) => {
  const form = useForm<DiagnosisFormType>({
    defaultValues: initialValues ?? diagnosisDefaultValues,
    resolver: zodResolver(diagnosisSchema),
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [form, initialValues]);

  const handleSubmitForm = (values: DiagnosisFormType) => {
    const data = parseDiagnosisHistoryFormToApiData(values, name);

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
            disabled={isLoading}
          />
        </View>
      </FormProvider>
    </View>
  );
};
