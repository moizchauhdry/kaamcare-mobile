import { View } from 'react-native';

import { InputSkeleton } from 'components/UI/Inputs/InputSkeleton/InputSkeleton';

import { styles } from './PersonalInformationForm.styles';

export const PersonalInformationFormSkeleton = () => (
  <View style={[styles.container]}>
    <InputSkeleton />
    <InputSkeleton />
    <InputSkeleton />
    <InputSkeleton />
    <View style={styles.doubleInputContainer}>
      <View style={styles.doubleInputWrapper}>
        <InputSkeleton />
      </View>
      <View style={styles.doubleInputWrapper}>
        <InputSkeleton />
      </View>
    </View>
    <View style={styles.doubleInputContainer}>
      <View style={styles.doubleInputWrapper}>
        <InputSkeleton />
      </View>
      <View style={styles.doubleInputWrapper}>
        <InputSkeleton />
      </View>
    </View>
  </View>
);
