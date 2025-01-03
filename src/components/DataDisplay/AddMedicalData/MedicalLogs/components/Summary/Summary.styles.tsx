import { StyleSheet } from 'react-native';

import { theme } from '../../../../../../config/Theme';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: theme.colors.lightBlue,
    backgroundColor: theme.colors.white,
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  collapsedWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horizontalLine: {
    height: 1,
    backgroundColor: theme.colors.lightBlue,
  },
});
