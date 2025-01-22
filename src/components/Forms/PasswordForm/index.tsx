import { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { FormProvider, useForm } from 'react-hook-form';
import { View, Text, StyleSheet } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';

import { signupPasswordPostSchema, type SignupPasswordFormData } from 'schemas/forms/auth/password';
import { theme } from 'config/Theme';
import checkbox from 'assets/icons/checkbox.svg';
import checkboxDash from 'assets/icons/checkbox-dash.svg';

import { TextInputControlled } from '../../UI/Inputs/TextInput/TextInputControlled';
import { Button } from '../../UI/Button/Button';

type SignupPasswordProps = {
  onSubmit?: (values: SignupPasswordFormData) => void;
  initialValues?: SignupPasswordFormData;
  isPending?: boolean;
};

export const SignupPasswordForm = ({ onSubmit, initialValues, isPending }: SignupPasswordProps) => {
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasUpperAndLower, setHasUpperAndLower] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);

  const form = useForm<SignupPasswordFormData>({
    defaultValues: initialValues,
    resolver: zodResolver(signupPasswordPostSchema),
  });

  const handlePasswordChange = (password: string) => {
    form.setValue('password', password);
    setHasMinLength(password.length >= 8);
    setHasNumber(/(?=.*\d)/.test(password));
    setHasUpperAndLower(/^(?=.*[a-z])(?=.*[A-Z])/.test(password));
  };

  const handleSubmitForm = (values: SignupPasswordFormData) => {
    if (!hasMinLength || !hasUpperAndLower || !hasNumber) {
      form.setError('password', {
        type: 'manual',
        message: 'Password does not meet all required criteria.',
      });
      return;
    }
    onSubmit?.(values);
  };

  return (
    <View style={{ gap: 16, flex: 1 }}>
      <FormProvider {...form}>
        <View style={{ flex: 1, gap: 16 }}>
          <TextInputControlled
            isPasswordField={true}
            name="password"
            label="Password"
            inputProps={{
              maxLength: 60,
              autoCapitalize: 'none',
              onChangeText: handlePasswordChange,
              secureTextEntry: true,
            }}
          />
          <TextInputControlled
            isPasswordField={true}
            name="password_confirmation"
            label="Confirm Password"
            inputProps={{ maxLength: 60, autoCapitalize: 'none', secureTextEntry: true }}
          />
        </View>

        <View style={styles.validationContainer}>
          <View style={styles.passCheck}>
            {hasMinLength ? (
              <SvgXml width={20} height={20} xml={checkbox} />
            ) : (
              <SvgXml width={20} height={20} xml={checkboxDash} />
            )}
            <Text style={[styles.validationText, hasMinLength && styles.valid]}>
              Password must be at least 8 characters
            </Text>
          </View>
          <View style={styles.passCheck}>
            {hasUpperAndLower ? (
              <SvgXml width={20} height={20} xml={checkbox} />
            ) : (
              <SvgXml width={20} height={20} xml={checkboxDash} />
            )}
            <Text style={[styles.validationText, hasUpperAndLower && styles.valid]}>Uppercase & lowercase letters</Text>
          </View>
          <View style={styles.passCheck}>
            {hasNumber ? (
              <SvgXml width={20} height={20} xml={checkbox} />
            ) : (
              <SvgXml width={20} height={20} xml={checkboxDash} />
            )}
            <Text style={[styles.validationText, hasNumber && styles.valid]}>At least one number</Text>
          </View>
        </View>

        <View>
          <Button weight="semiBold" onPress={form.handleSubmit(handleSubmitForm)} disabled={isPending}>
            Create account
          </Button>
        </View>
      </FormProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  validationContainer: {
    marginBottom: 10,
  },
  validationText: {
    fontSize: 17,
    lineHeight: 26,
    color: theme.colors.black,
  },
  valid: {
    color: theme.colors.green,
  },
  passCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
});
