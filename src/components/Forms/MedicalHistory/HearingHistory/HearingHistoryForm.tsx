import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View } from 'react-native';
import { useEffect } from 'react';

import { TextInputControlled } from '../../../UI/Inputs/TextInput/TextInputControlled';
import { DeletionButton } from '../../../UI/Button/DeletionButton';
import { FormButtonControlled } from '../../common/FormButtonControlled/FormButtonControlled';
import { AttachmentInputControlled } from '../../../UI/Inputs/AttachmentsInput/AttachmentInputControlled';
import type { NewHearingHistory } from '../../../../model/api/medicalHistory/HearingHistory';
import { hearingHistoryFormDataDefault } from '../../../../constants/forms/medicalhistory/hearingHistory';
import { SeparatedDateInputControlled } from '../../../UI/Inputs/SeparatedDateInput/SeparatedDateInputControlled';
import { SwitchSelectorControlled } from '../../../UI/Inputs/SwitchSelector/SwitchSelectorControlled';
import type { HearingHistoryFormData } from '../../../../schemas/forms/medicalHistory/hearingHistory';
import { hearingHistorySchema } from '../../../../schemas/forms/medicalHistory/hearingHistory';
import { hearingHistoryLocationData } from '../../../../constants/data/medicalHistory/hearingHistory';
import { parseHearingHistoryFormToApiData } from '../../../../model/parsers/medicalHistory/HearingHistoryParser';

type HearingHistoryFormProps = {
  name: string;
  initialValues?: HearingHistoryFormData;
  edit?: boolean;
  deletionData?: {
    title: string;
    listName: string;
    onDelete?: () => void;
  };
  onSubmit?: (values: NewHearingHistory) => void;
  isLoading?: boolean;
};

export const HearingHistoryForm = ({
  deletionData,
  onSubmit,
  initialValues,
  edit,
  name,
  isLoading,
}: HearingHistoryFormProps) => {
  const form = useForm<HearingHistoryFormData>({
    defaultValues: initialValues ?? hearingHistoryFormDataDefault,
    resolver: zodResolver(hearingHistorySchema),
  });
  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [form, initialValues]);

  const handleSubmitForm = (values: HearingHistoryFormData) => {
    onSubmit?.(parseHearingHistoryFormToApiData({ ...values }, name));
  };

  const handleFilesSelected = (files: any[]) => {
    form.setValue('attachment', files);
  };
  return (
    <View style={{ flex: 1 }}>
      <FormProvider {...form}>
        <View style={{ gap: 16 }}>
          <SeparatedDateInputControlled label="Date" />
          <SwitchSelectorControlled label="Location" name="location" options={hearingHistoryLocationData} />
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
            disabled={isLoading}
            edit={edit}
            onPress={form.handleSubmit(handleSubmitForm)}
          />
        </View>
      </FormProvider>
    </View>
  );
};
