import { FormProvider, useForm } from 'react-hook-form';
import { TouchableWithoutFeedback, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useEffect } from 'react';

import { PhoneNumberInputControlled } from 'components/UI/Inputs/PhoneNumberInput/PhoneNumberInputControlled';

import { TextInputControlled } from '../../UI/Inputs/TextInput/TextInputControlled';
import { DateTimePickerControlled } from '../../UI/Inputs/DateTimePicker/DateTimePickerControlled';
import { Typography } from '../../UI/Typography/Typography';
import plusCircle from '../../../assets/icons/plus-circle.svg';
import {
  bloodTypeLetter,
  bloodTypeSign,
  formDefaultValues,
  genderPickerData,
} from '../../../constants/forms/personalInformation';
import { PickerSelectControlled } from '../../UI/Inputs/PickerSelect/PickerSelectControlled';
import { Button } from '../../UI/Button/Button';
import {
  type PersonalInformationFormData,
  personalInformationSchema,
} from '../../../schemas/forms/personalInformation';
import { styles } from './PersonalInformationForm.styles';
import { MultiColumnPickerSelectControlled } from '../../UI/Inputs/MulticolumnPickerSelect/MultiColumnPickerSelectControlled';
import { useUnitsData } from '../../../context/UnitsContext';
import type { TabNavigatorParamsList } from '../../Navigation/LoggednNavigation';

type PersonalInformationFormProps = {
  initialValues?: PersonalInformationFormData;
  onSubmit?: (values: PersonalInformationFormData) => void;
};

const getFilledValues = (values: PersonalInformationFormData) => {
  const newValues: PersonalInformationFormData = {
    email: values.email,
  };

  Object.keys(values).map((elem) => {
    const key = elem as keyof PersonalInformationFormData;
    if (values[key]) {
      if (key === 'labelWeight' || key === 'labelHeight') {
        return key;
      }

      newValues[key] = values[key] as string & Date;
    }

    return key;
  });

  return newValues;
};

export const PersonalInformationForm = ({ initialValues, onSubmit }: PersonalInformationFormProps) => {
  const navigation = useNavigation<StackNavigationProp<TabNavigatorParamsList>>();
  const { mass, length } = useUnitsData();
  const form = useForm<PersonalInformationFormData>({
    defaultValues: initialValues ?? formDefaultValues,
    resolver: zodResolver(personalInformationSchema),
  });
  const { isDirty, disabled, isSubmitting } = form.formState;

  useEffect(() => {
    if (initialValues) {
      const values = form.getValues();
      const properValues = getFilledValues(values);

      form.reset({ ...initialValues, ...properValues });
    }
  }, [form, initialValues]);

  const handleSubmitForm = (values: PersonalInformationFormData) => {
    const properValues = { ...values };
    delete properValues.labelHeight;
    delete properValues.labelWeight;

    onSubmit?.(properValues);
  };

  return (
    <View style={styles.container}>
      <FormProvider {...form}>
        <TextInputControlled name="firstName" label="First name" inputProps={{ maxLength: 60 }} />
        <TextInputControlled name="lastName" label="Last name" inputProps={{ maxLength: 60 }} />
        <DateTimePickerControlled name="dateOfBirth" label="Date of birth" inputProps={{ forbidFuture: true }} />
        <PhoneNumberInputControlled name="phoneNumber" label="Phone number" />
        <TextInputControlled name="email" label="Email" inputProps={{ maxLength: 60 }} />
        <View style={styles.doubleInputContainer}>
          <View style={styles.doubleInputWrapper}>
            <TextInputControlled
              name="labelWeight"
              label="Weight"
              inputProps={{
                readOnly: true,
                disabled: true,
                rightElement: ({ disabled: inputDisabled }) => (
                  <Typography color={inputDisabled ? 'gray' : 'primary'}>{mass === 'Pound' ? 'lbs' : 'kg'}</Typography>
                ),
              }}
            />
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('MedicalDataNavigation', {
                  screen: 'WeightForm',
                  params: {
                    edit: false,
                    redirectScreen: 'personal',
                  },
                })
              }
            >
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <SvgXml xml={plusCircle} />
                <Typography color="secondary">Log Weight</Typography>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.doubleInputWrapper}>
            <TextInputControlled
              name="labelHeight"
              label="Height"
              inputProps={{
                readOnly: true,
                disabled: true,
                rightElement: ({ disabled: inputDisabled }) => (
                  <Typography color={inputDisabled ? 'gray' : 'primary'}>
                    {length === 'FeetInch' ? 'ft' : 'cm'}
                  </Typography>
                ),
              }}
            />
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('MedicalDataNavigation', {
                  screen: 'HeightForm',
                  params: {
                    edit: false,
                    redirectScreen: 'personal',
                  },
                })
              }
            >
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <SvgXml xml={plusCircle} />
                <Typography color="secondary">Log Height</Typography>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.doubleInputContainer}>
          <View style={{ width: '50%' }}>
            <MultiColumnPickerSelectControlled
              label="Blood type"
              name="bloodType"
              pickerProps={{
                pickerProps: [
                  { data: bloodTypeLetter, initialValue: 'A' },
                  { data: bloodTypeSign, initialValue: 'Positive' },
                ],
                valueSplittingSuffix: ['Negative', 'Positive'],
                joinSeparator: '',
              }}
            />
          </View>
          <View style={{ width: '50%' }}>
            <PickerSelectControlled label="Gender" name="gender" items={genderPickerData} />
          </View>
        </View>

        <View style={{ paddingTop: 16 }}>
          <Button onPress={form.handleSubmit(handleSubmitForm)} disabled={disabled || !isDirty || isSubmitting}>
            Update
          </Button>
        </View>
      </FormProvider>
    </View>
  );
};
