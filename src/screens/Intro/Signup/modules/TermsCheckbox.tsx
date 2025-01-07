import { StyleSheet, View, Text } from 'react-native';
// import { Checkbox } from 'expo-checkbox';
import { theme } from 'config/Theme';

interface TermsCheckboxProps {
  checked: boolean;
  onToggle: (value: boolean) => void;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({ checked, onToggle }) => (
  <View style={styles.container}>
    {/* <Checkbox
      style={styles.checkbox}
      value={checked}
      onValueChange={onToggle}
      color={checked ? '#007AFF' : undefined}
    /> */}
    <Text style={styles.text}>
      Yes, I Understand and Agree to the Kaam Care{' '}
      <Text style={styles.link} onPress={() => {}}>
        Terms of Service
      </Text>{' '}
      and{' '}
      <Text style={styles.link} onPress={() => {}}>
        Privacy Policy
      </Text>
    </Text>
  </View>
);

export default TermsCheckbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  checkbox: {
    marginRight: 10,
    height: 20,
    width: 20,
  },
  text: {
    fontSize: 14,
    flexWrap: 'wrap',
    color: theme.colors.black,
  },
  link: {
    color: theme.colors.textSecondary,
    textDecorationLine: 'underline',
  },
});
