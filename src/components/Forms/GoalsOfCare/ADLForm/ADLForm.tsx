import { View } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ADLFormSection } from './ADLFormSection';
import {
  adlDefaultValues,
  bathingOptions,
  bladderOptions,
  bowelOptions,
  dressingOptions,
  feedingOptions,
  groomingOptions,
  mobilityMultiselectOptions,
  mobilityOptions,
  stairsOptions,
  toiletUseOptions,
  transferOptions,
} from '../../../../constants/forms/goalsOfCare/adl';
import { Button } from '../../../UI/Button/Button';
import type { ADLFormData } from '../../../../schemas/forms/goalsOfCare/adlSchema';
import { adlSchema } from '../../../../schemas/forms/goalsOfCare/adlSchema';
import type { ADLSections } from '../../../../model/api/goalsOfCare/ADLModel';
import { parseADLFormToApiData } from '../../../../model/parsers/goalsOfCare/ADLParser';

type ADLFormProps = {
  initialValues?: ADLFormData;
  isPending?: boolean;

  onFormSubmit?: (data: ADLSections) => void;
};

export const ADLForm = ({ initialValues, isPending, onFormSubmit }: ADLFormProps) => {
  const form = useForm<ADLFormData>({
    defaultValues: initialValues ?? adlDefaultValues,
    resolver: zodResolver(adlSchema),
  });

  const onSubmit = (data: ADLFormData) => {
    onFormSubmit?.(parseADLFormToApiData(data));
  };

  return (
    <View style={{ flex: 1, gap: 16 }}>
      <FormProvider {...form}>
        <ADLFormSection name="feeding" radioOptions={feedingOptions} label="Feeding" />
        <ADLFormSection name="bathing" radioOptions={bathingOptions} label="Bathing" />
        <ADLFormSection name="grooming" radioOptions={groomingOptions} label="Grooming" />
        <ADLFormSection name="dressing" radioOptions={dressingOptions} label="Dressing" />
        <ADLFormSection name="bowelControl" radioOptions={bowelOptions} label="Bowel control" />
        <ADLFormSection name="bladderControl" radioOptions={bladderOptions} label="Bladder control" />
        <ADLFormSection name="toiletUse" radioOptions={toiletUseOptions} label="Toilet use" />
        <ADLFormSection name="transfers" radioOptions={transferOptions} label="Transfers (bed to chair and back)" />
        <ADLFormSection
          name="mobility"
          radioOptions={mobilityOptions}
          label="Mobility on level surfaces"
          multiselectOptions={mobilityMultiselectOptions}
        />
        <ADLFormSection name="stairs" radioOptions={stairsOptions} label="Stairs" />
        <Button onPress={form.handleSubmit(onSubmit)} disabled={isPending}>
          Save
        </Button>
      </FormProvider>
    </View>
  );
};
