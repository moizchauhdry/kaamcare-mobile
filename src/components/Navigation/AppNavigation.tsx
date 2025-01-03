import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';

import { LoggedNavigation } from './LoggednNavigation';
import { useAuth } from '../../context/AuthContext';
import { Intro } from '../../screens/Intro/Intro';

const Stack = createStackNavigator();

export const AppNavigation = () => {
  const { isLogged } = useAuth();
  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <Stack.Navigator>
        {isLogged ? (
          <Stack.Screen name="App" component={LoggedNavigation} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen name="Intro" component={Intro} options={{ headerShown: false }} />
        )}
        {/* <Stack.Screen name="App" component={LoggedNavigation} options={{ headerShown: false }} /> */}
      </Stack.Navigator>
    </View>
  );
};
