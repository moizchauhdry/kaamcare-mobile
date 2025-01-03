import type { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';

import { Card } from '../Card/Card';

type MedicalLogsCardProps = {
  children: ReactNode;
  cardColor?: string;
  onPress?: () => void;
};

export const MedicalLogsCard = ({ children, cardColor, onPress }: MedicalLogsCardProps) => (
  <TouchableOpacity onPress={onPress}>
    <Card
      style={{
        paddingLeft: 20,
        paddingRight: 16,
        paddingVertical: 8,
        gap: 12,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: cardColor,
      }}
    >
      {children}
    </Card>
  </TouchableOpacity>
);
