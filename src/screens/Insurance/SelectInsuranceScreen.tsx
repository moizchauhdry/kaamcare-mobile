import { FlatList, View } from 'react-native';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { ScreenModalLayout } from '../../components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { theme } from '../../config/Theme';
import type { InsuranceNavigatorParamsList } from '../../components/Navigation/LoggednNavigation';
import { useQueryInsuranceCardsGet } from '../../hooks/query/insuranceCards/useQueryInsuranceCardsGet';
import { HealthInsuranceElementCard } from '../../components/DataDisplay/Home/HealthInsuranceCardsData/HealthInsuranceElementCard';
import type { InsuranceCard } from '../../model/api/insurance/Insurance';
import { isObjectSomeDataFilled } from '../../utils/object/object';

type SelectInsuranceScreenProps = NativeStackScreenProps<InsuranceNavigatorParamsList, 'SelectInsurance'>;

type InsuranceSelectionType = {
  value: 'Dental' | 'Medical' | 'Vision';
  label: string;
};

type InsuranceDisplayType = InsuranceCard & InsuranceSelectionType;

const INSURANCE_DATA: InsuranceSelectionType[] = [
  {
    value: 'Dental',
    label: 'Dental',
  },
  {
    value: 'Medical',
    label: 'Medical',
  },
  {
    value: 'Vision',
    label: 'Vision',
  },
];

export const SelectInsuranceScreen = ({ navigation }: SelectInsuranceScreenProps) => {
  const { data = [] } = useQueryInsuranceCardsGet();

  const properData: (InsuranceDisplayType | InsuranceSelectionType)[] = INSURANCE_DATA.map((elem) => {
    const savedData = data.find((card) => card.cardCategory === elem.value);

    if (savedData) {
      return {
        ...elem,
        ...savedData,
      };
    }

    return elem;
  });

  const handleItemPress = (name: 'Dental' | 'Vision' | 'Medical', id?: string) => {
    navigation.navigate('InsuranceForm', {
      name,
      id,
    });
  };

  return (
    <ScreenModalLayout title="Insurance Cards">
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{
            paddingBottom: 16,
          }}
          data={properData}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: theme.colors.lightBlue }} />}
          renderItem={({ item: { value, label, ...rest } }) => (
            <HealthInsuranceElementCard
              onItemPress={(id?: string) => handleItemPress(value, id)}
              label={label}
              card={isObjectSomeDataFilled(rest) ? { ...(rest as InsuranceCard) } : undefined}
            />
          )}
        />
      </View>
    </ScreenModalLayout>
  );
};
