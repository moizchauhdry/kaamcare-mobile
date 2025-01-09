import { View, Text, StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';

import checkbox from 'assets/icons/checkbox.svg';
import checkboxDash from 'assets/icons/checkbox-dash.svg';
import { theme } from 'config/Theme';

type ValidationItemProps = {
  isValid: boolean;
  text: string;
};

export const ValidationItem = ({ isValid, text }: ValidationItemProps) => (
  <View style={styles.passCheck}>
    <SvgXml width={20} height={20} xml={isValid ? checkbox : checkboxDash} />
    <Text style={[styles.validationText, isValid && styles.valid]}>{text}</Text>
  </View>
);

type ValidationContainerProps = {
  validations: { isValid: boolean; text: string }[];
};

export const PasswordValidator = ({ validations }: ValidationContainerProps) => (
  <View style={styles.validationContainer}>
    {validations.map((validation, index) => (
      <ValidationItem key={index} isValid={validation.isValid} text={validation.text} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  validationContainer: {
    height: 70,
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
