import { View } from 'react-native';

import { ProfileInformation } from './components/ProfileInformation';
import { Address } from './components/Address';
import { EmergencyContact } from './components/EmergencyContanct';
import { Caregiver } from './components/Caregiver';
import { Pharmacy } from './components/Pharmacy';

export const ProfileDataList = () => (
  <View style={{ gap: 8 }}>
    <ProfileInformation />
    <Address />
    <EmergencyContact />
    <Caregiver />
    <Pharmacy />
  </View>
);
