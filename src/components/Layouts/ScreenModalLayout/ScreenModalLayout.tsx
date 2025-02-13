import type { ScrollViewProps, ViewProps } from 'react-native';
import { SafeAreaView, ScrollView, View } from 'react-native';

import { theme } from '../../../config/Theme';
import { Typography } from '../../UI/Typography/Typography';

interface ScreenModalLayoutProps {
  title: string;
  children: React.ReactNode;
  subTitle?: string;
  scrollViewProps?: ScrollViewProps;
  isScrollable?: boolean;
  childrenWrapper?: ViewProps;
}

export const ScreenModalLayout = ({
  title,
  subTitle,
  children,
  childrenWrapper,
  scrollViewProps,
  isScrollable,
}: ScreenModalLayoutProps) => {
  const content = (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 16, paddingBottom: 28, paddingTop: 12 }}>
        {title && (
          <Typography size="lg" weight="bolder">
            {title}
          </Typography>
        )}
        {subTitle ? (
          <Typography size="md" weight="semiBold">
            {subTitle}
          </Typography>
        ) : null}
      </View>
      <View {...childrenWrapper} style={[{ paddingHorizontal: 16, flexGrow: 1 }, childrenWrapper?.style]}>
        {children}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background, gap: 8, paddingBottom: 16 }}>
      {isScrollable ? (
        <ScrollView
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="never"
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets
          {...scrollViewProps}
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
};
