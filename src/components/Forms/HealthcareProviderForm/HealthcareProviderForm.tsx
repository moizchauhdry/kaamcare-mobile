import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormButtonControlled } from '../common/FormButtonControlled/FormButtonControlled';
import type { HealthcareProviderFormData } from '../../../schemas/forms/healthcareProvider';
import { healthcareProviderSchema } from '../../../schemas/forms/healthcareProvider';
import { healthcareProviderFormDefaultValues } from '../../../constants/forms/healthcareProvider';
import { TextInputControlled } from '../../UI/Inputs/TextInput/TextInputControlled';
import { PhoneNumberInputControlled } from '../../UI/Inputs/PhoneNumberInput/PhoneNumberInputControlled';
import { HealthcareProviderFormSpecializationSection } from './components/HealthcareProviderFormSpecializationSection';
import { HealthcareProviderFormDeleteSection } from './components/HealthcareProviderFormDeleteSection';
import { HealthcareProviderFormPrimarySection } from './components/HealthcareProviderFormPrimarySection';

type HealthcareProviderFormProps = {
  initialValues?: HealthcareProviderFormData;
  onSubmit?: (values: HealthcareProviderFormData) => void;
  onDelete?: () => void;
  edit?: boolean;
  isPrimaryInList?: boolean;
};

export const HealthcareProviderForm = ({
  initialValues,
  onSubmit,
  edit,
  onDelete,
  isPrimaryInList,
}: HealthcareProviderFormProps) => {
  const form = useForm<HealthcareProviderFormData>({
    defaultValues: initialValues ?? healthcareProviderFormDefaultValues,
    resolver: zodResolver(healthcareProviderSchema),
  });

  const handleSubmitForm: SubmitHandler<HealthcareProviderFormData> = (values) => {
    onSubmit?.(values);
  };

  return (
    <View style={{ flex: 1 }}>
      <FormProvider {...form}>
        <View style={{ flex: 1, gap: 16 }}>
          <TextInputControlled name="firstName" label="First name" inputProps={{ maxLength: 60 }} />
          <TextInputControlled name="lastName" label="Last name" inputProps={{ maxLength: 60 }} />
          <HealthcareProviderFormSpecializationSection />
          <PhoneNumberInputControlled name="phoneNumber" label="Phone number" />
          <HealthcareProviderFormPrimarySection isPrimaryInList={isPrimaryInList} />
          <HealthcareProviderFormDeleteSection isEdit={edit} onDelete={onDelete} />
        </View>

        <FormButtonControlled onPress={form.handleSubmit(handleSubmitForm)} edit={edit} />
      </FormProvider>
    </View>
  );
};
