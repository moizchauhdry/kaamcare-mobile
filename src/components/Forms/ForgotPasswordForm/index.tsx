import { FormProvider, useForm } from 'react-hook-form';
import { Dimensions, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';

import { forgotSchema, type ForgotFormData } from 'schemas/forms/auth/forgotPassword';

import { TextInputControlled } from '../../UI/Inputs/TextInput/TextInputControlled';
import { Button } from '../../UI/Button/Button';

type ForgotFormProps = {
  onSubmit?: (values: ForgotFormData) => void;
  initialValues?: ForgotFormData;
  isPending?: boolean;
};

export const ForgotPasswordForm = ({ onSubmit, initialValues, isPending }: ForgotFormProps) => {
  const { height } = Dimensions.get('window');
  const form = useForm<ForgotFormData>({
    defaultValues: initialValues,
    resolver: zodResolver(forgotSchema),
  });

  const handleSubmitForm = (values: ForgotFormData) => {
    onSubmit?.(values);
  };

  return (
    <FormProvider {...form}>
      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: height * 0.08 }}>
        <View style={{ gap: 16 }}>
          <TextInputControlled
            name="email"
            label="Email"
            inputProps={{ maxLength: 60, autoCapitalize: 'none', keyboardType: 'email-address' }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button weight="semiBold" onPress={form.handleSubmit(handleSubmitForm)}>
            Continue
          </Button>
        </View>
      </View>
    </FormProvider>
  );
};
