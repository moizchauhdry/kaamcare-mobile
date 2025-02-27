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
  console.log('localUserData', localUserData);

  const renderContent = () => {
    const isContentAfterName = data?.dateOfBirth || data?.gender;

    return (
      <View style={{ gap: 4 }}>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {localUserData?.firstName ? (
              <Typography weight="semiBold">{`${localUserData.firstName}${isContentAfterName && !localUserData.lastName ? ',' : ' '}`}</Typography>
            ) : null}
            {localUserData?.lastName ? (
              <Typography weight="semiBold">{`${localUserData.lastName}${isContentAfterName ? ',' : ''}`}</Typography>
            ) : null}
          </View>

          {localUserData?.dateOfBirth ? (
            <Typography weight="semiBold">{formatDateYearsDifference(localUserData.dateOfBirth)}</Typography>
          ) : null}
          {localUserData?.gender ? (
            <Typography weight="semiBold">
              {genderPickerData.find((elem) => elem.value === localUserData.gender)?.label}
            </Typography>
          ) : null}
        </View>
        {localUserData?.dateOfBirth ? (
          <Typography>{`DOB: ${formatDateWithMonthShotName(localUserData.dateOfBirth)}`}</Typography>
        ) : null}
        {localUserData?.phoneNumber ? <Typography>{phoneNumberFormatter(localUserData.phoneNumber)}</Typography> : null}
        {localUserData?.email ? <Typography>{localUserData.email}</Typography> : null}
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {localUserData?.currentWeight ? (
            <Typography>{`Weight: ${changeKilogramToPound(localUserData.currentWeight, mass)?.toFixed(2)} ${mass === 'Pound' ? 'lbs' : 'kg'}`}</Typography>
          ) : null}
          {localUserData?.currentHeight ? (
            <Typography>{`Height: ${changeCentimeterToFeetInch(localUserData.currentHeight, length)?.toFixed(2)} ${length === 'FeetInch' ? 'ft' : 'cm'}`}</Typography>
          ) : null}
        </View>
        {localUserData?.bloodType ? (
          <Typography>
            Blood type: {bloodTypePickerData.find((elem) => elem.value === localUserData.bloodType)?.label}
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
