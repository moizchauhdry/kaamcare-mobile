export const moreScreenData = [
  {
    id: 'profile',
    title: 'My profile',
    name: 'MyProfile',
  },
  {
    id: 'settings',
    title: 'Settings',
    name: 'SettingsNav',
  },
  {
    id: 'consents',
    title: 'Consents',
    name: 'ConsentsNav',
  },
];

export const settingsScreenData = (resetPress: () => void) => [
  {
    id: 'units',
    title: 'Units',
    name: 'Units',
  },
  {
    id: 'reset',
    title: 'Reset password',
    name: 'ResetPassword',
    onPress: resetPress,
  },
];

export const myProfileScreenData = [
  {
    id: 'personal',
    title: 'Personal information',
    name: 'PersonalInformation',
  },
  {
    id: 'address',
    title: 'Address',
    name: 'Address',
  },
  {
    id: 'emergencyContact',
    title: 'Emergency Contact',
    name: 'EmergencyContact',
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy',
    name: 'Pharmacy',
  },
  {
    id: 'caregiver',
    title: 'Caregiver',
    name: 'Caregiver',
  },
];

export const myProfileScreenHealthcareData = [
  {
    id: 'healthcareProviderName',
    title: 'Healthcare provider name',
    name: 'HealthcareProviderName',
  },
];
