import type { ViewStyle } from 'react-native';

import { theme } from '../../../config/Theme';
import type { TypographyExportProps } from '../Typography/Typography';

type SwitchTabType = 'selector' | 'normal';

type SwitchTypeStyles = {
  [key in SwitchTabType]: {
    wrapper: ViewStyle;
    element: ViewStyle;
    elementActive: ViewStyle;
  };
};

type TypographyPropsType = {
  [key in SwitchTabType]: {
    default: TypographyExportProps;
    active: TypographyExportProps;
  };
};

export const styles: SwitchTypeStyles = {
  selector: {
    wrapper: {
      backgroundColor: theme.colors.white,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 24,
      borderWidth: 1,
      borderColor: theme.colors.backgroundDark,
      padding: 2,
      gap: 4,
    },
    element: {
      flex: 1,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 4,
      zIndex: 10,
      backgroundColor: theme.colors.white,
    },
    elementActive: {
      backgroundColor: theme.colors.primary,
    },
  },
  normal: {
    wrapper: {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 2,
    },
    element: {
      flex: 1,
      paddingVertical: 8,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.lightBlue,
    },
    elementActive: {
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.blue,
    },
  },
};

export const typographyProps: TypographyPropsType = {
  selector: {
    default: {
      size: 'xs',
      weight: 'normal',
      color: 'primary',
      style: {
        textAlign: 'center',
      },
    },
    active: {
      size: 'xs',
      weight: 'semiBold',
      color: 'white',
      style: {
        textAlign: 'center',
      },
    },
  },
  normal: {
    default: {
      size: 'sm',
      weight: 'normal',
      color: 'lightBlue',
    },
    active: {
      size: 'sm',
      weight: 'semiBold',
      color: 'secondary',
    },
  },
};
