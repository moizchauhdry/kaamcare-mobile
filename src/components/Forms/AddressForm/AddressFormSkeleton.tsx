import { View } from 'react-native';

import { InputWideSkeleton } from 'components/UI/Inputs/InputSkeleton/InputWideSkeleton';
import { InputSkeleton } from 'components/UI/Inputs/InputSkeleton/InputSkeleton';
import { InputSwitchSkeleton } from 'components/UI/Inputs/InputSkeleton/InputSwitchSkeleton';
import { InputRadioGroupSkeleton } from 'components/UI/Inputs/InputSkeleton/InputRadioGroupSkeleton';

import { styles } from './AddressForm.styles';

export const AddressFormSkeleton = () => (
  <View style={[styles.container]}>
    <InputSkeleton />
    <InputWideSkeleton />
    <InputSwitchSkeleton isHorizontal />
    <InputRadioGroupSkeleton itemsNumber={4} />
  </View>
);
