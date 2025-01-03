import type React from 'react';
import type { TextStyle, TextProps } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';

import type {
  TypographyColor,
  TypographySizes,
  TypographySuperScriptTypes,
  TypographyWeight,
} from './Typography.styles';
import { sizes, styles, weights, colors, superScriptTypes } from './Typography.styles';

export type TypographyExportProps = TextProps & {
  size?: TypographySizes;
  style?: TextStyle;
  weight?: TypographyWeight;
  color?: TypographyColor;
};

export type TypographySuperScriptExportProps = TextProps & {
  type?: TypographySuperScriptTypes;
  style?: TextStyle;
  weight?: TypographyWeight;
  color?: TypographyColor;
};

type TypographyProps = TypographyExportProps & {
  children: React.ReactNode;
};

type TypographyPropsSuperScript = TypographySuperScriptExportProps & {
  children: React.ReactNode;
};

export const Typography = ({
  children,
  size = 'md',
  weight = 'normal',
  color = 'primary',
  style,
  ...props
}: TypographyProps) => {
  const flattenStyles = StyleSheet.flatten([styles.common, colors[color], sizes[size], weights[weight], style]);

  return (
    <Text style={flattenStyles} {...props}>
      {children}
    </Text>
  );
};

export const TypographySuperScript = ({
  children,
  weight = 'normal',
  color = 'primary',
  type = 'lower',
  style,
  ...props
}: TypographyPropsSuperScript) => {
  const flattenStyles = StyleSheet.flatten([styles.commonSuperScript, colors[color], weights[weight], style]);

  return (
    <View style={superScriptTypes[type]}>
      <Text style={flattenStyles} {...props}>
        {children}
      </Text>
    </View>
  );
};
