import { StyleSheet } from 'react-native';

import { theme } from '../../../config/Theme';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 8,
    flex: 1,
  },
  content: {
    flex: 1,
    gap: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.gray200,
    paddingHorizontal: 16,
  },
});
