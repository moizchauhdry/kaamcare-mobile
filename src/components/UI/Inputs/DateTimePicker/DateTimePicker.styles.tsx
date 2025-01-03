import { StyleSheet } from 'react-native';

import { theme } from '../../../../config/Theme';

export const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.gray200,
    paddingHorizontal: 16,
  },
  input: {
    color: theme.colors.textPrimary,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.4,
  },
  icon: {
    alignSelf: 'center',
  },
});
