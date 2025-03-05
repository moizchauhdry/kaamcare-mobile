import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationOptions } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { useLayoutEffect } from 'react';

import { ModalChevronBack } from 'components/UI/ModalChevronBack/ModalChevronBack';
import { CaregiverScreen } from 'screens/More/Caregiver/CaregiverScreen';

import { ModalGrabber1o } from 'components/UI/ModalGrabber/ModelGrabber1o';
import { theme } from '../../config/Theme';
import { AddressScreen } from '../../screens/More/Address/Address';
import { ConsentsScreen } from '../../screens/More/Consents/ConsentsScreen';
import { DisclaimerScreen } from '../../screens/More/Consents/DisclaimerScreen';
import { PrivacyPolicyScreen } from '../../screens/More/Consents/PrivacyPolicyScreen';
import { TermsAndConditionsScreen } from '../../screens/More/Consents/TermsAndConditionsScreen';
import { DeleteAccountScreen } from '../../screens/More/DeleteAccountScreen/DeleteAccountScreen';
import { EmergencyContactScreen } from '../../screens/More/EmergencyContactScreen/EmergencyContactScreen';
import { HealthcareProviderScreen } from '../../screens/More/HealthcareProviderScreen/HealthcareProviderScreen';
import { HomeScreen } from '../../screens/More/HomeScreen/HomeScreen';
import { MyProfile } from '../../screens/More/MyProfile/MyProfile';
import { PersonalInformationScreen } from '../../screens/More/PersonalInformation/PersonalinformationScreen';
import { PharmacyScreen } from '../../screens/More/PharmacyScreen/PharmacyScreen';
import { SettingsScreen } from '../../screens/More/SettingsScreen/SettingsScreen';
import { UnitsScreen } from '../../screens/More/UnitsScreen/UnitsScreen';
import { ResetPasswordScreen } from 'screens/Intro/Reset';
import { ResetPasswordScreen2o } from 'screens/Intro/Reset/ResetPasswordScreen2o';
import { ModalChevronBack2o } from 'components/UI/ModalChevronBack/ModelChevronBack2o';

type FormScreensParams = {
  edit?: boolean;
};

export type ConsentsNavigationParamsList = {
  Consents: undefined;
  Privacy: undefined;
  Terms: undefined;
  Disclaimer: undefined;
};

export type SettingsNavigationParamsList = {
  Units: undefined;
  Settings: undefined;
  ResetPassword2o: undefined;
  DeleteAccount: undefined;
};

export type MoreNavigationParamsList = {
  MoreHome: undefined;
  MyProfile: undefined;
  PersonalInformation: FormScreensParams | undefined;
  EmergencyContact: FormScreensParams | undefined;
  Pharmacy: FormScreensParams | undefined;
  Address: FormScreensParams | undefined;
  Caregiver: FormScreensParams | undefined;
  ConsentsNav: undefined;
  SettingsNav: undefined;
  Settings: undefined;
  ResetPassword2o: undefined;

  DeleteAccount: undefined;
  HealthcareProvider: (FormScreensParams & { id?: string; isPrimaryInList?: boolean }) | undefined;
};

const Stack = createStackNavigator<MoreNavigationParamsList>();
const StackConsents = createStackNavigator<ConsentsNavigationParamsList>();
const Settings = createStackNavigator<SettingsNavigationParamsList>();
const options: StackNavigationOptions = {
  headerBackImage: () => <ModalChevronBack />,
  headerBackTitleVisible: false,
  headerTitle: () => null,
  headerStyle: { backgroundColor: theme.colors.background, shadowColor: 'transparent' },
};

const presentationModal = ({ route, navigation }: { route: any; navigation: any }): StackNavigationOptions => {
  return {
    presentation: 'modal',
    gestureEnabled: true,
    gestureDirection: 'vertical',
    headerTitle: () => <ModalGrabber1o />,
    headerBackImage: () => <ModalChevronBack2o navigation={navigation} />,
    headerTitleAlign: 'center',
  };
};

const presentationCard: StackNavigationOptions = {
  presentation: 'card',
  headerTitle: () => null,
};
const cardOptions = ({ route, navigation }: { route: any; navigation: any }): StackNavigationOptions => {
  return {
    ...options,
    headerTitle: () => <ModalGrabber1o />,
    headerBackImage: () => <ModalChevronBack2o navigation={navigation} />,

    headerTitleAlign: 'center',
  };
};
export const MoreNavigation = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useLayoutEffect(() => {
    const focusRoute = getFocusedRouteNameFromRoute(route) ?? 'MoreHome';

    if (focusRoute !== 'MoreHome') {
      navigation.setOptions({ tabBarStyle: { display: 'none', pointerEvents: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="MoreHome" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="ConsentsNav"
        component={ConsentsNavigation}
        options={{ headerShown: false, presentation: 'modal' }}
      />
      <Stack.Screen
        name="SettingsNav"
        component={SettingsNavigation}
        options={{ headerShown: false, presentation: 'modal' }}
      />
      <Stack.Group screenOptions={presentationModal}>
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="PersonalInformation" component={PersonalInformationScreen} />
        <Stack.Screen name="Address" component={AddressScreen} />
        <Stack.Screen name="EmergencyContact" component={EmergencyContactScreen} />
        <Stack.Screen name="Caregiver" component={CaregiverScreen} />
        <Stack.Screen name="Pharmacy" component={PharmacyScreen} />
        <Stack.Screen name="HealthcareProvider" component={HealthcareProviderScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const ConsentsNavigation = () => (
  <StackConsents.Navigator screenOptions={{ ...options }}>
    <StackConsents.Screen name="Consents" component={ConsentsScreen} />
    <StackConsents.Group>
      <StackConsents.Screen name="Privacy" component={PrivacyPolicyScreen} />
      <StackConsents.Screen name="Terms" component={TermsAndConditionsScreen} />
      <StackConsents.Screen name="Disclaimer" component={DisclaimerScreen} />
    </StackConsents.Group>
  </StackConsents.Navigator>
);

const SettingsNavigation = () => (
  <Settings.Navigator screenOptions={cardOptions}>
    <Settings.Screen name="Settings" component={SettingsScreen} />
    <Settings.Group>
      <Settings.Screen name="DeleteAccount" component={DeleteAccountScreen} />
      <Settings.Screen name="Units" component={UnitsScreen} />
      <Stack.Screen name="ResetPassword2o" component={ResetPasswordScreen2o} options={{ headerShown: false }} />
    </Settings.Group>
  </Settings.Navigator>
);
