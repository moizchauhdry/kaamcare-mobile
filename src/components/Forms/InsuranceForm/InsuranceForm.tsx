import { View } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import type { ImagePickerAsset } from 'expo-image-picker';

import { AttachmentInputControlled } from '../../UI/Inputs/AttachmentsInput/AttachmentInputControlled';
import { Typography } from '../../UI/Typography/Typography';
import { TextInputControlled } from '../../UI/Inputs/TextInput/TextInputControlled';
import { FormButtonControlled } from '../common/FormButtonControlled/FormButtonControlled';
import type { InsuranceFormData } from '../../../schemas/forms/insurance';
import { insuranceSchema } from '../../../schemas/forms/insurance';
import { DeletionButton } from '../../UI/Button/DeletionButton';
import { calculateMultipleFileSize } from '../../../utils/file/file';

const maxFileSizes = 4194304;

type InsuranceFormProps = {
  initialValues?: InsuranceFormData;

  onSubmit?: (data: InsuranceFormData) => void;
  onDelete?: () => void;
  isPending?: boolean;
  edit?: boolean;
};

export const InsuranceForm = ({ initialValues, onSubmit, isPending, edit, onDelete }: InsuranceFormProps) => {
  const form = useForm<InsuranceFormData>({
    values: initialValues ?? { front: [], back: [], explanation: '', common: '' },
    resolver: zodResolver(insuranceSchema),
  });
  const front = form.watch('front') as ImagePickerAsset[];
  const back = form.watch('back') as ImagePickerAsset[];

  useEffect(() => {
    if (front[0] && back[0]) {
      const fileSize = calculateMultipleFileSize([front[0], back[0]]);

      if (maxFileSizes < fileSize) {
        form.setError('common', { message: 'Files together cannot be larger than 4MB' });
      } else {
        form.clearErrors('common');
      }
    } else {
      form.clearErrors('common');
    }
    /* eslint-disable-next-line */
  }, [front, back]);

  const handleSubmitForm = (data: InsuranceFormData) => {
    onSubmit?.(data);
  };
  const handleFrontSelected = (files: any[]) => {
    form.setValue('front', files);
  };

  const handleBackSelected = (files: any[]) => {
    form.setValue('back', files);
  };

  return (
    <View style={{ flex: 1 }}>
      <FormProvider {...form}>
        <View style={{ gap: 24 }}>
          <View style={{ gap: 8 }}>
            <Typography weight="semiBold">Front photo</Typography>
            <AttachmentInputControlled
              name="front"
              attachmentInputProps={{
                description: 'You can upload with a maximum size of up to 4 mb.',
                allowMultipleSelection: false,
                photoType: 'front',
              }}
              choose={handleFrontSelected}
            />
          </View>
          <View style={{ gap: 8 }}>
            <Typography weight="semiBold">Back photo</Typography>
            <AttachmentInputControlled
              name="back"
              attachmentInputProps={{
                description: 'You can upload with a maximum size of up to 4 mb.',
                allowMultipleSelection: false,
                photoType: 'back',
              }}
              choose={handleBackSelected}
            />
          </View>
          {form.formState.errors.common?.message ? (
            <View>
              <Typography color="error">{form.formState.errors.common?.message}</Typography>
            </View>
          ) : null}
          <View>
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
          </View>
          {edit && onDelete ? (
            <View>
              <DeletionButton onPress={() => onDelete?.()} disabled={isPending}>
                Delete Card
              </DeletionButton>
            </View>
          ) : null}
          <FormButtonControlled edit={edit} disabled={isPending} onPress={form.handleSubmit(handleSubmitForm)} />
        </View>
      </FormProvider>
    </View>
  );
};
