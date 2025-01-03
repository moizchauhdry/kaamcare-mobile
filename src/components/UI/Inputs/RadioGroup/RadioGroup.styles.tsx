import { StyleSheet } from 'react-native';

import { theme } from 'config/Theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primaryForeground,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: theme.colors.backgroundDark,
    borderRadius: 8,
    elevation: 3,
    shadowColor: theme.colors.shadowPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 9,
  },
  containerWrapper: {
    gap: 8,
  },
});
