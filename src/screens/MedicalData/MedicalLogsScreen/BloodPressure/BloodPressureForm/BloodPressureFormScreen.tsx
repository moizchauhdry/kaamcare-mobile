import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Animated, Keyboard, TextInput as RNTextInput, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Button } from 'components/UI/Button/Button';
import { Card } from 'components/UI/Card/Card';
import PreHypertensionCard from 'components/UI/Card/PreHypertensionCard';
import { SwitchSelectorControlled2o } from 'components/UI/Inputs/SwitchSelector/SwitchSelectorController2o';
import { Typography } from 'components/UI/Typography/Typography';
import { theme } from 'config/Theme';
import checkboxChecked from '../../../../../assets/icons/check-square.svg';
import LeftHandIconFilled from '../../../../../assets/icons/left-hand-filled.svg';
import LeftHandIcon from '../../../../../assets/icons/left-hand-unfilled.svg';
import LyingIconFilled from '../../../../../assets/icons/lying-filled.svg';
import LyingIcon from '../../../../../assets/icons/lying-unfilled.svg';
import RightHandIconFilled from '../../../../../assets/icons/right-hand-filled.svg';
import RightHandIcon from '../../../../../assets/icons/right-hand-unfilled.svg';
import SittingIconFilled from '../../../../../assets/icons/sitting-filled.svg';
import SittingIcon from '../../../../../assets/icons/sitting-unfilled.svg';
import checkboxSquare from '../../../../../assets/icons/square-empty.svg';
import StandingIconFilled from '../../../../../assets/icons/standing-filled.svg';
import StandingIcon from '../../../../../assets/icons/standing-unfilled.svg';
import { FormSkeleton } from '../../../../../components/Forms/FormSkeleton';
import { ScreenModalLayout } from '../../../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import type { AddMedicalDataNavigationParamsList } from '../../../../../components/Navigation/AddMedicalDataNavigation';
import { DeletionButton } from '../../../../../components/UI/Button/DeletionButton';
import { TextInputControlled } from '../../../../../components/UI/Inputs/TextInput/TextInputControlled';
import { bloodPressureDefaultValues } from '../../../../../constants/forms/medicalLogs/bloodPressure';
import { useUnitsData } from '../../../../../context/UnitsContext';
import { useMutationBloodPressureLogAdd } from '../../../../../hooks/query/medicalLogs/bloodPressure/useMutationBloodPressureLogAdd';
import { useMutationBloodPressureLogDelete } from '../../../../../hooks/query/medicalLogs/bloodPressure/useMutationBloodPressureLogDelete';
import { useMutationBloodPressureLogUpdate } from '../../../../../hooks/query/medicalLogs/bloodPressure/useMutationBloodPressureLogUpdate';
import { useQueryBloodPressureLog } from '../../../../../hooks/query/medicalLogs/bloodPressure/useQueryBloodPressureLog';
import { parseBloodPressureFormToApiData } from '../../../../../model/parsers/medicalLogs/BloodPressureParser';
import { bloodPressureSchema } from '../../../../../schemas/forms/medicalLogs/bloodPressure';

import { useNavigation } from '@react-navigation/native';
import { DateTimePickerControlled2o } from 'components/UI/Inputs/DateTimePicker/DateTimePickerControlled2o';
import { NumberInputControlled2o } from 'components/UI/Inputs/NumberInput/NumberInputControlled2o';
import { ModalGrabber } from 'components/UI/ModalGrabber/ModalGrabber';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack';
import { SvgXml } from 'react-native-svg';
import { getDateFromSeparatedModel } from 'utils/date/date';

type BloodPressureFormScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'BloodPressureForm'>;

