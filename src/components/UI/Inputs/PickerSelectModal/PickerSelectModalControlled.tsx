import { FormFieldControlled } from '../FormField/FormFieldControlled';
import type { TextInputProps } from '../TextInput/TextInput';
import type { PickerSelectModalItemData } from './PickerSelectModal';
import { PickerSelectModal } from './PickerSelectModal';

type PickerSelectModalControlledProps = {
  name: string;
  data: PickerSelectModalItemData[] | readonly PickerSelectModalItemData[];
  label?: string;
  inputProps?: TextInputProps;
  title?: string;
  dataTitle?: string;
};

export const PickerSelectModalControlled = ({
  data,
  title,
  dataTitle,
  name,
  label,
  inputProps,
}: PickerSelectModalControlledProps) => (
  <FormFieldControlled
    name={name}
    label={label}
    render={({ field }) => (
      <PickerSelectModal
        onSelect={(value) => field.onChange(value)}
        title={title}
        dataTitle={dataTitle}
        data={data}
        inputProps={{ value: field.value, ...inputProps }}
      />
    )}
  />
);
