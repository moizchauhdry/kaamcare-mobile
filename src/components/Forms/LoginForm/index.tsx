import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';

import { defaultValues } from 'constants/forms/emergencyContact';
import { loginPostSchema, type LoginFormData } from 'schemas/forms/login';

import { TextInputControlled } from '../../UI/Inputs/TextInput/TextInputControlled';
import { Button } from '../../UI/Button/Button';

type LoginFormProps = {
  onSubmit?: (values: LoginFormData) => void;
  initialValues?: LoginFormData;
  isPending?: boolean;
};

export const LoginForm = ({ onSubmit, initialValues, isPending }: LoginFormProps) => {
  const form = useForm<LoginFormData>({
    defaultValues: initialValues ?? defaultValues,
    resolver: zodResolver(loginPostSchema),
  });

  const handleSubmitForm = (values: LoginFormData) => {
    onSubmit?.(values);
  };

  return (
    <View style={{ gap: 16, flex: 1 }}>
      <FormProvider {...form}>
        <View style={{ flex: 1, gap: 16 }}>
          <TextInputControlled name="email" label="Email" inputProps={{ maxLength: 60 }} />
          <TextInputControlled name="password" label="Password" inputProps={{ maxLength: 60 }} />
        </View>

        <View>
          <Button weight="semiBold" onPress={form.handleSubmit(handleSubmitForm)}>
            Log In
          </Button>
        </View>
      </FormProvider>
    </View>
  );
};
