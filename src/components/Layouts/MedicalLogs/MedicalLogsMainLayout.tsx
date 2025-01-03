import { ScrollView, View } from 'react-native';

import { theme } from '../../../config/Theme';
import { Typography } from '../../UI/Typography/Typography';

type MedicalHistoryContentProps = {
  title: string;
  children: React.ReactNode;
};

export const MedicalLogsMainLayout = ({ title, children }: MedicalHistoryContentProps) => (
  <ScrollView
    style={{ flex: 1, gap: 24, paddingHorizontal: 16, backgroundColor: theme.colors.background }}
    showsVerticalScrollIndicator={false}
  >
    <View>
      <Typography size="lg" weight="bolder">
        {title}
      </Typography>
    </View>
    {children}
  </ScrollView>
);
