import { View } from 'react-native';

import { styles } from './CardInputWrapper.styles';

type CardInputWrapperProps = {
  children: React.ReactNode;
};

export const CardInputWrapper = ({ children }: CardInputWrapperProps) => (
  <View style={styles.container}>{children}</View>
);
