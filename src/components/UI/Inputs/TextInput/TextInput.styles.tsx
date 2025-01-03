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
  inputWithElement: {
    color: theme.colors.textPrimary,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.4,

    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.gray200,
    paddingHorizontal: 16,

    color: theme.colors.textPrimary,
    fontSize: 17,
    letterSpacing: -0.4,
    textAlign: 'auto',
  },
  inputFocus: {
    borderColor: theme.colors.blue,
    borderWidth: 2,

    shadowColor: theme.colors.blueShadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 3,
  },
  inputError: {
    borderColor: theme.colors.danger,
    borderWidth: 2,
  },
  inputWide: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    height: 68,
  },
});

export const disabled = StyleSheet.create({
  input: {
    color: theme.colors.gray200,
    borderColor: theme.colors.gray100,
  },
  inputWrapper: {
    borderColor: theme.colors.gray100,
  },
  inputWithElement: {
    color: theme.colors.gray200,
  },
});
