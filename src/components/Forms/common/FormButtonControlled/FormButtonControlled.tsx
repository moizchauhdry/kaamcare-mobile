import { StyleProp, type TouchableOpacityProps, View, ViewStyle } from 'react-native';
import { useFormState } from 'react-hook-form';
import { useEffect } from 'react';

import { Button } from '../../../UI/Button/Button';

interface FormButtonControlledProps extends TouchableOpacityProps {
  edit?: boolean;
  enabled?: boolean;
  disabled: boolean;
  onPress?: (e: any) => void;
  style?: StyleProp<ViewStyle>;
}

export const FormButtonControlled = ({
  edit,
  enabled = true,
  disabled: buttonDisabled,
  onPress,
  style,
  ...props
}: FormButtonControlledProps) => {
  const { disabled, isSubmitting, isDirty, errors } = useFormState();
  const isErrorOccur = Object.keys(errors).length > 0;

  // Add logging to track button state
  useEffect(() => {
    console.log('🔵 [FormButtonControlled] State:', {
      edit,
      enabled,
      buttonDisabled,
      formDisabled: disabled,
      isSubmitting,
      isDirty,
      hasErrors: isErrorOccur,
    });
  }, [edit, enabled, buttonDisabled, disabled, isSubmitting, isDirty, isErrorOccur]);

  const getShouldButtonDisabled = () => {
    // In edit mode, only disable if there are errors or it's explicitly disabled
    if (edit) {
      const shouldDisable = isErrorOccur || buttonDisabled || isSubmitting;
      console.log('🔵 [FormButtonControlled] Edit mode button disabled:', shouldDisable);
      return shouldDisable;
    }

    // For new entries, use the standard validation
    const shouldDisable = buttonDisabled || disabled || !isDirty || isSubmitting || !enabled;
    console.log('🔵 [FormButtonControlled] New entry button disabled:', shouldDisable);
    return shouldDisable;
  };

  const handlePress = (e: any) => {
    console.log('🔵 [FormButtonControlled] Button pressed');
    if (onPress) {
      onPress(e);
    }
  };

  return (
    <View style={[{ paddingTop: 16 }, style]}>
      <Button disabled={getShouldButtonDisabled()} onPress={handlePress} {...props}>
        {edit ? 'Update' : 'Save'}
      </Button>
    </View>
  );
};
