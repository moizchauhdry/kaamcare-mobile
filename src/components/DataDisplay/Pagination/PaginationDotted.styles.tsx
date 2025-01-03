import { StyleSheet } from 'react-native';

import { theme } from '../../../config/Theme';

export const styles = StyleSheet.create({
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: 'rgba(7, 64, 107, 0.3)',
  },
  active: {
    backgroundColor: theme.colors.textPrimary,
  },
});
