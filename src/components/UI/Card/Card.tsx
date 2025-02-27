import type { ViewStyle } from 'react-native';
import { View } from 'react-native';

import { theme } from 'config/Theme';

type CardProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

export const Card = ({ children, style }: CardProps) => (
  <View
    style={[
      {
        backgroundColor: theme.colors.white,
        padding: 16,
        borderRadius: 8,
        shadowColor: theme.colors.shadowPrimary,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 1,
        shadowOpacity: 0.9,
        elevation: 4,
        borderColor: theme.colors.backgroundDark,
        borderWidth: 1,
      },
      style,
    ]}
  >
    {children}
  </View>
);
