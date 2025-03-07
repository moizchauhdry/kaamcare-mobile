import { View } from 'react-native';
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

const mmHgData = {
  rightElement: 'mmHg',
  maxLength: 3,
};

const kPaData = {
  rightElement: 'kPa',
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
                name="systolic"
                label="Systolic"
                inputProps={units.pressure === 'mmHg' ? mmHgData : kPaData}
              />
            </View>
            <View style={{ width: '50%' }}>
              <NumberInputControlled
                name="diastolic"
                label="Diastolic"
                inputProps={units.pressure === 'mmHg' ? mmHgData : kPaData}
              />
            </View>
          </View>
          <NumberInputControlled name="pulse" label="Pulse" inputProps={{ rightElement: 'bpm', maxLength: 3 }} />
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
          <FormButtonControlled edit={edit} onPress={form.handleSubmit(handleSubmitForm)} disabled={isPending} />
        </View>
      </FormProvider>
    </View>
  );
};