export const BloodPressureFormScreen = ({ route }: BloodPressureFormScreenProps) => {
  const { pressure } = useUnitsData();
  const navigation = useNavigation();
  const edit = route.params?.edit;
  const id = route.params?.id;
  const days = route.params?.days;
  const refRBSheet = useRef<any>(null);
  const [selectedDate, setSelectedDate] = useState(moment().format('DD-MM-YYYY'));

  const { data: initialValues, isLoading } = useQueryBloodPressureLog(id!, { enabled: Boolean(id) });
  const mutationAdd = useMutationBloodPressureLogAdd(days);
  const mutationUpdate = useMutationBloodPressureLogUpdate(id!, days);
  const mutationDelete = useMutationBloodPressureLogDelete(id!, days);
  const openBottomSheet = useCallback(() => {
    refRBSheet.current?.open();
  }, []);
  const form = useForm({
    defaultValues: initialValues
      ? {
          ...initialValues,
          unit: pressure,
          systolic: String(initialValues.millimetersOfMercurySystolic),
          diastolic: String(initialValues.millimetersOfMercuryDiastolic),
          pulse: initialValues.pulse,
          measurementPosition: initialValues.position,
          measurementSide: initialValues.side,
          explanation: initialValues.explanation,
          date: new Date(),
        }
      : {
          ...bloodPressureDefaultValues,
          unit: pressure,
          date: new Date(),
        },
    resolver: zodResolver(bloodPressureSchema),
  });

  useEffect(() => {
    if (initialValues) {
      const dateObject = getDateFromSeparatedModel(initialValues.date);

      const formattedDate = moment(dateObject).format('DD-MM-YYYY');
      setSelectedDate(formattedDate);
      form.reset({
        ...initialValues,
        unit: pressure,
        systolic: String(initialValues.millimetersOfMercurySystolic),
        diastolic: String(initialValues.millimetersOfMercuryDiastolic),
        pulse: initialValues.pulse,
        measurementPosition: initialValues.position,
        measurementSide: initialValues.side,
        explanation: initialValues.explanation,
        date: dateObject, // Use the converted date object
      });
    }
  }, [initialValues, form, pressure]);
  // Pass the callback to the navigation options
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <ModalGrabber
          title={selectedDate}
          onPress={openBottomSheet} // Open the bottom sheet on title press
        />
      ),
    });
  }, [navigation, openBottomSheet, selectedDate]);
  const [MaxLength, setMaxLength] = useState(3);
  const diastolicRef = useRef<RNTextInput | null>(null);
  const pulseRef = useRef<RNTextInput | null>(null);
  const [keyboardHeight] = useState(new Animated.Value(0));
  const [arythmiaDetected, setArythmiaDetected] = useState(false);

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
  const handleDateSelect = (date: Date) => {
    // console.log('date===', date);

    const formattedDate = moment(date).format('DD-MM-YYYY');
    setSelectedDate(formattedDate); // Update the selected date
    // refRBSheet.current?.close(); // Close the bottom sheet
  };
  return (
    <View style={styles.container}>
      <ScreenModalLayout title="" isScrollable>
        {edit && isLoading ? (
          <FormSkeleton />
        ) : (
          <FormProvider {...form}>
            <View style={{ gap: 16, marginTop: -16, marginBottom: 50 }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  justifyContent: 'space-between',
                  overflow: 'hidden',
                }}
              >
                <NumberInputControlled2o
                  name="systolic"
                  label="Systolic"
                  inputProps={{
                    placeholder: 'mmhg',
                    maxLength: MaxLength,
                    onChangeText: handleSystolicChange,
                  }}
                />
                <NumberInputControlled2o
                  name="diastolic"
                  label="Diastolic"
                  inputProps={{
                    placeholder: 'mmhg',
                    maxLength: MaxLength,
                    onChangeText: handleDiastolicChange,
                  }}
                  ref={diastolicRef}
                />
                <NumberInputControlled2o
                  name="pulse"
                  label="Pulse"
                  inputProps={{
                    placeholder: 'BPM',
                    maxLength: MaxLength,
                    onChangeText: handlePulsecChange,
                  }}
                  ref={pulseRef}
                />
              </View>

              <View style={{}}>
                <PreHypertensionCard />
              </View>

              <SwitchSelectorControlled2o
                name="measurementSide"
                label="Measured arm"
                options={[
                  { value: 'Right', label: 'Right', icon: RightHandIcon, filledIcon: RightHandIconFilled },
                  { value: 'Left', label: 'Left', icon: LeftHandIcon, filledIcon: LeftHandIconFilled },
                ]}
              />
              <SwitchSelectorControlled2o
                name="measurementPosition"
                label="Body position"
                options={[
                  { value: 'Sitting', label: 'Sitting', icon: SittingIcon, filledIcon: SittingIconFilled },
                  { value: 'Lying', label: 'Lying', icon: LyingIcon, filledIcon: LyingIconFilled },
                  { value: 'Standing', label: 'Standing', icon: StandingIcon, filledIcon: StandingIconFilled },
                ]}
              />
              <Card style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 }}>
                <Typography
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    color: theme.colors.textPrimary,
                  }}
                >
                  Arrythmia detected
                </Typography>
                <TouchableOpacity onPress={() => setArythmiaDetected(!arythmiaDetected)}>
                  <SvgXml width={17} height={17} xml={arythmiaDetected ? checkboxChecked : checkboxSquare} />
                </TouchableOpacity>
              </Card>
              <TextInputControlled
                name="explanation"
                label="Enter Comments"
                inputProps={{
                  placeholder: 'Enter your comments here ...',
                  maxLength: 240,
                  style: { height: 160, borderColor: theme.colors.backgroundDark, borderWidth: 1 },
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
            <RBSheet
              ref={refRBSheet}
              draggable
              customModalProps={{
                animationType: 'slide',
                statusBarTranslucent: true,
              }}
              customStyles={{
                container: {
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  paddingBottom: 10,
                  height: 300,
                },
                draggableIcon: {
                  width: 80,
                },
              }}
            >
              <View style={{ margin: 15, gap: 20 }}>
                <DateTimePickerControlled2o
                  name="date"
                  label="Date and time"
                  inputProps={{
                    forbidFuture: true,
                    mode: 'datetime',
                    placeholder: 'MM/DD/YYYY, hh:mm',
                    editable: false,
                    onChange: (event) => {
                      if (event instanceof Date) {
                        handleDateSelect(event);
                      } else if (event && event.nativeEvent && event.nativeEvent.text) {
                        handleDateSelect(new Date(event.nativeEvent.text));
                      }
                    },
                  }}
                />
                <Button onPress={() => refRBSheet.current?.close()}>Done</Button>
              </View>
            </RBSheet>
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
