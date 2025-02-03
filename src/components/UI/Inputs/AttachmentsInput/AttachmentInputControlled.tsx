/* eslint-disable @typescript-eslint/consistent-type-imports */
import { useFormContext } from 'react-hook-form';

import type { AttachmentsInputProps } from './AttachmentsInput';
import { AttachmentsInput } from './AttachmentsInput';
import { FormFieldControlled } from '../FormField/FormFieldControlled';
import { AttachmentApiSmallModel, AttachmentModel } from 'model/api/common/Attachment';

type AttachmentInputControlledProps = {
  name: string;
  attachmentInputProps?: AttachmentsInputProps;
  choose?: (files: (AttachmentModel | AttachmentApiSmallModel)[]) => void;
};

export const AttachmentInputControlled = ({ name, attachmentInputProps, choose }: AttachmentInputControlledProps) => {
  const { control, setError, formState, getFieldState, clearErrors, setValue } = useFormContext();
  const fieldState = getFieldState(name, formState);

  return (
    <FormFieldControlled
      control={control}
      name={name}
      error={fieldState.error?.message}
      render={({ field }) => (
        <AttachmentsInput
          {...attachmentInputProps}
          onErrorOccur={(message: string) =>
            message ? setError(field.name, { type: 'custom', message }) : clearErrors(field.name)
          }
          onChoose={(files) => {
            // Ensure Choose is called with files
            if (choose) {
              choose(files); // This calls the parent function
            }
            setValue(field.name, files, { shouldDirty: true });
          }}
          initialValues={field.value}
        />
      )}
    />
  );
};
