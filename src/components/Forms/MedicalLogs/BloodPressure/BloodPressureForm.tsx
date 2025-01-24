import { KeyboardAvoidingView, Platform, TextInput as RNTextInput, ScrollView, StyleSheet, View } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { DateTimePickerControlled } from '../../../UI/Inputs/DateTimePicker/DateTimePickerControlled';
import { TextInputControlled } from '../../../UI/Inputs/TextInput/TextInputControlled';
import { SwitchSelectorControlled } from '../../../UI/Inputs/SwitchSelector/SwitchSelectorControlled';
import type { BloodPressureFormData } from '../../../../schemas/forms/medicalLogs/bloodPressure';
import { bloodPressureSchema } from '../../../../schemas/forms/medicalLogs/bloodPressure';
import { bloodPressureDefaultValues } from '../../../../constants/forms/medicalLogs/bloodPressure';
import { DeletionButton } from '../../../UI/Button/DeletionButton';
import { FormButtonControlled } from '../../common/FormButtonControlled/FormButtonControlled';
import { NumberInputControlled } from '../../../UI/Inputs/NumberInput/NumberInputControlled';
import type { NewBloodPressureLog } from '../../../../model/api/medicalLogs/BloodPressure';
import { parseBloodPressureFormToApiData } from '../../../../model/parsers/medicalLogs/BloodPressureParser';
import { useUnitsData } from '../../../../context/UnitsContext';
import { useRef, useState } from 'react';
import { ButtonAboveKeyboard } from 'components/UI/Button/Button';

const mmHgData = {
  // rightElement: 'mmHg',
  maxLength: 3,
};

const kPaData = {
  // rightElement: 'kPa',
  maxLength: 5,
  type: 'float',
};

type BloodPressureFormProps = {
  initialValues?: BloodPressureFormData;
  edit?: boolean;
  onSubmit?: (values: NewBloodPressureLog) => void;
  onDelete?: () => void;
  isPending?: boolean;
};

export const BloodPressureForm = ({ initialValues, edit, onSubmit, onDelete, isPending }: BloodPressureFormProps) => {
  const [MaxLength, setMaxLength] = useState<any>(3);
  const diastolicRef = useRef<RNTextInput | null>(null);
  const pulseRef = useRef<RNTextInput | null>(null);
  const units = useUnitsData();
  const form = useForm({
    defaultValues: initialValues
      ? { ...initialValues, unit: units.pressure }
      : {
          ...bloodPressureDefaultValues,
          unit: units.pressure,
          date: new Date(),
        },
    resolver: zodResolver(bloodPressureSchema),
  });

  const handleSubmitForm = (values: BloodPressureFormData) => {
    onSubmit?.(parseBloodPressureFormToApiData(values, units.pressure));
  };

  const handleSystolicChange = (value: any) => {
    const firstDigit = parseInt(value[0], 10);
    const numericValue = parseInt(value, 10);
    if (firstDigit === 1 || firstDigit === 2) {
      setMaxLength(3);
    } else {
      setMaxLength(2);
    }

    if (
      (firstDigit === 1 && numericValue >= 100 && numericValue <= 199) ||
      (firstDigit === 2 && numericValue >= 200 && numericValue <= 299) ||
      (firstDigit >= 3 && numericValue >= 30 && numericValue <= 99)
    ) {
      form.setValue('systolic', value);
      diastolicRef.current?.focus();
    }
  };

  // const handleSystolicChange = (value: any) => {
  //   const numericValue = parseInt(value, 10);

  //   if (!isNaN(numericValue) && numericValue >= 30 && numericValue <= 299) {
  //     form.setValue('systolic', value);
  //     diastolicRef.current?.focus();
  //   } else if (value === '') {
  //     form.setValue('systolic', '');
  //   } else {
  //     console.log('Invalid input: Value must be between 30 and 299');
  //   }
  // };

  const handleDiastolicChange = (value: any) => {
    const firstDigit = parseInt(value[0], 10);
    const numericValue = parseInt(value, 10);

    if (firstDigit === 1 || firstDigit === 2) {
      setMaxLength(3);
    } else {
      setMaxLength(2);
    }

    if (
      (firstDigit === 1 && numericValue >= 100 && numericValue <= 199) ||
      (firstDigit === 2 && numericValue >= 200 && numericValue <= 299) ||
      (firstDigit >= 3 && numericValue >= 30 && numericValue <= 99)
    ) {
      form.setValue('diastolic', value);
      pulseRef.current?.focus();
    }
  };

  const handlePulsecChange = (value: any) => {
    const firstDigit = parseInt(value[0], 10);
    const numericValue = parseInt(value, 10);
    if (firstDigit === 1 || firstDigit === 2) {
      setMaxLength(3);
    } else {
      setMaxLength(2);
    }

    if (
      (firstDigit === 1 && numericValue >= 100 && numericValue <= 199) ||
      (firstDigit === 2 && numericValue >= 200 && numericValue <= 299) ||
      (firstDigit >= 3 && numericValue >= 30 && numericValue <= 99)
    ) {
      form.setValue('pulse', value);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Adjust offset as needed
    >
      <FormProvider {...form}>
        <View style={{ gap: 16 }}>
          <DateTimePickerControlled
            name="date"
            label="Date and time"
            inputProps={{ forbidFuture: true, mode: 'datetime', placeholder: 'MM/DD/YYYY, hh:mm' }}
          />
          <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <NumberInputControlled
                name="systolic"
                label="Systolic"
                inputProps={{
                  placeholder: 'mmHg',
                  onChangeText: handleSystolicChange,
                  maxLength: MaxLength,
                  // ...(units.pressure === 'mmHg' ? mmHgData : kPaData),
                }}
              />
            </View>

            <View style={{ flex: 1 }}>
              <NumberInputControlled
                name="diastolic"
                label="Diastolic"
                inputProps={{
                  placeholder: 'mmHg',
                  // ...(units.pressure === 'mmHg' ? mmHgData : kPaData),
                  maxLength: MaxLength,
                  onChangeText: handleDiastolicChange,
                }}
                ref={diastolicRef}
              />
            </View>

            <View style={{ flex: 1 }}>
              <NumberInputControlled
                name="pulse"
                label="Pulse"
                inputProps={{ maxLength: MaxLength, placeholder: 'bpm', onChangeText: handlePulsecChange }}
                ref={pulseRef}
              />
            </View>
          </View>

          <SwitchSelectorControlled
            name="measurementPosition"
            label="Measurement position"
            options={[
              { value: 'Lying', label: 'Lying' },
              { value: 'Sitting', label: 'Sitting' },
              { value: 'Standing', label: 'Standing' },
            ]}
          />
          <SwitchSelectorControlled
            name="measurementSide"
            label="Measurement side"
            options={[
              { value: 'Left', label: 'Left' },
              { value: 'Right', label: 'Right' },
            ]}
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
              title="Delete Blood Pressure log"
              description="Are you sure you want to delete this log?"
              onProceed={() => onDelete?.()}
              disabled={isPending}
            >
              Delete Blood Pressure log
            </DeletionButton>
          ) : null}
        </View>
        <FormButtonControlled edit={edit} onPress={form.handleSubmit(handleSubmitForm)} disabled={isPending} />
      </FormProvider>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
