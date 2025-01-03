import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';

import { defaultValues } from 'constants/forms/emergencyContact';

import { TextInputControlled } from '../../UI/Inputs/TextInput/TextInputControlled';
import { Button } from '../../UI/Button/Button';
import type { EmergencyContactFormData } from '../../../schemas/forms/emergencyContact';
import { emergencyContactPostSchema, emergencyContactPutSchema } from '../../../schemas/forms/emergencyContact';
import { PhoneNumberInputControlled } from '../../UI/Inputs/PhoneNumberInput/PhoneNumberInputControlled';
import { EmergencyContactFormRelationshipSection } from './components/EmergencyContactFormRelationshipSection';

type EmergencyContactFormProps = {
  onSubmit?: (values: EmergencyContactFormData) => void;
  initialValues?: EmergencyContactFormData;
  edit?: boolean;
  isPending?: boolean;
};

export const EmergencyContactForm = ({ edit, onSubmit, initialValues, isPending }: EmergencyContactFormProps) => {
  const form = useForm<EmergencyContactFormData>({
    defaultValues: initialValues ?? defaultValues,
    resolver: zodResolver(edit ? emergencyContactPutSchema : emergencyContactPostSchema),
  });
  const { isDirty, disabled } = form.formState;

  const handleSubmitForm = (values: EmergencyContactFormData) => {
    onSubmit?.(values);
  };

  return (
    <View style={{ gap: 16, flex: 1 }}>
      <FormProvider {...form}>
        <View style={{ flex: 1, gap: 16 }}>
          <TextInputControlled name="firstName" label="First name" inputProps={{ maxLength: 60 }} />
          <TextInputControlled name="lastName" label="Last name" inputProps={{ maxLength: 60 }} />

          <EmergencyContactFormRelationshipSection />
          <PhoneNumberInputControlled name="phoneNumber" label="Phone number" />
          <TextInputControlled
            name="address"
            label="Address"
            inputProps={{
              maxLength: 60,
              numberOfLines: 2,
              multiline: true,
              style: { minHeight: 68, maxHeight: 68, fontSize: 17, paddingTop: 8, paddingHorizontal: 16 },
            }}
          />
        </View>

        <View>
          <Button onPress={form.handleSubmit(handleSubmitForm)} disabled={isPending || disabled || !isDirty}>
            {edit ? 'Update' : 'Save'}
          </Button>
        </View>
      </FormProvider>
    </View>
  );
};
