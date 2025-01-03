import { SafeAreaView, ScrollView, View } from 'react-native';

import { Typography } from 'components/UI/Typography/Typography';
import { theme } from 'config/Theme';

type MoreLayoutType = {
  title?: string;
  children: React.ReactNode;
};

export const MoreLayout = ({ title, children }: MoreLayoutType) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background, gap: 8 }}>
    <ScrollView
      keyboardShouldPersistTaps="never"
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets
    >
      <View style={{ paddingHorizontal: 16 }}>
        <Typography size="lg" weight="bolder">
          {title}
        </Typography>
      </View>
      <View style={{ paddingHorizontal: 16, paddingTop: 27, overflow: 'scroll' }}>{children}</View>
    </ScrollView>
  </SafeAreaView>
);
