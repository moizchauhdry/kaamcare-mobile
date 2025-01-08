import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';

import { useAuth } from 'context/AuthContext';

import { LoggedNavigation } from './LoggednNavigation';
import { AuthNavigation } from './AuthNavigation';

const Stack = createStackNavigator();

export const AppNavigation = () => {
  const { isLogged } = useAuth();
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
