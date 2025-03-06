import { View } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import { useQueryGetProfileInformation } from 'hooks/query/profile/useQueryGetProfileInformation';
import { Typography } from 'components/UI/Typography/Typography';
import { formatDateWithMonthShotName, formatDateYearsDifference } from 'utils/date/date';

import { DataCard } from '../../../UI/DataCard/DataCard';
import { phoneNumberFormatter } from '../../../../utils/formatter/phoneNumber';
import { bloodTypePickerData, genderPickerData } from '../../../../constants/forms/personalInformation';
import { useUnitsData } from '../../../../context/UnitsContext';
import { changeKilogramToPound } from '../../../../utils/units/mass';
import { changeCentimeterToFeetInch } from '../../../../utils/units/length';

export const ProfileInformation = () => {
  const { data, isLoading, isError } = useQueryGetProfileInformation({
    retry: 1,
  });
  const localUserData = JSON.parse(SecureStore.getItem('user-data') ?? '{}');
  const { mass, length } = useUnitsData();

  const renderContent = () => {
    // Prioritize `data` over `localUserData` if `data` is present and contains valid information
    const userData = data && Object.keys(data).length > 0 ? data : localUserData;
    const isContentAfterName = userData?.dateOfBirth || userData?.gender;

    return (
      <View style={{ gap: 4 }}>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {userData?.firstName ? (
              <Typography weight="semiBold">{`${userData.firstName}${isContentAfterName && !userData.lastName ? ',' : ' '}`}</Typography>
            ) : null}
            {userData?.lastName ? (
              <Typography weight="semiBold">{`${userData.lastName}${isContentAfterName ? ',' : ''}`}</Typography>
            ) : null}
          </View>

          {userData?.dateOfBirth ? (
            <Typography weight="semiBold">{formatDateYearsDifference(userData.dateOfBirth)}</Typography>
          ) : null}
          {userData?.gender ? (
            <Typography weight="semiBold">
              {genderPickerData.find((elem) => elem.value === userData.gender)?.label}
            </Typography>
          ) : null}
        </View>
        {userData?.dateOfBirth ? (
          <Typography>{`DOB: ${formatDateWithMonthShotName(userData.dateOfBirth)}`}</Typography>
        ) : null}
        {userData?.phoneNumber ? <Typography>{phoneNumberFormatter(userData.phoneNumber)}</Typography> : null}
        {userData?.email ? <Typography>{userData.email}</Typography> : null}
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {userData?.currentWeight ? (
            <Typography>{`Weight: ${changeKilogramToPound(userData.currentWeight, mass)?.toFixed(2)} ${mass === 'Pound' ? 'lbs' : 'kg'}`}</Typography>
          ) : null}
          {userData?.currentHeight ? (
            <Typography>{`Height: ${changeCentimeterToFeetInch(userData.currentHeight, length)?.toFixed(2)} ${length === 'FeetInch' ? 'ft' : 'cm'}`}</Typography>
          ) : null}
        </View>
        {userData?.bloodType ? (
          <Typography>
            Blood type: {bloodTypePickerData.find((elem) => elem.value === userData.bloodType)?.label}
          </Typography>
        ) : null}
      </View>
    );
  };

  return (
    <DataCard
      title="Personal Information"
      navigationData={{
        navigationScreen: 'PersonalInformation',
      }}
      dataProps={{
        isLoading,
        data,
        isError,
      }}
      defaultDataRender={<Typography style={{ marginBottom: 8 }}>{data?.email}</Typography>}
      arrayToOmit={['email']}
    >
      {renderContent()}
    </DataCard>
  );
};
