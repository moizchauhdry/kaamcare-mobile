import type { TextStyle } from 'react-native';
import { StyleSheet } from 'react-native';

import { theme } from '../../../config/Theme';

type ButtonVariant = 'default' | 'secondary' | 'danger';
export type ButtonWeight = 'normal' | 'regular' | 'bolder' | 'semiBold';

type ButtonStyles = {
  [key: string]: TextStyle;
  button: TextStyle;
  text: TextStyle;
};

type ButtonVariantStyles = {
  [key in ButtonVariant]: {
    button: TextStyle;
    text: TextStyle;
  };
};

export const styles: ButtonStyles = StyleSheet.create({
  button: {
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 8,
    gap: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.4,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.2,
  },
});

export const variants: ButtonVariantStyles = {
  default: {
    button: {
      backgroundColor: theme.colors.primary,
    },
    text: {
      color: theme.colors.primaryForeground,
    },
  },
  secondary: {
    button: {
      backgroundColor: 'transparent',
      color: theme.colors.primary,
      borderWidth: 2,
      borderColor: theme.colors.primary,
    },
    text: {
      color: theme.colors.primary,
    },
  },
  danger: {
    button: {
      backgroundColor: theme.colors.danger,
      color: theme.colors.white,
      borderWidth: 2,
      borderColor: theme.colors.danger,
    },
    text: {
      color: theme.colors.white,
    },
  },
};
type WeightStyles = {
  [key in ButtonWeight]: TextStyle;
};

export const weights: WeightStyles = {
  normal: {
    fontWeight: '400',
  },
  regular: {
    fontWeight: '500',
  },
  semiBold: {
    fontWeight: '600',
  },
  bolder: {
    fontWeight: '700',
  },
};
