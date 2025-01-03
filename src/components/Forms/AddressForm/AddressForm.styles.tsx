import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

type AddressFormStylesType = {
  container: ViewStyle;
  doubleInputContainer: ViewStyle;
  doubleInputWrapper: ViewStyle;
};

export const styles: AddressFormStylesType = StyleSheet.create({
  container: {
    gap: 16,
  },
  doubleInputContainer: {
    gap: 16,
    flexDirection: 'row',
    paddingRight: 16,
  },
  doubleInputWrapper: {
    width: '50%',
    gap: 8,
  },
});
