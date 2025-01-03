import { View } from 'react-native';

import { styles } from '../PersonalInformationForm/PersonalInformationForm.styles';
import { InputSkeleton } from '../../UI/Inputs/InputSkeleton/InputSkeleton';

export const PharmacyFormSkeleton = () => (
  <View style={[styles.container]}>
    <InputSkeleton />
    <InputSkeleton />
    <InputSkeleton />
  </View>
);
