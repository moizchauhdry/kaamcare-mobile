import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { MyProfileCard } from './MyProfileCard';
import { useQueryGetProfileInformation } from '../../../../hooks/query/profile/useQueryGetProfileInformation';
import { Typography } from '../../../UI/Typography/Typography';
import { formatDateYearsDifference } from '../../../../utils/date/date';
import type { Genders } from '../../../../utils/formatter/gender';
import { getShorterGenderString } from '../../../../utils/formatter/gender';

type NestedStackNavigationMore = {
  navigate: (screen: 'MoreNavigation', params: { screen: 'MyProfile' }) => void;
};

export const MyProfile = () => {
  const { data, isError, isLoading } = useQueryGetProfileInformation({ retry: 2 });
  const navigate = useNavigation<NestedStackNavigationMore>();

  const renderContent = () => {
    if (!data || !data.firstName) {
      return null;
    }

    return (
      <View style={{ gap: 4, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Typography>
          <Typography weight="semiBold">
            {data.firstName}
            {data.lastName ? ' ' : null}
          </Typography>
          {data.lastName ? <Typography weight="semiBold">{data.lastName}</Typography> : null}
          {data.gender || data.dateOfBirth ? ', ' : null}
          {data.dateOfBirth ? (
            <Typography weight="semiBold">{formatDateYearsDifference(data.dateOfBirth)}</Typography>
          ) : null}
          {data.gender ? (
            <Typography weight="semiBold">{` ${getShorterGenderString(data.gender.toLowerCase() as Genders)}`}</Typography>
          ) : null}
        </Typography>
        <TouchableOpacity
          onPress={() =>
            navigate.navigate('MoreNavigation', {
              screen: 'MyProfile',
            })
          }
        >
          <Typography color="secondary" weight="semiBold">
            More
          </Typography>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <MyProfileCard
      navigationData={{
        navigationScreen: 'MoreNavigation',
        navigationProps: {
          screen: 'MyProfile',
        },
      }}
      dataProps={{
        isLoading,
        data,
        isError,
      }}
    >
      {renderContent()}
    </MyProfileCard>
  );
};
