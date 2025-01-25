import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import { View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

import { http } from 'services/http/ApiServices';
import { useSignupStore } from 'screens/Intro/Signup/store';

import { AuthNavigation } from './AuthNavigation';
import { LoggedNavigation } from './LoggednNavigation';

const Stack = createStackNavigator();

export const AppNavigation = () => {
  const isLogged = useSignupStore((store) => store.isLogged);
  const setIsLogged = useSignupStore((store) => store.setIsLogged);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await SecureStore.getItemAsync('refresh-token');
        if (token) {
          http.addHeader('Authorization', `Bearer ${token}`);
          setIsLogged(true);
        }
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setIsLogged]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Stack.Navigator>
        {isLogged ? (
          <Stack.Screen name="App" component={LoggedNavigation} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigation} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </View>
  );
};
