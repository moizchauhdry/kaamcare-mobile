import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';

import type { AddressFormData } from 'schemas/forms/address';
import { addressSchemaPost, addressSchemaPut } from 'schemas/forms/address';
import { Button } from 'components/UI/Button/Button';
import { formDefaultValues } from 'constants/forms/address';

import { AddressFormAddressTypeSection } from './sections/AddressFormAddressTypeSection';
import { SwitchInputWithAlertSection } from './sections/SwitchInputWithAlertSection';

type AddressFormProps = {
  initialValues?: AddressFormData;
  onSubmit?: (values: AddressFormData) => void;
  edit?: boolean;
  isPending?: boolean;
};

export const AddressForm = ({ isPending, edit, initialValues, onSubmit }: AddressFormProps) => {
  const form = useForm<AddressFormData>({
    defaultValues: initialValues ?? formDefaultValues,
    resolver: zodResolver(edit ? addressSchemaPut : addressSchemaPost),
  });

  const { isDirty, disabled, isSubmitting } = form.formState;

  const handleSubmitForm = (values: AddressFormData) => {
    onSubmit?.(values);
  };

  return (
    <View style={{ gap: 16 }}>
      <FormProvider {...form}>
        <AddressFormAddressTypeSection />
        <SwitchInputWithAlertSection />
        <View style={{ paddingTop: 16 }}>
          <Button
            onPress={form.handleSubmit(handleSubmitForm)}
            disabled={isPending || disabled || !isDirty || isSubmitting}
          >
            {edit ? 'Update' : 'Save'}
          </Button>
        </View>
      </FormProvider>
    </View>
  );
};
