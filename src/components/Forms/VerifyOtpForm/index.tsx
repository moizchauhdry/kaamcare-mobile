import { FormProvider, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';

import { verifyOtpPostSchema, type VerifyOtpFormData } from 'schemas/forms/auth/verifyOtp';

import { TextInputControlled } from '../../UI/Inputs/TextInput/TextInputControlled';
import { Button } from '../../UI/Button/Button';

type VerifyOtpProps = {
  onSubmit?: (values: VerifyOtpFormData) => void;
  initialValues?: VerifyOtpFormData;
  isPending?: boolean;
  isTermsAccepted: boolean;
};

export const VerifyOtpForm = ({ onSubmit, initialValues, isPending, isTermsAccepted }: VerifyOtpProps) => {
  const form = useForm<VerifyOtpFormData>({
    defaultValues: initialValues,
    resolver: zodResolver(verifyOtpPostSchema),
  });

  const handleSubmitForm = (values: VerifyOtpFormData) => {
    onSubmit?.(values);
  };

  return (
    <View style={{ gap: 16, flex: 1 }}>
      <FormProvider {...form}>
        <View style={{ flex: 1, gap: 16 }}>
          <TextInputControlled
            name="otp"
            label="Verification code"
            inputProps={{ maxLength: 6, keyboardType: 'number-pad' }}
          />
        </View>

        <View>
          <Button weight="semiBold" onPress={form.handleSubmit(handleSubmitForm)} disabled={!isTermsAccepted}>
            Verify code
          </Button>
        </View>
      </FormProvider>
    </View>
  );
};
