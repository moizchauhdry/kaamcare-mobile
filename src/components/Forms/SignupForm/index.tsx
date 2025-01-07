import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';

import { signupPostSchema, type SignupFormData } from 'schemas/forms/signup';

import { TextInputControlled } from '../../UI/Inputs/TextInput/TextInputControlled';
import { Button } from '../../UI/Button/Button';

type SignupFormProps = {
  onSubmit?: (values: SignupFormData) => void;
  initialValues?: SignupFormData;
  isPending?: boolean;
};

export const SignupForm = ({ onSubmit, initialValues, isPending }: SignupFormProps) => {
  const form = useForm<SignupFormData>({
    defaultValues: initialValues,
    resolver: zodResolver(signupPostSchema),
  });

  const handleSubmitForm = (values: SignupFormData) => {
    onSubmit?.(values);
  };

  return (
    <View style={{ gap: 16, flex: 1 }}>
      <FormProvider {...form}>
        <View style={{ flex: 1, gap: 16 }}>
          <TextInputControlled name="email" label="Email" inputProps={{ maxLength: 60 }} />
        </View>

        <View>
          <Button weight="semiBold" onPress={form.handleSubmit(handleSubmitForm)}>
            Send verification code
          </Button>
        </View>
      </FormProvider>
    </View>
  );
};
