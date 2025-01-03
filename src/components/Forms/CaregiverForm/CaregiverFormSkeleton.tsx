import { View } from 'react-native';

import { InputSwitchSkeleton } from 'components/UI/Inputs/InputSkeleton/InputSwitchSkeleton';
import { InputCardListSkeleton } from 'components/UI/Inputs/InputSkeleton/InputCardListSkeleton';

import { styles } from './CaregiverForm.styles';

export const CaregiverFormSkeleton = () => (
  <View style={[styles.container]}>
    <View style={styles.section}>
      <InputSwitchSkeleton isHorizontal />
      <InputCardListSkeleton itemsNumber={3} />
    </View>
    <View style={styles.section}>
      <InputSwitchSkeleton isHorizontal />
      <InputCardListSkeleton itemsNumber={2} />
    </View>
    <View style={styles.section}>
      <InputSwitchSkeleton isHorizontal />
      <InputCardListSkeleton itemsNumber={2} />
    </View>
  </View>
);
