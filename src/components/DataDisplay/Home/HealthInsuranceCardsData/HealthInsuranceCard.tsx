import { TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import { Typography } from 'components/UI/Typography/Typography';
import RadioButton from 'components/UI/RadioButton/RadioButton';
import { Card } from 'components/UI/Card/Card';
import checkCircle from 'assets/icons/check-circle.svg';

import { HealthInsuranceCardSkeleton } from './HealthInsuranceCardSkeleton';
import type { InsuranceCards } from '../../../../model/api/insurance/Insurance';
import { WithSkeleton } from '../../../UI/Skeleton/WithSkeleton';

type HealthInsuranceCardProps = {
  title?: string;
  navigationData?: {
    navigationScreen?: string;
    navigationProps?: object;
  };
  children?: React.ReactNode;
  dataProps?: {
    isLoading: boolean;
    data: InsuranceCards;
    isError: boolean;
  };
};

const LABELS = ['Medical', 'Dental', 'Vision'];

export const HealthInsuranceCard = ({ dataProps, title, navigationData }: HealthInsuranceCardProps): JSX.Element => {
  const navigation = useNavigation();

  const handleItemPress = () => {
    navigation.navigate({
      name: 'InsuranceNavigation',
      params: navigationData?.navigationProps,
    } as never);
  };

  const renderContent = () => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      {LABELS.map((elem) => {
        const isFilled = dataProps?.data.find((card) => card.cardCategory === elem);

        return isFilled ? (
          <View style={{ gap: 4, flexDirection: 'row', alignItems: 'center' }} key={elem}>
            <SvgXml xml={checkCircle} key={elem} />
            <Typography weight="semiBold">{elem}</Typography>
          </View>
        ) : (
          <RadioButton id="1" label={elem} value={elem} disabled labelStyles={{ fontWeight: '600' }} key={elem} />
        );
      })}
    </View>
  );
  return (
    <WithSkeleton isLoading={dataProps?.isLoading ?? false} skeleton={<HealthInsuranceCardSkeleton />}>
      <TouchableWithoutFeedback onPress={handleItemPress}>
        <View>
          <Card>
            <View style={{ gap: 12 }}>
              {title && (
                <Typography style={{ fontSize: 20 }} color="secondary">
                  {title}
                </Typography>
              )}

              {renderContent()}
            </View>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    </WithSkeleton>
  );
};
