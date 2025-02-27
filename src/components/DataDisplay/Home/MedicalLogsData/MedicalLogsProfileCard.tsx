import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';

import { Typography } from 'components/UI/Typography/Typography';
import heartIcon from 'assets/icons/heart.svg';
import { WithSkeleton } from 'components/UI/Skeleton/WithSkeleton';
import { isObjectSomeDataFilled } from 'utils/object/object';
import { Card } from 'components/UI/Card/Card';

import { MedicalLogsProfileCardSkeleton } from './MedicalLogsProfileCardSkeleton';

type MedicalLogsProfileCardProps<T> = {
  title?: string;
  navigationData?: {
    navigationScreen?: string;
    navigationProps?: object;
  };
  children?: React.ReactNode;
  dataProps?: {
    isLoading: boolean;
    data: T;
    isError: boolean;
  };
};

export const MedicalLogsProfileCard = <T,>({
  dataProps,
  title,
  navigationData,
  children,
}: MedicalLogsProfileCardProps<T>): JSX.Element => {
  const navigation = useNavigation();
  const isSomeDataFilled = isObjectSomeDataFilled(dataProps?.data);

  const handleItemPress = () => {
    const screenName = navigationData?.navigationScreen;

    if (!navigationData?.navigationScreen) {
      return;
    }

    navigation.navigate({
      name: screenName,
      params: navigationData?.navigationProps,
    } as never);
  };

  const renderContent = () => {
    if (isSomeDataFilled) {
      return children;
    }

    return (
      <Typography style={{ fontStyle: 'italic', textAlign: 'center' }} color="gray">
        Track your Blood pressure, Blood sugar, Weight, Height, SpO2 or Heart rate.
      </Typography>
    );
  };
  return (
    <WithSkeleton isLoading={dataProps?.isLoading ?? false} skeleton={<MedicalLogsProfileCardSkeleton />}>
      <TouchableWithoutFeedback delayPressIn={150} onPress={handleItemPress}>
        <Card>
          <View style={{ gap: 8, alignItems: 'center' }}>
            <SvgXml preserveAspectRatio="xMinYMin slice" xml={heartIcon} />

            {title && (
              <Typography style={{ fontSize: 20, lineHeight: 25 }} weight="semiBold">
                {title}
              </Typography>
            )}

            {renderContent()}
          </View>
        </Card>
      </TouchableWithoutFeedback>
    </WithSkeleton>
  );
};
