import type { TextStyle } from 'react-native';

import { theme } from '../../../config/Theme';

export type TypographySizes = 'xs' | 'sm' | 'lg' | 'md' | 'xl';
export type TypographyWeight = 'normal' | 'regular' | 'bolder' | 'semiBold';
export type TypographyColor = 'primary' | 'secondary' | 'gray' | 'error' | 'white' | 'black' | 'lightBlue';

export type TypographySuperScriptTypes = 'upper' | 'lower';

type SizesStyles = {
  [key in TypographySizes]: TextStyle;
};

type WeightStyles = {
  [key in TypographyWeight]: TextStyle;
};

type ColorStyles = {
  [key in TypographyColor]: TextStyle;
};

type SuperScriptTypesStyles = {
  [key in TypographySuperScriptTypes]: TextStyle;
};

export const styles = {
  common: {
    letterSpacing: -0.4,
    color: theme.colors.textPrimary,
  },
  commonSuperScript: {
    fontSize: 10,
    lineHeight: 15,
    letterSpacing: -0.4,
    color: theme.colors.textPrimary,
  },
};

export const sizes: SizesStyles = {
  // TO DO: sm if necessary
  xs: {
    fontSize: 13,
    lineHeight: 18,
  },
  sm: {
    fontSize: 15,
    lineHeight: 20,
  },
  md: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.4,
  },
  lg: {
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 34,
    letterSpacing: -0.4,
  },
  xl: {
    fontSize: 34,
    fontWeight: '700',
    lineHeight: 41,
    letterSpacing: -0.4,
  },
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

export const colors: ColorStyles = {
  primary: {
    color: theme.colors.textPrimary,
  },
  secondary: {
    color: theme.colors.textSecondary,
  },
  gray: {
    color: theme.colors.gray200,
  },
  error: {
    color: theme.colors.danger,
  },
  white: {
    color: theme.colors.white,
  },
  black: {
    color: theme.colors.black,
  },
  lightBlue: {
    color: theme.colors.lightBlue,
  },
};

export const superScriptTypes: SuperScriptTypesStyles = {
  upper: { marginLeft: 2, marginTop: 3 },
  lower: {
    marginLeft: 2,
    marginTop: -3,
  },
};
