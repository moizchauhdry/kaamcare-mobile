import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { TextInput as RNTextInput } from 'react-native';
import { View } from 'react-native';
import { useRef } from 'react';

import { DateTimePickerControlled } from '../../../UI/Inputs/DateTimePicker/DateTimePickerControlled';
import { NumberInputControlled } from '../../../UI/Inputs/NumberInput/NumberInputControlled';
import { TextInputControlled } from '../../../UI/Inputs/TextInput/TextInputControlled';
import { DeletionButton } from '../../../UI/Button/DeletionButton';
import { FormButtonControlled } from '../../common/FormButtonControlled/FormButtonControlled';
import type { WeightFormData } from '../../../../schemas/forms/medicalLogs/weight';
import { weightSchema } from '../../../../schemas/forms/medicalLogs/weight';
import type { NewWeightLog } from '../../../../model/api/medicalLogs/Weight';
import { parseWeightFormToApiData } from '../../../../model/parsers/medicalLogs/WeightParser';
import { weightDefaultValues } from '../../../../constants/forms/medicalLogs/weight';
import { useUnitsData } from '../../../../context/UnitsContext';

type WeightFormProps = {
  initialValues?: WeightFormData;
  edit?: boolean;
  onSubmit?: (values: NewWeightLog) => void;
  onDelete?: () => void;
  isPending?: boolean;
};

export const WeightForm = ({ edit, onDelete, initialValues, onSubmit, isPending }: WeightFormProps) => {
  const units = useUnitsData();
  const form = useForm({
    defaultValues: initialValues ?? { ...weightDefaultValues, date: new Date() },
    resolver: zodResolver(weightSchema),
  });

  const handleSubmitForm = (values: WeightFormData) => {
    onSubmit?.(parseWeightFormToApiData(values, units.mass));
  };

  const weightRef = useRef<RNTextInput | null>(null);

  const handleWeightChange = (value: string) => {
    form.setValue('weight', value, { shouldValidate: true });
    if (value.length === 5) {
      weightRef.current?.focus();
    }
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
            label="Weight"
            name="weight"
            inputProps={{
              rightElement: units.mass === 'Pound' ? 'lbs' : 'kg',
              type: 'float',
              maxLength: 5,
              onChangeText: handleWeightChange,
            }}
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
            ref={weightRef}
          />

          {edit ? (
            <DeletionButton
              title="Delete Weight log"
              description="Are you sure you want to delete this log?"
              onProceed={() => onDelete?.()}
              disabled={isPending}
            >
              Delete Weight log
            </DeletionButton>
          ) : null}
          <FormButtonControlled disabled={isPending} edit={edit} onPress={form.handleSubmit(handleSubmitForm)} />
        </View>
      </FormProvider>
    </View>
  );
};
