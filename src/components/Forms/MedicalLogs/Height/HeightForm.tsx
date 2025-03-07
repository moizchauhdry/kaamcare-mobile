import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View } from 'react-native';

import { DateTimePickerControlled } from '../../../UI/Inputs/DateTimePicker/DateTimePickerControlled';
import { NumberInputControlled } from '../../../UI/Inputs/NumberInput/NumberInputControlled';
import { TextInputControlled } from '../../../UI/Inputs/TextInput/TextInputControlled';
import { DeletionButton } from '../../../UI/Button/DeletionButton';
import { FormButtonControlled } from '../../common/FormButtonControlled/FormButtonControlled';
import type { NewHeightLog } from '../../../../model/api/medicalLogs/Height';
import { heightDefaultValues } from '../../../../constants/forms/medicalLogs/height';
import type { HeightFormData } from '../../../../schemas/forms/medicalLogs/height';
import { heightSchema } from '../../../../schemas/forms/medicalLogs/height';
import { parseHeightFormToApiData } from '../../../../model/parsers/medicalLogs/HeightParser';
import { useUnitsData } from '../../../../context/UnitsContext';
import { Typography } from '../../../UI/Typography/Typography';

type HeightFormProps = {
  initialValues?: HeightFormData;
  edit?: boolean;
  isPending?: boolean;
  onSubmit?: (values: NewHeightLog) => void;
  onDelete?: () => void;
};

export const HeightForm = ({ edit, isPending, onDelete, initialValues, onSubmit }: HeightFormProps) => {
  const units = useUnitsData();
  const form = useForm({
    defaultValues: initialValues ?? { ...heightDefaultValues, date: new Date(), unitType: units.length },
    resolver: zodResolver(heightSchema),
  });

  const handleSubmitForm = (values: HeightFormData) => {
    onSubmit?.(parseHeightFormToApiData(values, units.length));
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
          <View style={{ gap: 8 }}>
            <Typography>Height</Typography>
            {units.length === 'FeetInch' ? (
              <View style={{ flex: 1, flexDirection: 'row', gap: 16 }}>
                <View style={{ flex: 0.5 }}>
                  <NumberInputControlled
                    name="heightFeet"
                    inputProps={{ rightElement: 'ft', placeholder: 'Type in...', maxLength: 3 }}
                  />
                </View>
                <View style={{ flex: 0.5 }}>
                  <NumberInputControlled
                    name="heightInch"
                    inputProps={{ rightElement: 'in', placeholder: 'Type in...', maxLength: 3 }}
                  />
                </View>
              </View>
            ) : (
              <View>
                <NumberInputControlled name="heightCm" inputProps={{ rightElement: 'cm', maxLength: 3 }} />
              </View>
            )}
          </View>

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
              title="Delete Height log"
              description="Are you sure you want to delete this log?"
              onProceed={() => onDelete?.()}
              disabled={isPending}
            >
              Delete Height log
            </DeletionButton>
          ) : null}
          <FormButtonControlled edit={edit} onPress={form.handleSubmit(handleSubmitForm)} disabled={isPending} />
        </View>
      </FormProvider>
    </View>
  );
};
