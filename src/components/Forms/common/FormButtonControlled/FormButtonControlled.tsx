import { StyleProp, type TouchableOpacityProps, View, ViewStyle } from 'react-native';
import { useFormState } from 'react-hook-form';

import { Button } from '../../../UI/Button/Button';

interface FormButtonControlledProps extends TouchableOpacityProps {
  edit?: boolean;
  enabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const FormButtonControlled = ({
  edit,
  enabled,
  disabled: buttonDisabled,
  style,
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
    <View style={[{ paddingTop: 16 }, style]}>
      <Button disabled={getShouldButtonDisabled()} {...props}>
        {edit ? 'Update' : 'Save'}
      </Button>
    </View>
  );
};
