import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View } from 'react-native';

import { medicationFormDefaultValues } from '../../../../constants/forms/medicalhistory/medication';
import { TextInputControlled } from '../../../UI/Inputs/TextInput/TextInputControlled';
import { DeletionButton } from '../../../UI/Button/DeletionButton';
import { FormButtonControlled } from '../../common/FormButtonControlled/FormButtonControlled';
import type { MedicationFormData } from '../../../../schemas/forms/medicalHistory/medication';
import { medicationSchema } from '../../../../schemas/forms/medicalHistory/medication';
import { parseMedicationFormToApiData } from '../../../../model/parsers/medicalHistory/MedicationParser';
import type { NewMedication } from '../../../../model/api/medicalHistory/Medications';
import { NumberInputControlled } from '../../../UI/Inputs/NumberInput/NumberInputControlled';

type MedicationFormProps = {
  medicationName: string;
  initialValues?: MedicationFormData;
  edit?: boolean;
  onSubmit?: (values: NewMedication) => void;
  onDelete?: () => void;
  isPending?: boolean;
};

export const MedicationForm = ({
  onDelete,
  onSubmit,
  initialValues,
  edit,
  medicationName,
  isPending,
}: MedicationFormProps) => {
  const form = useForm<MedicationFormData>({
    defaultValues: initialValues ?? medicationFormDefaultValues,
    resolver: zodResolver(medicationSchema),
  });

  const handleSubmitForm = (values: MedicationFormData) => {
    onSubmit?.(parseMedicationFormToApiData(values, medicationName));
  };

  return (
    <View style={{ flex: 1 }}>
      <FormProvider {...form}>
        <View style={{ gap: 16 }}>
          <TextInputControlled name="form" label="Form" inputProps={{ placeholder: 'E.g. tablet', maxLength: 50 }} />
          <View style={{ gap: 8, flexDirection: 'row', paddingRight: 8 }}>
            <View style={{ width: '50%' }}>
              <NumberInputControlled
                name="dose"
                label="Dose"
                inputProps={{ keyboardType: 'numeric', placeholder: 'E.g. 10', maxLength: 9 }}
              />
            </View>
            <View style={{ width: '50%' }}>
              <TextInputControlled name="units" label="Units" inputProps={{ placeholder: 'E.g. mg', maxLength: 10 }} />
            </View>
          </View>
          <TextInputControlled name="route" label="Route" inputProps={{ placeholder: 'E.g. oral', maxLength: 50 }} />
          <TextInputControlled
            name="frequency"
            label="Frequency"
            inputProps={{ placeholder: 'E.g. daily', maxLength: 60 }}
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
              title="Delete Medication"
              listName="Medications"
              name={medicationName}
              onProceed={() => onDelete?.()}
            >
              Delete medication
            </DeletionButton>
          ) : null}
          <FormButtonControlled
            edit={edit}
            onPress={form.handleSubmit(handleSubmitForm)}
            enabled
            disabled={isPending}
          />
        </View>
      </FormProvider>
    </View>
  );
};
