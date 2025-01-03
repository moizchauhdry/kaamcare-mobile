import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View } from 'react-native';
import { useEffect } from 'react';

import { TextInputControlled } from '../../../UI/Inputs/TextInput/TextInputControlled';
import { DeletionButton } from '../../../UI/Button/DeletionButton';
import { FormButtonControlled } from '../../common/FormButtonControlled/FormButtonControlled';
import { AttachmentInputControlled } from '../../../UI/Inputs/AttachmentsInput/AttachmentInputControlled';
import type { VaccineCardFormData } from '../../../../schemas/forms/primaryPrevention/immunization';
import { vaccineCardDefaultValues } from '../../../../constants/forms/primaryPrevention/immunization';
import { vaccineCardSchema } from '../../../../schemas/forms/primaryPrevention/immunization';

type VaccineCardFormProps = {
  initialValues?: VaccineCardFormData;
  edit?: boolean;
  deletionData?: {
    title: string;
    listName: string;
    onDelete?: () => void;
  };
  onSubmit?: (values: VaccineCardFormData) => void;
  isPending?: boolean;
};

export const VaccineCardForm = ({ deletionData, onSubmit, initialValues, edit, isPending }: VaccineCardFormProps) => {
  const form = useForm<VaccineCardFormData>({
    defaultValues: initialValues ?? vaccineCardDefaultValues,
    resolver: zodResolver(vaccineCardSchema),
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [form, initialValues]);

  const handleSubmitForm = (values: VaccineCardFormData) => {
    onSubmit?.(values);
  };

  return (
    <View style={{ flex: 1 }}>
      <FormProvider {...form}>
        <View style={{ gap: 16 }}>
          <TextInputControlled name="title" label="Title" inputProps={{ placeholder: 'Type in title' }} />
          <AttachmentInputControlled
            name="attachment"
            attachmentInputProps={{ description: 'You can upload with a maximum size of up to 4 mb.' }}
          />
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
          {edit && deletionData ? (
            <DeletionButton
              title={deletionData?.title}
              listName={deletionData?.listName}
              name="vaccine"
              onProceed={() => deletionData?.onDelete?.()}
            >
              Delete vaccine
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
