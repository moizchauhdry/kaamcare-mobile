import React, { useState, useEffect } from 'react';
import type { TouchableOpacityProps } from 'react-native';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  Animated,
} from 'react-native';
import { SvgXml } from 'react-native-svg';

import type { ButtonWeight } from './Button.styles';
import { variants, styles, weights } from './Button.styles';

type ButtonProps = TouchableOpacityProps & {
  variant?: 'default' | 'secondary' | 'danger';
  weight?: ButtonWeight;
  icon?: string;
};

export const Button = ({ icon, children, variant = 'default', weight = 'normal', ...props }: ButtonProps) => (
  <TouchableOpacity
    style={[props.style, styles.button, variants[variant].button, props.disabled && styles.disabled]}
    activeOpacity={0.8}
    {...props}
  >
    {icon && <SvgXml xml={icon} />}
    <Text style={[styles.text, variants[variant].text, weights[weight]]}>{children}</Text>
  </TouchableOpacity>
);

export const ButtonAboveKeyboard = ({ icon, children, ...props }: ButtonProps) => {
  const [keyboardHeight] = useState(new Animated.Value(0));

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardWillShow', (event) => {
      Animated.timing(keyboardHeight, {
        toValue: event.endCoordinates.height,
        duration: event.duration,
        useNativeDriver: false,
      }).start();
    });

    const keyboardWillHide = Keyboard.addListener('keyboardWillHide', (event) => {
      Animated.timing(keyboardHeight, {
        toValue: 0,
        duration: event.duration,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, [keyboardHeight]);

  return (
    <KeyboardAvoidingView style={stylesWrapper.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Animated.View style={[stylesWrapper.buttonWrapper, { bottom: keyboardHeight }]}>
        <Button icon={icon} {...props}>
          {children}
        </Button>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const stylesWrapper = StyleSheet.create({
  container: {
    // flex: 0.01,
  },
  buttonWrapper: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 5,
  },
});
