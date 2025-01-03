import { useFormContext } from 'react-hook-form';

import type { AttachmentsInputProps } from './AttachmentsInput';
import { AttachmentsInput } from './AttachmentsInput';
import { FormFieldControlled } from '../FormField/FormFieldControlled';

type AttachmentInputControlledProps = {
  name: string;
  attachmentInputProps?: AttachmentsInputProps;
};

export const AttachmentInputControlled = ({ name, attachmentInputProps }: AttachmentInputControlledProps) => {
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
          onChoose={(files) => setValue(field.name, files, { shouldDirty: true })}
          initialValues={field.value}
        />
      )}
    />
  );
};
