import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { Typography } from '../Typography/Typography';
import { WithSkeleton } from '../Skeleton/WithSkeleton';
import { DataCardSkeleton } from './DataCardSkeleton';
import { Card } from '../Card/Card';
import { isDataFilled } from '../../../utils/data/data';

export type DataCardProps<T> = {
  title?: string;
  navigationData?: {
    navigationScreen?: string;
    navigationProps?: {
      addNewScreenName?: string;
      listScreenName?: string;
      id?: string;
      additionalProps?: {
        [key: string]: string | boolean | number;
      };
    };
  };
  children?: React.ReactNode;
  defaultDataRender?: React.ReactNode;
  onPress?: () => void;
  dataProps?: {
    isLoading: boolean;
    data: T | T[];
    isError?: boolean;
  };
  arrayToOmit?: T extends undefined ? never[] : (keyof T)[];
};

export const DataCard = <T,>({
  dataProps,
  title,
  navigationData,
  onPress,
  children,
  defaultDataRender,
  arrayToOmit,
}: DataCardProps<T>): JSX.Element => {
  const navigation = useNavigation();
  const isSomeDataFilled = isDataFilled(dataProps?.data, arrayToOmit);

  const handleItemPress = () => {
    const screenName = navigationData?.navigationScreen;
    const naviData = navigationData?.navigationProps;

    if (!navigationData?.navigationScreen) {
      return;
    }

    navigation.navigate({
      name: screenName,
      params: {
        edit: isSomeDataFilled,
        screen: naviData ? (isSomeDataFilled ? naviData.listScreenName : naviData.addNewScreenName) : undefined,
        id: naviData?.id ?? undefined,
        ...naviData?.additionalProps,
      },
    } as never);
  };

  const renderContent = () => {
    if (isSomeDataFilled) {
      return children;
    }

    return (
      <View>
        {defaultDataRender}
        <Typography style={{ fontStyle: 'italic' }} color="gray">
          Tap to add more information
        </Typography>
      </View>
    );
  };

  return (
    <WithSkeleton isLoading={dataProps?.isLoading ?? false} skeleton={<DataCardSkeleton />}>
      <TouchableWithoutFeedback delayPressIn={150} onPress={onPress ?? handleItemPress}>
        <Card>
          <View style={{ gap: 12 }}>
            <View>
              {title && (
                <Typography style={{ fontSize: 20 }} color="secondary">
                  {title}
                </Typography>
              )}
            </View>
            <View>{renderContent()}</View>
          </View>
        </Card>
      </TouchableWithoutFeedback>
    </WithSkeleton>
  );
};
