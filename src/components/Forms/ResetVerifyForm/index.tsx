import { FormProvider, useForm } from 'react-hook-form';
import { Dimensions, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';

import { verifyOtpPostSchema, type VerifyOtpFormData } from 'schemas/forms/auth/verifyOtp';

import { TextInputControlled } from '../../UI/Inputs/TextInput/TextInputControlled';
import { Button } from '../../UI/Button/Button';

type ForgotFormProps = {
  onSubmit?: (values: VerifyOtpFormData) => void;
  initialValues?: VerifyOtpFormData;
  isPending?: boolean;
};

export const ResetVerifyForm = ({ onSubmit, initialValues, isPending }: ForgotFormProps) => {
  const { height } = Dimensions.get('window');
  const form = useForm<VerifyOtpFormData>({
    defaultValues: initialValues,
    resolver: zodResolver(verifyOtpPostSchema),
  });

  const handleSubmitForm = (values: VerifyOtpFormData) => {
    onSubmit?.(values);
  };

  return (
    <FormProvider {...form}>
      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: height * 0.08 }}>
        <View style={{ gap: 16 }}>
          <TextInputControlled
            name="otp"
            label="Verification code"
            inputProps={{ maxLength: 6, keyboardType: 'number-pad' }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Button weight="semiBold" onPress={form.handleSubmit(handleSubmitForm)} disabled={isPending}>
            Verify code
          </Button>
        </View>
      </View>
    </FormProvider>
  );
};
