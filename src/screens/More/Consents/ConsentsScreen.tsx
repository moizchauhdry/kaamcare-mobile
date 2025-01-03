import { FlatList } from 'react-native';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from '../../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { SelectWithChevron } from '../../../components/UI/SelectWithChevron/SelectWithChevron';
import type { MoreNavigationParamsList } from '../../../components/Navigation/MoreNavigation';

type ConsentsScreenProps = NativeStackScreenProps<MoreNavigationParamsList, 'Consents'>;

export const ConsentsScreen = ({ navigation }: ConsentsScreenProps) => (
  <ScreenModalLayout title="Consents" childrenWrapper={{ style: { paddingHorizontal: 0 } }}>
    <FlatList
      data={[
        {
          title: 'Terms & Conditions',
          name: 'Terms',
        },
        {
          title: 'Privacy Policy',
          name: 'Privacy',
        },
        {
          title: 'Disclaimer',
          name: 'Disclaimer',
        },
      ]}
      renderItem={({ item }) => <SelectWithChevron label={item.title} onPress={() => navigation.navigate(item.name)} />}
    />
  </ScreenModalLayout>
);
