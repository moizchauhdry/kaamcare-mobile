import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Easing, View, ActivityIndicator } from 'react-native';

import { theme } from 'config/Theme';
import { Intro } from 'screens/Intro/Intro';
import { LoginScreen } from 'screens/Intro/Login';
import { SignUpScreen } from 'screens/Intro/Signup';
import { WelcomeScreen } from 'screens/Intro/Welcome';
import { ResetPasswordScreen } from 'screens/Intro/Reset';
import { ForgotPasswordScreen } from 'screens/Intro/Forgot';
import { ResetVerifyScreen } from 'screens/Intro/ResetVerify';
import { VerifyScreen } from 'screens/Intro/Signup/VerifyScreen';
import { AuthMethodScreen } from 'screens/Intro/AuthMethodScreen';
import { PasswordScreen } from 'screens/Intro/Signup/PasswordScreen';

export type AuthNavigationParamsList = {
  Intro: undefined;
  LogIn: undefined;
  SignUp: undefined;
  Verify: undefined;
  Welcome: undefined;
  Password: undefined;
  AuthMethod: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  ResetVerify: undefined;
};

const Stack = createStackNavigator<AuthNavigationParamsList>();

export const AuthNavigation = () => {
  const [initialRoute, setInitialRoute] = useState<keyof AuthNavigationParamsList | undefined>(undefined);

  // useEffect(() => {
  //   const checkFirstLaunch = async () => {
  //     const hasSeenIntro = await SecureStore.getItemAsync('hasSeenIntro');

  //     if (hasSeenIntro === 'true') {
  //       setInitialRoute('AuthMethod');
  //     } else {
  //       setInitialRoute('Intro');
  //       await SecureStore.setItemAsync('hasSeenIntro', 'true');
  //     }
  //   };

  //   checkFirstLaunch();
  // }, []);

  // if (!initialRoute) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color={theme.colors.primary} />
  //     </View>
  //   );
  // }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
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
      <Stack.Screen name="Intro" component={Intro} />
      {/* <Stack.Screen name="AuthMethod" component={AuthMethodScreen} /> */}
      <Stack.Screen name="LogIn" component={LoginScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Verify" component={VerifyScreen} />
      <Stack.Screen name="Password" component={PasswordScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="ResetVerify" component={ResetVerifyScreen} />
    </Stack.Navigator>
  );
};
