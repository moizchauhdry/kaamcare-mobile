import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';

import { formDefaultValues } from '../../../constants/forms/caregiver';
import { Button } from '../../UI/Button/Button';
import { type CaregiverFormData, caregiverSchema } from '../../../schemas/forms/caregiver';
import { styles } from './CaregiverForm.styles';
import { CaregiverSection } from './sections/CaregiverSection';
import { HomeTherapySection } from './sections/HomeTherapySection';
import { HomeNursingSection } from './sections/HomeNursingSection';

type CaregiverFormProps = {
  initialValues?: CaregiverFormData;
  onSubmit?: (values: CaregiverFormData) => void;
  edit?: boolean;
  isPending?: boolean;
};

export const CaregiverForm = ({ initialValues, onSubmit, edit, isPending }: CaregiverFormProps) => {
  const form = useForm<CaregiverFormData>({
    defaultValues: initialValues ?? formDefaultValues,
    resolver: zodResolver(caregiverSchema),
  });
  const { isDirty, disabled } = form.formState;

  const handleSubmitForm = (values: CaregiverFormData) => {
    onSubmit?.(values);
  };

  return (
    <View style={styles.container}>
      <FormProvider {...form}>
        <CaregiverSection />
        <HomeTherapySection />
        <HomeNursingSection />

        <View style={{ paddingTop: 16 }}>
          <Button onPress={form.handleSubmit(handleSubmitForm)} disabled={isPending || disabled || !isDirty}>
            {edit ? 'Update' : 'Save'}
          </Button>
        </View>
      </FormProvider>
    </View>
  );
};
