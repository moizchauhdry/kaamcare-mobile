import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';

import { Intro } from 'screens/Intro/Intro';
import { LoginScreen } from 'screens/Intro/Login';
import { SignUpScreen } from 'screens/Intro/Signup';
import { WelcomeScreen } from 'screens/Intro/Welcome';
import { ResetPasswordScreen } from 'screens/Intro/Reset';
import { ForgotPasswordScreen } from 'screens/Intro/Forgot';
import { ResetVerifyScreen } from 'screens/Intro/ResetVerify';
import { VerifyScreen } from 'screens/Intro/Signup/VerifyScreen';
import { PasswordScreen } from 'screens/Intro/Signup/PasswordScreen';
import { Easing } from 'react-native';

export type AuthNavigationParamsList = {
  Intro: undefined;
  LogIn: undefined;
  SignUp: undefined;
  Verify: undefined;
  Welcome: undefined;
  Password: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  ResetVerify: undefined;
};

export const AuthNavigation = () => {
  const Stack = createStackNavigator<AuthNavigationParamsList>();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 200,
              easing: Easing.in(Easing.sin),
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 400,
              easing: Easing.out(Easing.back(1)),
            },
          },
        },
      }}
    >
      <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
      <Stack.Screen name="LogIn" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Verify" component={VerifyScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Password" component={PasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ResetVerify" component={ResetVerifyScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
