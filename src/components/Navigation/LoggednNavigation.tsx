import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import type { NavigatorScreenParams } from '@react-navigation/native';

import { EmptyBackground } from '../../screens/MedicalData/EmptyBackground/EmptyBackground';
import { Home } from '../../screens/Home/Home';
import { MoreNavigation } from './MoreNavigation';
import { theme } from '../../config/Theme';
import { TabNavigationIcon } from './components/TabNavigationIcon/TabNavigationIcon';
import { TabNavigationCustomIcon } from './components/TabNavigationIcon/TabNavigationCustomIcon';
import type { AddMedicalDataNavigationParamsList } from './AddMedicalDataNavigation';
import { AddMedicalDataNavigation } from './AddMedicalDataNavigation';
import { HomeSearch } from '../../screens/Home/HomeSearch/HomeSearch';
import { SelectInsuranceScreen } from '../../screens/Insurance/SelectInsuranceScreen';
import { ModalGrabber } from '../UI/ModalGrabber/ModalGrabber';
import { InsuranceFormScreen } from '../../screens/Insurance/InsuranceFormScreen';
import { ModalChevronBack } from '../UI/ModalChevronBack/ModalChevronBack';

export type TabNavigatorParamsList = {
  Home: undefined;
  AddMedicalDataHomeTab: undefined;
  More: undefined;
  MedicalDataNavigation: NavigatorScreenParams<AddMedicalDataNavigationParamsList> | undefined;
};

const TabNavigation = () => {
  const Tab = createBottomTabNavigator<TabNavigatorParamsList>();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="history"
      screenOptions={{
        tabBarInactiveTintColor: theme.colors.textPrimary,
        tabBarActiveTintColor: theme.colors.primary,
        lazy: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarIcon: ({ size }) => <TabNavigationIcon name="home" size={size} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AddMedicalDataHomeTab"
        component={EmptyBackground}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <TabNavigationCustomIcon
              onPress={() => navigation.navigate('MedicalDataNavigation')}
              name="circle-button"
              size={81}
              styles={{ marginTop: -20 }}
            />
          ),
        })}
      />
      <Tab.Screen
        name="More"
        component={MoreNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({ size }) => <TabNavigationIcon name="more-horizontal" size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export type HomeNavigatorParamsList = {
  HomeScreen: undefined;
  HomeSearch: undefined;
};

export type InsuranceNavigatorParamsList = {
  SelectInsurance: undefined;
  InsuranceForm: { edit?: boolean; id?: string; name: 'Dental' | 'Vision' | 'Medical' };
};

const InsuranceNavigation = () => {
  const Stack = createStackNavigator<InsuranceNavigatorParamsList>();

  return (
    <Stack.Navigator screenOptions={{ presentation: 'modal', gestureEnabled: true, gestureDirection: 'vertical' }}>
      <Stack.Screen
        name="SelectInsurance"
        component={SelectInsuranceScreen}
        options={{
          headerBackImage: () => null,
          headerBackTitle: 'Close',
          headerBackTitleVisible: true,
          headerBackTitleStyle: { fontSize: 17, paddingHorizontal: 8, lineHeight: 22, minWidth: 120 },
          headerTitle: () => <ModalGrabber />,
          headerTitleAlign: 'center',
          headerTintColor: theme.colors.primary,
          headerStyle: { backgroundColor: theme.colors.background, shadowColor: 'transparent' },
        }}
      />
      <Stack.Screen
        name="InsuranceForm"
        component={InsuranceFormScreen}
        options={{
          headerBackImage: () => <ModalChevronBack />,
          headerBackTitleVisible: false,
          headerTitle: () => <ModalGrabber />,
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: theme.colors.background, shadowColor: 'transparent' },
          presentation: 'card',
        }}
      />
    </Stack.Navigator>
  );
};

const HomeNavigation = () => {
  const Stack = createStackNavigator<HomeNavigatorParamsList>();

  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="HomeSearch" component={HomeSearch} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export type LoggedNavigationParamsList = {
  TabNavigation: undefined;
  MedicalDataNavigation: undefined;
  MoreNavigation: undefined;
  InsuranceNavigation: undefined;
};

export const LoggedNavigation = () => {
  const Stack = createStackNavigator<LoggedNavigationParamsList>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false }} />
      <Stack.Screen
        name="MedicalDataNavigation"
        component={AddMedicalDataNavigation}
        options={{ presentation: 'modal', headerShown: false }}
      />
      <Stack.Screen name="MoreNavigation" component={MoreNavigation} options={{ headerShown: false }} />
      <Stack.Screen
        name="InsuranceNavigation"
        component={InsuranceNavigation}
        options={{ headerShown: false, presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
};
