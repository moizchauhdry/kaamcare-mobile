import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput as RNTextInput, View } from 'react-native';
import { useEffect, useRef } from 'react';

import { DateTimePickerControlled } from '../../../UI/Inputs/DateTimePicker/DateTimePickerControlled';
import { NumberInputControlled } from '../../../UI/Inputs/NumberInput/NumberInputControlled';
import { TextInputControlled } from '../../../UI/Inputs/TextInput/TextInputControlled';
import { DeletionButton } from '../../../UI/Button/DeletionButton';
import { FormButtonControlled } from '../../common/FormButtonControlled/FormButtonControlled';
import { PickerSelectControlled } from '../../../UI/Inputs/PickerSelect/PickerSelectControlled';
import { InsulinList } from './components/InsulinList';
import {
  bloodSugarDefaultValues,
  mealSelectValues,
  whenSelectValues,
} from '../../../../constants/forms/medicalLogs/bloodSugar';
import type { BloodSugarFormData } from '../../../../schemas/forms/medicalLogs/bloodSugar';
import { bloodSugarSchema } from '../../../../schemas/forms/medicalLogs/bloodSugar';
import type { NewBloodSugarLog } from '../../../../model/api/medicalLogs/BloodSugar';
import { parseBloodSugarFormToApiData } from '../../../../model/parsers/medicalLogs/BloodSugarParser';
import { useUnitsData } from '../../../../context/UnitsContext';

type BloodSugarFormProps = {
  initialValues?: BloodSugarFormData;
  edit?: boolean;
  onSubmit?: (values: NewBloodSugarLog) => void;
  onDelete?: () => void;
  isPending?: boolean;
};

export const BloodSugarForm = ({ edit, onDelete, initialValues, onSubmit, isPending }: BloodSugarFormProps) => {
  const carbsRef = useRef<RNTextInput | null>(null);
  const units = useUnitsData();
  const form = useForm({
    defaultValues: initialValues ?? { ...bloodSugarDefaultValues, date: new Date() },
    resolver: zodResolver(bloodSugarSchema),
  });

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
    /* eslint-disable-next-line */
  }, [initialValues]);

  const handleSubmitForm = (values: BloodSugarFormData) => {
    onSubmit?.(parseBloodSugarFormToApiData(values, units.sugar));
  };

  const handleBloodSugarChange = (value: string) => {
    form.setValue('bloodSugar', value, { shouldValidate: true });
    if (value.length === 5) {
      carbsRef.current?.focus();
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
          <View style={{ flexDirection: 'row', gap: 16, paddingRight: 16 }}>
            <View style={{ width: '50%' }}>
              <NumberInputControlled
                name="bloodSugar"
                label="Blood sugar"
                inputProps={{
                  rightElement: units.sugar === 'mmolL' ? 'mmol/L' : 'mg/dL',
                  maxLength: 5,
                  type: 'float',
                  onChangeText: handleBloodSugarChange,
                }}
              />
            </View>
            <View style={{ width: '50%' }}>
              <NumberInputControlled
                name="carbs"
                label="Carbs"
                inputProps={{ rightElement: 'g', maxLength: 3, type: 'int' }}
                ref={carbsRef}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 16, paddingRight: 16 }}>
            <View style={{ width: '50%' }}>
              <PickerSelectControlled name="meal" label="Meal" items={mealSelectValues} />
            </View>
            <View style={{ width: '50%' }}>
              <PickerSelectControlled name="when" label="When" items={whenSelectValues} />
            </View>
          </View>
          <InsulinList />
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
              title="Delete Blood Sugar log"
              description="Are you sure you want to delete this log?"
              onProceed={() => onDelete?.()}
              disabled={isPending}
            >
              Delete Blood Sugar log
            </DeletionButton>
          ) : null}
          <FormButtonControlled disabled={isPending} edit={edit} onPress={form.handleSubmit(handleSubmitForm)} />
        </View>
      </FormProvider>
    </View>
  );
};
