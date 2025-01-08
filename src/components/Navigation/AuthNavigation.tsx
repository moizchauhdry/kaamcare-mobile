import { createStackNavigator } from '@react-navigation/stack';

import { Intro } from 'screens/Intro/Intro';
import { LoginScreen } from 'screens/Intro/Login';
import { SignUpScreen } from 'screens/Intro/Signup';
import { VerifyScreen } from 'screens/Intro/Signup/VerifyScreen';
import { PasswordScreen } from 'screens/Intro/Signup/PasswordScreen';

export type AuthNavigationParamsList = {
  Intro: undefined;
  LogIn: undefined;
  SignUp: undefined;
  Verify: undefined;
  Password: undefined;
};

export const AuthNavigation = () => {
  const Stack = createStackNavigator<AuthNavigationParamsList>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
      <Stack.Screen name="LogIn" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Verify" component={VerifyScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Password" component={PasswordScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
