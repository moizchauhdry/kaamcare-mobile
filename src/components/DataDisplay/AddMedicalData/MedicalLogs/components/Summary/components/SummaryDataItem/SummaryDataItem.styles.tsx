import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';

import { theme } from 'config/Theme';

import type { SummaryDataItemColorType } from './SummaryDataItem';

type ColorsType = {
  [key in SummaryDataItemColorType]: ViewStyle;
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#4F56FD',
    borderRadius: 8,
    gap: 4,
  },
});

export const colors: ColorsType = {
  purple: {
    borderColor: theme.colors.summaryPurple,
  },
  blue: {
    borderColor: theme.colors.summaryBlue,
  },
  lightBlue: {
    borderColor: theme.colors.lightBlue,
  },
  green: {
    borderColor: theme.colors.summaryGreen,
  },
  pink: {
    borderColor: theme.colors.summaryPink,
  },
};
