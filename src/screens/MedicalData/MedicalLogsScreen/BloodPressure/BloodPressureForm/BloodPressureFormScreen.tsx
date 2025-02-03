import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  TextInput as RNTextInput,
  Keyboard,
  Animated,
} from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ScreenModalLayout } from '../../../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { DateTimePickerControlled } from '../../../../../components/UI/Inputs/DateTimePicker/DateTimePickerControlled';
import { TextInputControlled } from '../../../../../components/UI/Inputs/TextInput/TextInputControlled';
import { SwitchSelectorControlled } from '../../../../../components/UI/Inputs/SwitchSelector/SwitchSelectorControlled';
import { NumberInputControlled } from '../../../../../components/UI/Inputs/NumberInput/NumberInputControlled';
import { DeletionButton } from '../../../../../components/UI/Button/DeletionButton';
import { Button } from 'components/UI/Button/Button';
import { bloodPressureSchema } from '../../../../../schemas/forms/medicalLogs/bloodPressure';
import { bloodPressureDefaultValues } from '../../../../../constants/forms/medicalLogs/bloodPressure';
import { parseBloodPressureFormToApiData } from '../../../../../model/parsers/medicalLogs/BloodPressureParser';
import { useUnitsData } from '../../../../../context/UnitsContext';
import { useQueryBloodPressureLog } from '../../../../../hooks/query/medicalLogs/bloodPressure/useQueryBloodPressureLog';
import { useMutationBloodPressureLogAdd } from '../../../../../hooks/query/medicalLogs/bloodPressure/useMutationBloodPressureLogAdd';
import { useMutationBloodPressureLogUpdate } from '../../../../../hooks/query/medicalLogs/bloodPressure/useMutationBloodPressureLogUpdate';
import { useMutationBloodPressureLogDelete } from '../../../../../hooks/query/medicalLogs/bloodPressure/useMutationBloodPressureLogDelete';
import { FormSkeleton } from '../../../../../components/Forms/FormSkeleton';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';

type BloodPressureFormScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'BloodPressureForm'>;

export const BloodPressureFormScreen = ({ route }: BloodPressureFormScreenProps) => {
  const { pressure } = useUnitsData();
  const edit = route.params?.edit;
  const id = route.params?.id;
  const days = route.params?.days;

  const { data: initialValues, isLoading } = useQueryBloodPressureLog(id!, { enabled: Boolean(id) });
  const mutationAdd = useMutationBloodPressureLogAdd(days);
  const mutationUpdate = useMutationBloodPressureLogUpdate(id!, days);
  const mutationDelete = useMutationBloodPressureLogDelete(id!, days);

  const [MaxLength, setMaxLength] = useState(3);
  const diastolicRef = useRef<RNTextInput | null>(null);
  const pulseRef = useRef<RNTextInput | null>(null);
  const [keyboardHeight] = useState(new Animated.Value(0));

  React.useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardWillShow', (event) => {
      Animated.timing(keyboardHeight, {
        toValue: event.endCoordinates.height,
        duration: event.duration,
        useNativeDriver: false,
      }).start();
    });

    const keyboardWillHide = Keyboard.addListener('keyboardWillHide', (event) => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: event.duration,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, [keyboardHeight]);

  const form = useForm({
    defaultValues: initialValues
      ? { ...initialValues, unit: pressure }
      : {
          ...bloodPressureDefaultValues,
          unit: pressure,
          date: new Date(),
        },
    resolver: zodResolver(bloodPressureSchema),
  });

  const handleSubmitForm = (values: any) => {
    const parsedValues = parseBloodPressureFormToApiData(values, pressure);
    edit && initialValues
      ? mutationUpdate.mutate({ ...initialValues, ...parsedValues, id: id! })
      : mutationAdd.mutate(parsedValues);
  };

  const handleSystolicChange = (value: any) => {
    const firstDigit = parseInt(value[0], 10);
    const numericValue = parseInt(value, 10);
    form.setValue('systolic', value, { shouldValidate: true });
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

  const handleDiastolicChange = (value: any) => {
    const firstDigit = parseInt(value[0], 10);
    const numericValue = parseInt(value, 10);
    form.setValue('diastolic', value, { shouldValidate: true });

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
    form.setValue('pulse', value, { shouldValidate: true });

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
    <View style={styles.container}>
      <ScreenModalLayout title="Blood Pressure & Pulse" isScrollable>
        {edit && isLoading ? (
          <FormSkeleton />
        ) : (
          <FormProvider {...form}>
            <View style={{ gap: 16 }}>
              <DateTimePickerControlled
                name="date"
                label="Date and time"
                inputProps={{ forbidFuture: true, mode: 'datetime', placeholder: 'MM/DD/YYYY, hh:mm' }}
              />
              <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'space-between' }}>
                <NumberInputControlled
                  name="systolic"
                  label="Systolic"
                  inputProps={{
                    placeholder: 'mmHg',
                    maxLength: MaxLength,
                    onChangeText: handleSystolicChange,
                  }}
                />
                <NumberInputControlled
                  name="diastolic"
                  label="Diastolic"
                  inputProps={{
                    placeholder: 'mmHg',
                    maxLength: MaxLength,
                    onChangeText: handleDiastolicChange,
                  }}
                  ref={diastolicRef}
                />
                <NumberInputControlled
                  name="pulse"
                  label="Pulse"
                  inputProps={{
                    placeholder: 'bpm',
                    maxLength: MaxLength,
                    onChangeText: handlePulsecChange,
                  }}
                  ref={pulseRef}
                />
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
                  placeholder: 'Enter relevant information...',
                  maxLength: 240,
                  style: { height: 160 },
                }}
              />
              {edit && (
                <DeletionButton
                  title="Delete Blood Pressure log"
                  description="Are you sure you want to delete this log?"
                  onProceed={() => mutationDelete.mutate(id!)}
                  disabled={mutationDelete.isPending}
                />
              )}
            </View>
          </FormProvider>
        )}
      </ScreenModalLayout>
      <Animated.View style={[styles.buttonWrapper, { bottom: keyboardHeight }]}>
        <Button variant="default" onPress={form.handleSubmit(handleSubmitForm)}>
          Save
        </Button>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonWrapper: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
