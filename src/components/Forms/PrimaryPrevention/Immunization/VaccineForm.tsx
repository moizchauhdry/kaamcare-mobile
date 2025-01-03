import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View } from 'react-native';
import { useEffect } from 'react';

import { TextInputControlled } from '../../../UI/Inputs/TextInput/TextInputControlled';
import { DeletionButton } from '../../../UI/Button/DeletionButton';
import { FormButtonControlled } from '../../common/FormButtonControlled/FormButtonControlled';
import { AttachmentInputControlled } from '../../../UI/Inputs/AttachmentsInput/AttachmentInputControlled';
import { SeparatedDateInputControlled } from '../../../UI/Inputs/SeparatedDateInput/SeparatedDateInputControlled';
import { SwitchSelectorControlled } from '../../../UI/Inputs/SwitchSelector/SwitchSelectorControlled';
import { NumberInputControlled } from '../../../UI/Inputs/NumberInput/NumberInputControlled';
import type { VaccineFormData } from '../../../../schemas/forms/primaryPrevention/immunization';
import { vaccineSchema } from '../../../../schemas/forms/primaryPrevention/immunization';
import { vaccineDefaultValues } from '../../../../constants/forms/primaryPrevention/immunization';
import { vaccineFacilityData } from '../../../../constants/data/primaryPrevention/immunizations';

type VaccineFormProps = {
  initialValues?: VaccineFormData;
  edit?: boolean;
  deletionData?: {
    title: string;
    listName: string;
    onDelete?: () => void;
  };
  onSubmit?: (values: VaccineFormData) => void;
  isPending?: boolean;
};

export const VaccineForm = ({ deletionData, onSubmit, initialValues, edit, isPending }: VaccineFormProps) => {
  const form = useForm<VaccineFormData>({
    defaultValues: initialValues ?? vaccineDefaultValues,
    resolver: zodResolver(vaccineSchema),
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [form, initialValues]);

  const handleSubmitForm = (values: VaccineFormData) => {
    onSubmit?.(values);
  };

  return (
    <View style={{ flex: 1 }}>
      <FormProvider {...form}>
        <View style={{ gap: 16 }}>
          <SeparatedDateInputControlled label="Date" />
          <SwitchSelectorControlled
            name="facility"
            label="Facility"
            options={vaccineFacilityData}
            inputProps={{ height: 50 }}
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
          <AttachmentInputControlled
            name="attachment"
            attachmentInputProps={{ description: 'You can upload with a maximum size of up to 4 mb.' }}
          />
          <TextInputControlled
            name="brand"
            label="Brand name"
            inputProps={{ placeholder: 'Type in brand name', maxLength: 40 }}
          />
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <View style={{ flex: 1 }}>
              <TextInputControlled name="lot" label="Lot number" inputProps={{ placeholder: '#', maxLength: 15 }} />
            </View>
            <View style={{ flex: 1 }}>
              <NumberInputControlled
                name="dose"
                label="Dose number"
                inputProps={{ maxValue: 99, placeholder: 'Type in dose' }}
              />
            </View>
          </View>
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
