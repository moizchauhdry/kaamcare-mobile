import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View } from 'react-native';

import { TextInputControlled } from 'components/UI/Inputs/TextInput/TextInputControlled';
import { DeletionButton } from 'components/UI/Button/DeletionButton';
import { FormButtonControlled } from 'components/Forms/common/FormButtonControlled/FormButtonControlled';
import { socialHistoryDrugUseFormDefaultValues } from 'constants/forms/medicalhistory/socialHistory';
import { parseSocialHistoryDrugUseFormToApiData } from 'model/parsers/medicalHistory/SocialHistoryParser';

import type { SocialHistoryDrugUseFormData } from '../../../../../schemas/forms/medicalHistory/socialHistory/drugUse';
import { socialHistoryDrugUseSchema } from '../../../../../schemas/forms/medicalHistory/socialHistory/drugUse';
import { SwitchSelectorControlled } from '../../../../UI/Inputs/SwitchSelector/SwitchSelectorControlled';
import {
  socialHistoryDurationNumbers,
  socialHistoryDurationText,
  socialHistoryDurationTextSingle,
} from '../../../../../constants/data/medicalHistory/socialHistory';
import { MultiColumnPickerSelectControlled } from '../../../../UI/Inputs/MulticolumnPickerSelect/MultiColumnPickerSelectControlled';
import type { NewSocialHistory } from '../../../../../model/api/medicalHistory/SocialHistory';

type DrugUseFormProps = {
  initialValues?: SocialHistoryDrugUseFormData;
  edit?: boolean;
  onSubmit?: (values: NewSocialHistory) => void;
  onDelete?: () => void;
  isPending?: boolean;
};

export const DrugUseForm = ({ onDelete, onSubmit, initialValues, edit, isPending }: DrugUseFormProps) => {
  const form = useForm<SocialHistoryDrugUseFormData>({
    defaultValues: initialValues ?? socialHistoryDrugUseFormDefaultValues,
    resolver: zodResolver(socialHistoryDrugUseSchema),
  });

  const handleSubmitForm = (values: SocialHistoryDrugUseFormData) => {
    onSubmit?.(parseSocialHistoryDrugUseFormToApiData(values));
  };

  return (
    <View style={{ flex: 1 }}>
      <FormProvider {...form}>
        <View style={{ gap: 16 }}>
          <TextInputControlled name="type" label="Type" inputProps={{ maxLength: 60 }} />
          <TextInputControlled
            name="frequency"
            label="Frequency"
            inputProps={{ placeholder: 'E.g. daily', maxLength: 50 }}
          />
          <TextInputControlled name="route" label="Route" />
          <MultiColumnPickerSelectControlled
            name="duration"
            label="How long?"
            pickerProps={{
              textInputProps: {
                placeholder: 'Choose',
              },
              pickerProps: [
                { data: socialHistoryDurationNumbers },
                { data: socialHistoryDurationText, singleData: socialHistoryDurationTextSingle },
              ],
            }}
          />
          <SwitchSelectorControlled
            name="status"
            label="Status"
            options={[
              { value: 'Current', label: 'Current' },
              { value: 'Former', label: 'Former' },
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
            <DeletionButton title="Delete Alcohol" onProceed={() => onDelete?.()}>
              Delete alcohol
            </DeletionButton>
          ) : null}
          <FormButtonControlled edit={edit} onPress={form.handleSubmit(handleSubmitForm)} disabled={isPending} />
        </View>
      </FormProvider>
    </View>
  );
};
