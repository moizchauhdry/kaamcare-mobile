import { StyleSheet } from 'react-native';

import { theme } from 'config/Theme';

export const styles = StyleSheet.create({
  modal: { marginHorizontal: 0, marginBottom: 0, overflow: 'hidden' },
  modalWrapper: { flex: 1, borderRadius: 10, backgroundColor: theme.colors.background },
  grabberWrapper: { width: '100%', alignItems: 'center', paddingTop: 5, paddingBottom: 4 },
  grabber: { width: 36, height: 5, backgroundColor: theme.colors.primary100, borderRadius: 20 },
});
