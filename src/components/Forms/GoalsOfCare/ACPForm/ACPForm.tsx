import { View } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import { Button } from '../../../UI/Button/Button';
import { ACPLivingWillSection } from './ACPLivingWillSection';
import { ACPCodeStatusSection } from './ACPCodeStatusSection';
import { ACPMedicalSection } from './ACPMedicalSection';
import { ACPReligiousSection } from './ACPReligiousSection';
import { ACPOrganSection } from './ACPOrganSection';
import { acpDefaultValues } from '../../../../constants/forms/goalsOfCare/acp';
import type { ACPFormData } from '../../../../schemas/forms/goalsOfCare/acpSchema';
import { acpSchema } from '../../../../schemas/forms/goalsOfCare/acpSchema';
import { parseACPFormToApiData } from '../../../../model/parsers/goalsOfCare/ACPParser';
import type { ACPApiModel } from '../../../../model/api/goalsOfCare/ACPModel';

type ADLFormProps = {
  initialValues?: ACPFormData;
  isPending?: boolean;
  onFormSubmit?: (data: ACPApiModel) => void;
};

export const ACPForm = ({ isPending, initialValues, onFormSubmit }: ADLFormProps) => {
  const form = useForm<ACPFormData>({
    defaultValues: initialValues ?? acpDefaultValues,
    resolver: zodResolver(acpSchema),
  });

  const onSubmit = (data: ACPFormData) => {
    onFormSubmit?.(parseACPFormToApiData(data));
  };

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
    /* eslint-disable-next-line */
  }, [initialValues]);

  return (
    <View style={{ flex: 1, gap: 16 }}>
      <FormProvider {...form}>
        <ACPLivingWillSection />
        <ACPCodeStatusSection />
        <ACPMedicalSection />
        <ACPReligiousSection />
        <ACPOrganSection />
        <Button onPress={form.handleSubmit(onSubmit)} disabled={isPending}>
          Save
        </Button>
      </FormProvider>
    </View>
  );
};
