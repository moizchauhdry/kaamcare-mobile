import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View } from 'react-native';
import { useEffect, useMemo } from 'react';

import { TextInputControlled } from '../../../UI/Inputs/TextInput/TextInputControlled';
import { DeletionButton } from '../../../UI/Button/DeletionButton';
import { FormButtonControlled } from '../../common/FormButtonControlled/FormButtonControlled';
import { AttachmentInputControlled } from '../../../UI/Inputs/AttachmentsInput/AttachmentInputControlled';
import { SeparatedDateInputControlled } from '../../../UI/Inputs/SeparatedDateInput/SeparatedDateInputControlled';
import type { VisionHistoryFormData } from '../../../../schemas/forms/medicalHistory/visionHistory';
import { visionHistorySchema } from '../../../../schemas/forms/medicalHistory/visionHistory';
import { SwitchSelectorControlled } from '../../../UI/Inputs/SwitchSelector/SwitchSelectorControlled';
import type { NewVisionHistoryModel } from '../../../../model/api/medicalHistory/VisionHistory';
import {
  getLocationFieldData,
  getVisionHistoryFieldConfig,
} from '../../../../constants/data/medicalHistory/visionHistory';
import { AutoForm } from '../../AutoForm/AutoForm';
import { parseVisionHistoryFormToApiData } from '../../../../model/parsers/medicalHistory/VisionHistoryParser';
import { visionHistoryDefaultValues } from '../../../../constants/forms/medicalhistory/visionHistory';

type DentalHistoryFormProps = {
  name: string;
  sectionName?: string;
  initialValues?: VisionHistoryFormData;
  edit?: boolean;
  additionalFieldConfig?: any;
  deletionData?: {
    title: string;
    listName: string;
    onDelete?: () => void;
  };
  onSubmit?: (values: NewVisionHistoryModel) => void;
  isPending?: boolean;
};

export const VisionHistoryForm = ({
  deletionData,
  onSubmit,
  initialValues,
  edit,
  name,
  sectionName,
  isPending,
}: DentalHistoryFormProps) => {
  const form = useForm<VisionHistoryFormData>({
    defaultValues: initialValues ?? visionHistoryDefaultValues,
    resolver: zodResolver(visionHistorySchema),
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [form, initialValues]);

  const additionalFieldConfig = useMemo(() => getVisionHistoryFieldConfig(name), [name]);
  const options = useMemo(() => getLocationFieldData(name), [name]);

  const handleSubmitForm = (values: VisionHistoryFormData) => {
    const data = parseVisionHistoryFormToApiData(values, name);

    onSubmit?.(data);
  };

  return (
    <View style={{ flex: 1 }}>
      <FormProvider {...form}>
        <View style={{ gap: 16 }}>
          <SeparatedDateInputControlled label="Diagnosis date" />
          {sectionName === 'eyeWears' ? null : (
            <SwitchSelectorControlled name="location" label="Location" options={options} />
          )}
          {additionalFieldConfig ? <AutoForm fields={additionalFieldConfig} /> : null}
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
