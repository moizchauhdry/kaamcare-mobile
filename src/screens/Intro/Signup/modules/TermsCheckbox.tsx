import { StyleSheet, View } from 'react-native';
import { Checkbox } from 'expo-checkbox';

import { theme } from 'config/Theme';
import { Typography } from 'components/UI/Typography/Typography';

interface TermsCheckboxProps {
  checked: boolean;
  onToggle: (value: boolean) => void;
}

export const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ checked, onToggle }) => (
  <View style={styles.container}>
    <Checkbox
      style={styles.checkbox}
      value={checked}
      onValueChange={onToggle}
      color={checked ? theme.colors.textSecondary : undefined}
    />
    <Typography>
      Yes, I Understand and Agree to the Kaam Care{' '}
      <Typography style={styles.link} onPress={() => {}}>
        Terms of Service
      </Typography>{' '}
      and{' '}
      <Typography style={styles.link} onPress={() => {}}>
        Privacy Policy
      </Typography>
    </Typography>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  checkbox: {
    marginRight: 14,
    height: 20,
    width: 20,
    borderWidth: 0.5,
  },
  link: {
    color: theme.colors.textSecondary,
  },
});
