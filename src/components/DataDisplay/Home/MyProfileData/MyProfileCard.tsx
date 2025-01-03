import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Typography } from 'components/UI/Typography/Typography';
import { Button } from 'components/UI/Button/Button';
import { isObjectSomeDataFilled } from 'utils/object/object';
import { Card } from 'components/UI/Card/Card';

type MyProfileCardProps<T> = {
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
  arrayToOmit?: T extends undefined ? never[] : (keyof T)[];
};

export const MyProfileCard = <T,>({
  dataProps,
  navigationData,
  arrayToOmit,
  children,
}: MyProfileCardProps<T>): JSX.Element => {
  const navigation = useNavigation();
  const isSomeDataFilled = isObjectSomeDataFilled(dataProps?.data, arrayToOmit);

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
    if (isSomeDataFilled && children !== null) {
      return children;
    }

    return (
      <View style={{ gap: 16 }}>
        <View style={{ alignItems: 'center', gap: 16 }}>
          <Typography style={{ fontStyle: 'italic', textAlign: 'center' }} color="gray">
            Add your personal information, address, emergency contact, etc.
          </Typography>
          <Button variant="secondary" weight="semiBold" onPress={handleItemPress}>
            My profile
          </Button>
        </View>
      </View>
    );
  };

  return <Card>{renderContent()}</Card>;
};
