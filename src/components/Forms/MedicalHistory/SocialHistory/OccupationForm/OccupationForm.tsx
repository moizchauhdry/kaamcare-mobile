import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View } from 'react-native';

import { TextInputControlled } from 'components/UI/Inputs/TextInput/TextInputControlled';
import { DeletionButton } from 'components/UI/Button/DeletionButton';
import { FormButtonControlled } from 'components/Forms/common/FormButtonControlled/FormButtonControlled';
import { socialHistoryOccupationFormDefaultValues } from 'constants/forms/medicalhistory/socialHistory';
import { parseSocialHistoryOccupationFormToApiData } from 'model/parsers/medicalHistory/SocialHistoryParser';

import type { SocialHistoryOccupationFormData } from '../../../../../schemas/forms/medicalHistory/socialHistory/occupation';
import { socialHistoryOccupationSchema } from '../../../../../schemas/forms/medicalHistory/socialHistory/occupation';
import {
  socialHistoryDurationNumbers,
  socialHistoryDurationText,
  socialHistoryDurationTextSingle,
} from '../../../../../constants/data/medicalHistory/socialHistory';
import { MultiColumnPickerSelectControlled } from '../../../../UI/Inputs/MulticolumnPickerSelect/MultiColumnPickerSelectControlled';
import { SwitchSelectorControlled } from '../../../../UI/Inputs/SwitchSelector/SwitchSelectorControlled';
import type { NewSocialHistory } from '../../../../../model/api/medicalHistory/SocialHistory';

type OccupationFormProps = {
  initialValues?: SocialHistoryOccupationFormData;
  edit?: boolean;
  onSubmit?: (values: NewSocialHistory) => void;
  onDelete?: () => void;
  isPending?: boolean;
};

export const OccupationForm = ({ onDelete, onSubmit, initialValues, edit, isPending }: OccupationFormProps) => {
  const form = useForm<SocialHistoryOccupationFormData>({
    defaultValues: initialValues ?? socialHistoryOccupationFormDefaultValues,
    resolver: zodResolver(socialHistoryOccupationSchema),
  });

  const handleSubmitForm = (values: SocialHistoryOccupationFormData) => {
    onSubmit?.(parseSocialHistoryOccupationFormToApiData(values));
  };

  return (
    <View style={{ flex: 1 }}>
      <FormProvider {...form}>
        <View style={{ gap: 16 }}>
          <TextInputControlled name="type" label="Type" inputProps={{ maxLength: 60 }} />
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
            <DeletionButton title="Delete Occupation Item" onProceed={() => onDelete?.()}>
              Delete occupation
            </DeletionButton>
          ) : null}
          <FormButtonControlled edit={edit} onPress={form.handleSubmit(handleSubmitForm)} disabled={isPending} />
        </View>
      </FormProvider>
    </View>
  );
};
