import { StyleSheet } from 'react-native';

import { theme } from 'config/Theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primaryForeground,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderWidth: 1,
    borderColor: theme.colors.backgroundDark,
    borderRadius: 8,
    elevation: 3,
    shadowColor: theme.colors.shadowPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 9,
    gap: 16,
  },
});
