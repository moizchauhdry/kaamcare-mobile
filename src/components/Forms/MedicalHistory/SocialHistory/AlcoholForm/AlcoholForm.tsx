import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { View } from 'react-native';
import { useEffect } from 'react';

import { TextInputControlled } from 'components/UI/Inputs/TextInput/TextInputControlled';
import { DeletionButton } from 'components/UI/Button/DeletionButton';
import { FormButtonControlled } from 'components/Forms/common/FormButtonControlled/FormButtonControlled';
import { socialHistoryAlcoholFormDefaultValues } from 'constants/forms/medicalhistory/socialHistory';
import { CustomSelectControlled } from 'components/UI/Inputs/Custom/CustomSelectControlled';
import {
  parseSocialHistoryAlcoholApiToFormData,
  parseSocialHistoryAlcoholFormToApiData,
} from 'model/parsers/medicalHistory/SocialHistoryParser';
import {
  socialHistoryCommonAlcoholType,
  socialHistoryDurationNumbers,
  socialHistoryDurationText,
  socialHistoryDurationTextSingle,
  socialHistoryDynamicAlcoholType,
} from 'constants/data/medicalHistory/socialHistory';

import type { SocialHistoryAlcoholFormData } from '../../../../../schemas/forms/medicalHistory/socialHistory/alcohol';
import { socialHistoryAlcoholSchema } from '../../../../../schemas/forms/medicalHistory/socialHistory/alcohol';
import { MultiColumnPickerSelectControlled } from '../../../../UI/Inputs/MulticolumnPickerSelect/MultiColumnPickerSelectControlled';
import { SwitchSelectorControlled } from '../../../../UI/Inputs/SwitchSelector/SwitchSelectorControlled';
import { Typography } from '../../../../UI/Typography/Typography';
import { theme } from '../../../../../config/Theme';
import type { NewSocialHistory } from '../../../../../model/api/medicalHistory/SocialHistory';
import { useSocialHistoryItem } from '../../../../../hooks/useSocialHistoryItem';

type AlcoholFormProps = {
  initialValues?: SocialHistoryAlcoholFormData;
  edit?: boolean;
  onSubmit?: (values: NewSocialHistory, editFromType?: boolean, idFromType?: string) => void;
  onDelete?: (id?: string) => void;
  isPending?: boolean;
};

export const AlcoholForm = ({ onDelete, onSubmit, initialValues, edit, isPending }: AlcoholFormProps) => {
  const form = useForm<SocialHistoryAlcoholFormData>({
    defaultValues: initialValues ?? socialHistoryAlcoholFormDefaultValues,
    resolver: zodResolver(socialHistoryAlcoholSchema),
  });
  const type = form.watch('type');
  const data = useSocialHistoryItem('alcohol', type, !edit);

  useEffect(() => {
    if (edit) {
      return;
    }

    if (data) {
      const parsedData = parseSocialHistoryAlcoholApiToFormData(data);

      form.reset({ ...parsedData });
    } else {
      form.reset({ ...socialHistoryAlcoholFormDefaultValues, type });
    }
    /* eslint-disable-next-line */
  }, [data]);

  const handleSubmitForm = (values: SocialHistoryAlcoholFormData) => {
    onSubmit?.(parseSocialHistoryAlcoholFormToApiData(values), Boolean(data), data?.id);
  };

  return (
    <View style={{ flex: 1 }}>
      <FormProvider {...form}>
        <View style={{ gap: 16 }}>
          <CustomSelectControlled
            name="type"
            commonData={socialHistoryCommonAlcoholType}
            dynamicData={socialHistoryDynamicAlcoholType}
            label="Type"
            inputProps={{
              placeholder: 'Select',
              disabled: Boolean(edit),
            }}
            title="Select type"
            placeholder="Search type"
          />
          <TextInputControlled
            name="quantity"
            label="Quantity"
            inputProps={{
              keyboardType: 'number-pad',
              rightElement: () => <Typography style={{ color: theme.colors.gray200 }}>oz</Typography>,
            }}
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
            <DeletionButton disabled={isPending} title="Delete Alcohol" onProceed={() => onDelete?.(data?.id)}>
              Delete alcohol
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
