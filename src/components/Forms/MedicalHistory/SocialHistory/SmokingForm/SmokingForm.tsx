import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View } from 'react-native';
import { useEffect } from 'react';

import { TextInputControlled } from 'components/UI/Inputs/TextInput/TextInputControlled';
import { DeletionButton } from 'components/UI/Button/DeletionButton';
import { FormButtonControlled } from 'components/Forms/common/FormButtonControlled/FormButtonControlled';
import type { SocialHistorySmokingFormData } from 'schemas/forms/medicalHistory/socialHistory/smoking';
import { socialHistorySmokingSchema } from 'schemas/forms/medicalHistory/socialHistory/smoking';
import { socialHistorySmokingFormDefaultValues } from 'constants/forms/medicalhistory/socialHistory';
import { CustomSelectControlled } from 'components/UI/Inputs/Custom/CustomSelectControlled';
import {
  parseSocialHistorySmokingApiToFormData,
  parseSocialHistorySmokingFormToApiData,
} from 'model/parsers/medicalHistory/SocialHistoryParser';
import {
  socialHistoryCommonSmokingType,
  socialHistoryDurationNumbers,
  socialHistoryDurationText,
  socialHistoryDurationTextSingle,
  socialHistoryDynamicSmokingType,
} from 'constants/data/medicalHistory/socialHistory';

import { SwitchSelectorControlled } from '../../../../UI/Inputs/SwitchSelector/SwitchSelectorControlled';
import { MultiColumnPickerSelectControlled } from '../../../../UI/Inputs/MulticolumnPickerSelect/MultiColumnPickerSelectControlled';
import type { NewSocialHistory } from '../../../../../model/api/medicalHistory/SocialHistory';
import { useSocialHistoryItem } from '../../../../../hooks/useSocialHistoryItem';

type SmokingFormProps = {
  initialValues?: SocialHistorySmokingFormData;
  edit?: boolean;
  onSubmit?: (values: NewSocialHistory, editFromType?: boolean, idFromType?: string) => void;
  onDelete?: (id?: string) => void;
  isPending?: boolean;
};

export const SmokingForm = ({ onDelete, onSubmit, initialValues, edit, isPending }: SmokingFormProps) => {
  const form = useForm<SocialHistorySmokingFormData>({
    defaultValues: initialValues ?? socialHistorySmokingFormDefaultValues,
    resolver: zodResolver(socialHistorySmokingSchema),
  });
  const type = form.watch('type');
  const data = useSocialHistoryItem('smoking', type, !edit);

  useEffect(() => {
    if (edit) {
      return;
    }

    if (data) {
      const parsedData = parseSocialHistorySmokingApiToFormData(data);

      form.reset({ ...parsedData });
    } else {
      form.reset({ ...socialHistorySmokingFormDefaultValues, type });
    }
    /* eslint-disable-next-line */
  }, [data]);

  const handleSubmitForm = (values: SocialHistorySmokingFormData) => {
    onSubmit?.(parseSocialHistorySmokingFormToApiData(values), Boolean(data), data?.id);
  };

  return (
    <View style={{ flex: 1 }}>
      <FormProvider {...form}>
        <View style={{ gap: 16 }}>
          <CustomSelectControlled
            name="type"
            label="Type"
            commonData={socialHistoryCommonSmokingType}
            dynamicData={socialHistoryDynamicSmokingType}
            inputProps={{
              placeholder: 'Select',
              disabled: Boolean(edit),
            }}
            title="Select type"
            placeholder="Search type"
          />
          <TextInputControlled
            name="frequency"
            label="Frequency"
            inputProps={{ placeholder: 'E.g. daily', maxLength: 50 }}
          />
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
            inputProps={{
              returnObject: true,
            }}
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
          {edit || (Boolean(data) && !isPending) ? (
            <DeletionButton title="Delete Smoking Item" onProceed={() => onDelete?.(data?.id)} disabled={isPending}>
              Delete smoking
            </DeletionButton>
          ) : null}
          <FormButtonControlled
            edit={edit || Boolean(data)}
            onPress={form.handleSubmit(handleSubmitForm)}
            disabled={isPending}
          />
        </View>
      </FormProvider>
    </View>
  );
};
