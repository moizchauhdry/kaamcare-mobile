import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import { View } from 'react-native';
import { useEffect } from 'react';

import { useSignupStore } from 'screens/Intro/Signup/store';

import { AuthNavigation } from './AuthNavigation';
import { LoggedNavigation } from './LoggednNavigation';

const Stack = createStackNavigator();

export const AppNavigation = () => {
  const isLogged = useSignupStore((store) => store.isLogged);
  const setIsLogged = useSignupStore((store) => store.setIsLogged);

  useEffect(() => {
    const token = SecureStore.getItem('id-token');
    console.log('token', token);
    if (token !== null && token !== '') {
      setIsLogged(true);
    }
  }, [setIsLogged]);

  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Stack.Navigator>
        {isLogged ? (
          <Stack.Screen name="App" component={LoggedNavigation} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigation} options={{ headerShown: false }} />
        )}
        {/* <Stack.Screen name="App" component={LoggedNavigation} options={{ headerShown: false }} /> */}
      </Stack.Navigator>
    </View>
  );
};
