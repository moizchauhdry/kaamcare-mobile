import type { StackNavigationOptions } from '@react-navigation/stack';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';
import { useLayoutEffect } from 'react';

import { CaregiverScreen } from 'screens/More/Caregiver/CaregiverScreen';
import { ModalChevronBack } from 'components/UI/ModalChevronBack/ModalChevronBack';
import { ModalGrabber } from 'components/UI/ModalGrabber/ModalGrabber';

import { HomeScreen } from '../../screens/More/HomeScreen/HomeScreen';
import { SettingsScreen } from '../../screens/More/SettingsScreen/SettingsScreen';
import { theme } from '../../config/Theme';
import { DeleteAccountScreen } from '../../screens/More/DeleteAccountScreen/DeleteAccountScreen';
import { MyProfile } from '../../screens/More/MyProfile/MyProfile';
import { PersonalInformationScreen } from '../../screens/More/PersonalInformation/PersonalinformationScreen';
import { EmergencyContactScreen } from '../../screens/More/EmergencyContactScreen/EmergencyContactScreen';
import { PharmacyScreen } from '../../screens/More/PharmacyScreen/PharmacyScreen';
import { AddressScreen } from '../../screens/More/Address/Address';
import { HealthcareProviderScreen } from '../../screens/More/HealthcareProviderScreen/HealthcareProviderScreen';
import { ConsentsScreen } from '../../screens/More/Consents/ConsentsScreen';
import { DisclaimerScreen } from '../../screens/More/Consents/DisclaimerScreen';
import { TermsAndConditionsScreen } from '../../screens/More/Consents/TermsAndConditionsScreen';
import { PrivacyPolicyScreen } from '../../screens/More/Consents/PrivacyPolicyScreen';
import { UnitsScreen } from '../../screens/More/UnitsScreen/UnitsScreen';

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

const presentationModal: StackNavigationOptions = {
  presentation: 'modal',
  gestureEnabled: true,
  gestureDirection: 'vertical',
  headerTitle: () => <ModalGrabber />,
  headerTitleAlign: 'center',
};

const presentationCard: StackNavigationOptions = {
  presentation: 'card',
  headerTitle: () => null,
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
      <Stack.Group screenOptions={{ ...options, ...presentationModal }}>
        <Stack.Screen name="MyProfile" component={MyProfile} options={presentationCard} />
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
  <Settings.Navigator screenOptions={{ ...options, headerTitle: () => <ModalGrabber />, headerTitleAlign: 'center' }}>
    <Settings.Screen name="Settings" component={SettingsScreen} />
    <Settings.Group>
      <Settings.Screen name="DeleteAccount" component={DeleteAccountScreen} />
      <Settings.Screen name="Units" component={UnitsScreen} />
    </Settings.Group>
  </Settings.Navigator>
);
