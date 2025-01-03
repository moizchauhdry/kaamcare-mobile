declare module '*.svg';

// types/react-native-switch-selector.d.ts
declare module 'react-native-switch-selector' {
  import { Component } from 'react';
  import { ViewStyle, TextStyle } from 'react-native';

  export interface SwitchSelectorOption {
    label: string;
    value: string | number;
    customIcon?: JSX.Element;
    imageIcon?: any;
  }

  export interface SwitchSelectorProps {
    options: SwitchSelectorOption[];
    initial?: number;
    value?: number | string;
    onPress: (value: string | number | SwitchSelectorOption) => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    selectedTextStyle?: TextStyle;
    selectedTextContainerStyle?: ViewStyle;
    textContainerStyle?: ViewStyle;
    buttonColor?: string;
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: number;
    height?: number;
    valuePadding?: number;
    bold?: boolean;
    buttonMargin?: number;
    buttonWidth?: number;
    animationDuration?: number;
    disabled?: boolean;
    disableValueChangeOnPress?: boolean;
    returnObject?: boolean;
  }

  export default class SwitchSelector extends Component<SwitchSelectorProps> {}
}