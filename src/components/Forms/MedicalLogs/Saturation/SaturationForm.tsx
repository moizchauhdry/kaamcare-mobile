import { View } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { DateTimePickerControlled } from '../../../UI/Inputs/DateTimePicker/DateTimePickerControlled';
import { TextInputControlled } from '../../../UI/Inputs/TextInput/TextInputControlled';
import type { SaturationFormData } from '../../../../schemas/forms/medicalLogs/saturation';
import { saturationSchema } from '../../../../schemas/forms/medicalLogs/saturation';
import { saturationDefaultValues } from '../../../../constants/forms/medicalLogs/saturation';
import { DeletionButton } from '../../../UI/Button/DeletionButton';
import { FormButtonControlled } from '../../common/FormButtonControlled/FormButtonControlled';
import { NumberInputControlled } from '../../../UI/Inputs/NumberInput/NumberInputControlled';
import type { NewSaturationLog } from '../../../../model/api/medicalLogs/Saturation';
import { parseSaturationFormToApiData } from '../../../../model/parsers/medicalLogs/SaturationParser';

type SaturationFormProps = {
  initialValues?: SaturationFormData;
  edit?: boolean;
  onSubmit?: (values: NewSaturationLog) => void;
  onDelete?: () => void;
  isPending?: boolean;
};

export const SaturationForm = ({ initialValues, edit, isPending, onSubmit, onDelete }: SaturationFormProps) => {
  const form = useForm({
    defaultValues: initialValues ?? { ...saturationDefaultValues, date: new Date() },
    resolver: zodResolver(saturationSchema),
  });

  const handleSubmitForm = (values: SaturationFormData) => {
    onSubmit?.(parseSaturationFormToApiData(values));
  };

  return (
    <View style={{ flex: 1 }}>
      <FormProvider {...form}>
        <View style={{ gap: 16 }}>
          <DateTimePickerControlled
            name="date"
            label="Date and time"
            inputProps={{ forbidFuture: true, mode: 'datetime', placeholder: 'MM/DD/YYYY, hh:mm' }}
          />
          <NumberInputControlled
            name="spo2"
            label="SpO2"
            inputProps={{ rightElement: '%', maxLength: 3, maxValue: 100 }}
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
          {edit ? (
            <DeletionButton
              title="Delete SpO2 log"
              description="Are you sure you want to delete this log?"
              onProceed={() => onDelete?.()}
              disabled={isPending}
            >
              Delete SpO2 log
            </DeletionButton>
          ) : null}
          <FormButtonControlled edit={edit} onPress={form.handleSubmit(handleSubmitForm)} disabled={isPending} />
        </View>
      </FormProvider>
    </View>
  );
};
