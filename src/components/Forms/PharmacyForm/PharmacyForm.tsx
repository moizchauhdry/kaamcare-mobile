import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';

import { PhoneNumberInputControlled } from 'components/UI/Inputs/PhoneNumberInput/PhoneNumberInputControlled';

import { TextInputControlled } from '../../UI/Inputs/TextInput/TextInputControlled';
import { Button } from '../../UI/Button/Button';
import { styles } from '../PersonalInformationForm/PersonalInformationForm.styles';
import type { PharmacyFormData } from '../../../schemas/forms/pharmacy';
import { pharmacyPostSchema, pharmacyPutSchema } from '../../../schemas/forms/pharmacy';

type PharmacyFormProps = {
  initialValues?: PharmacyFormData;
  onSubmit?: (values: PharmacyFormData) => void;
  edit?: boolean;
  isPending?: boolean;
};

export const PharmacyForm = ({ isPending, edit, initialValues, onSubmit }: PharmacyFormProps) => {
  const form = useForm<PharmacyFormData>({
    defaultValues: initialValues ?? { name: '', address: '', phoneNumber: '' },
    resolver: zodResolver(edit ? pharmacyPutSchema : pharmacyPostSchema),
  });
  const { isDirty, disabled } = form.formState;

  const handleSubmitForm = (values: PharmacyFormData) => {
    onSubmit?.(values);
  };

  return (
    <View style={[styles.container, { flex: 1 }]}>
      <FormProvider {...form}>
        <View style={{ flex: 1, gap: 16 }}>
          <TextInputControlled name="name" label="Name" inputProps={{ maxLength: 80 }} />
          <TextInputControlled
            name="address"
            label="Address"
            inputProps={{
              maxLength: 140,
              isWide: true,
            }}
          />
          <PhoneNumberInputControlled name="phoneNumber" label="Phone number" />
        </View>

        <View style={{ paddingTop: 16 }}>
          <Button onPress={form.handleSubmit(handleSubmitForm)} disabled={disabled || !isDirty || isPending}>
            {edit ? 'Update' : 'Save'}
          </Button>
        </View>
      </FormProvider>
    </View>
  );
};
