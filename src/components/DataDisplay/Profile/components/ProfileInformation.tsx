import { View } from 'react-native';

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
  const { mass, length } = useUnitsData();

  const renderContent = () => {
    const isContentAfterName = data?.dateOfBirth || data?.gender;

    return (
      <View style={{ gap: 4 }}>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data?.firstName ? (
              <Typography weight="semiBold">{`${data.firstName}${isContentAfterName && !data.lastName ? ',' : ' '}`}</Typography>
            ) : null}
            {data?.lastName ? (
              <Typography weight="semiBold">{`${data.lastName}${isContentAfterName ? ',' : ''}`}</Typography>
            ) : null}
          </View>

          {data?.dateOfBirth ? (
            <Typography weight="semiBold">{formatDateYearsDifference(data.dateOfBirth)}</Typography>
          ) : null}
          {data?.gender ? (
            <Typography weight="semiBold">
              {genderPickerData.find((elem) => elem.value === data.gender)?.label}
            </Typography>
          ) : null}
        </View>
        {data?.dateOfBirth ? <Typography>{`DOB: ${formatDateWithMonthShotName(data.dateOfBirth)}`}</Typography> : null}
        {data?.phoneNumber ? <Typography>{phoneNumberFormatter(data.phoneNumber)}</Typography> : null}
        {data?.email ? <Typography>{data.email}</Typography> : null}
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {data?.currentWeight ? (
            <Typography>{`Weight: ${changeKilogramToPound(data.currentWeight, mass)?.toFixed(2)} ${mass === 'Pound' ? 'lbs' : 'kg'}`}</Typography>
          ) : null}
          {data?.currentHeight ? (
            <Typography>{`Height: ${changeCentimeterToFeetInch(data.currentHeight, length)?.toFixed(2)} ${length === 'FeetInch' ? 'ft' : 'cm'}`}</Typography>
          ) : null}
        </View>
        {data?.bloodType ? (
          <Typography>
            Blood type: {bloodTypePickerData.find((elem) => elem.value === data?.bloodType)?.label}
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
