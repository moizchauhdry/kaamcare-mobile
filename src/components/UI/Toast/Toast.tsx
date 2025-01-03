import { View } from 'react-native';
import type { ToastConfigParams } from 'react-native-toast-message';

import { Typography } from '../Typography/Typography';
import { theme } from '../../../config/Theme';

type ToastProps<Props> = ToastConfigParams<Props>;

export const Toast = <Props,>({ text1 }: ToastProps<Props>) => (
  <View style={{ padding: 16, height: 'auto', width: '100%', backgroundColor: theme.colors.primary100 }}>
    <Typography size="sm">{text1}</Typography>
  </View>
);
