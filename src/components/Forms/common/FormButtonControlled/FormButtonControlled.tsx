import { type TouchableOpacityProps, View } from 'react-native';
import { useFormState } from 'react-hook-form';

import { Button } from '../../../UI/Button/Button';

interface FormButtonControlledProps extends TouchableOpacityProps {
  edit?: boolean;
  enabled?: boolean;
}

export const FormButtonControlled = ({
  edit,
  enabled,
  disabled: buttonDisabled,
  ...props
}: FormButtonControlledProps) => {
  const { disabled, isSubmitting, isDirty, errors } = useFormState();
  const isErrorOccur = Object.keys(errors).length > 0;

  const getShouldButtonDisabled = () => {
    if (isErrorOccur) {
      return true;
    }

    if (enabled !== undefined && !buttonDisabled) {
      return !enabled;
    }

    return buttonDisabled || disabled || !isDirty || isSubmitting;
  };

  return (
    <View style={{ paddingTop: 16 }}>
      <Button disabled={getShouldButtonDisabled()} {...props}>
        {edit ? 'Update' : 'Save'}
      </Button>
    </View>
  );
};
