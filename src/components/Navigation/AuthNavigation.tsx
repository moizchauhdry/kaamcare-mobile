import { createStackNavigator } from '@react-navigation/stack';

import { Intro } from 'screens/Intro/Intro';
import { LoginScreen } from 'screens/Intro/Login';
import { SignUpScreen } from 'screens/Intro/Signup';

export type AuthNavigationParamsList = {
  Intro: undefined;
  LogIn: undefined;
  SignUp: undefined;
};

export const AuthNavigation = () => {
  const Stack = createStackNavigator<AuthNavigationParamsList>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
      <Stack.Screen name="LogIn" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
