import { StyleSheet } from 'react-native';

import { theme } from 'config/Theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    backgroundColor: theme.colors.white,
    padding: 16,
    borderRadius: 8,
    borderColor: theme.colors.backgroundDark,
    shadowColor: theme.colors.shadowPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
});
