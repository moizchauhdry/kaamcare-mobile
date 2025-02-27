import { View } from 'react-native';

import { Typography } from 'components/UI/Typography/Typography';
import { theme } from 'config/Theme';

type AddMedicalDataLayoutType = {
  title?: string;

  children: React.ReactNode;
};

export const AddMedicalDataLayout = ({ title, children }: AddMedicalDataLayoutType) => (
  <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
    <View
      style={{
        paddingTop: 3,
        // paddingBottom: 8,
        paddingHorizontal: 16,
        // borderBottomWidth: 1,
        // borderBottomColor: theme.colors.border,
      }}
    >
      {/* {title && (
        <Typography style={{ fontSize: 28, fontWeight: '700' }} size="xl" weight="bolder">
          {title}
        </Typography>
      )} */}
    </View>
    <View style={{ paddingTop: 16, flex: 1 }}>{children}</View>
  </View>
);
