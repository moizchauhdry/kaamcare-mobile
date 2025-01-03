import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

type PersonalInformationFormStylesType = {
  container: ViewStyle;
  section: ViewStyle;
};

export const styles: PersonalInformationFormStylesType = StyleSheet.create({
  container: {
    gap: 32,
  },
  section: { gap: 10 },
});
