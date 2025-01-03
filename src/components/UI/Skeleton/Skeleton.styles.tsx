import { StyleSheet } from 'react-native';

import { theme } from '../../../config/Theme';

export const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: theme.colors.skeletonLight,
    width: '100%',
    height: 20,
  },
});
