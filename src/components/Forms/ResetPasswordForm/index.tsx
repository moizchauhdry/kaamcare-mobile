import { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { PasswordValidator } from 'components/UI/PasswordValidator';
import { resetSchema, type ResetFormData } from 'schemas/forms/auth/resetPassword';

import { Button } from '../../UI/Button/Button';
import { TextInputControlled } from '../../UI/Inputs/TextInput/TextInputControlled';

type ResetFormProps = {
  onSubmit?: (values: ResetFormData) => void;
  initialValues?: ResetFormData;
  isPending?: boolean;
};

export const ResetPasswordForm = ({ onSubmit, initialValues, isPending }: ResetFormProps) => {
  const { height } = Dimensions.get('window');
  const form = useForm<ResetFormData>({
    defaultValues: initialValues,
    resolver: zodResolver(resetSchema),
  });

  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUpperAndLower, setHasUpperAndLower] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);

  const validations = [
    { isValid: hasMinLength, text: 'Password must be at least 8 characters' },
    { isValid: hasUpperAndLower, text: 'Uppercase & lowercase letters' },
    { isValid: hasNumber, text: 'At least one number' },
  ];

  const handleSubmitForm = (values: ResetFormData) => {
    onSubmit?.(values);
  };

  const handlePasswordChange = (password: string) => {
    form.setValue('password', password);
    setHasMinLength(password.length >= 8);
    setHasNumber(/(?=.*\d)/.test(password));
    setHasUpperAndLower(/^(?=.*[a-z])(?=.*[A-Z])/.test(password));
  };

  return (
    <FormProvider {...form}>
      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: height * 0.08 }}>
        <View style={{ gap: 16 }}>
          <TextInputControlled
            name="password"
            label="Password"
            inputProps={{
              maxLength: 60,
              autoCapitalize: 'none',
              secureTextEntry: true,
              onChangeText: handlePasswordChange,
            }}
          />

          <PasswordValidator validations={validations} />
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
