import { View } from 'react-native';

import { useQueryAddressInformation } from 'hooks/query/profile/useQueryAddressInformation';
import { theme } from 'config/Theme';
import { phoneNumberFormatter } from 'utils/formatter/phoneNumber';

import { Typography } from '../../../UI/Typography/Typography';
import { DataCard } from '../../../UI/DataCard/DataCard';
import { otherRresidentialFacilityData } from '../../../../constants/forms/address';

export const Address = () => {
  const { data, isLoading, isError } = useQueryAddressInformation({
    retry: false,
  });

  const content = (
    <View style={{ gap: 4 }}>
      {data?.address && (
        <View
          style={{
            borderBottomWidth: data?.otherFacilitySet ? 1 : 0,
            borderBottomColor: theme.colors.backgroundDark,
            paddingBottom: data?.otherFacilitySet ? 16 : 0,
            gap: 4,
          }}
        >
          {data?.homelessShelterFacilityName && <Typography>{data?.homelessShelterFacilityName}</Typography>}
          {data?.homelessShelterFacilityPhoneNumber && (
            <Typography>{phoneNumberFormatter(data?.homelessShelterFacilityPhoneNumber)}</Typography>
          )}
          <Typography>{data?.address}</Typography>
        </View>
      )}
      {data?.otherFacilitySet && (
        <View style={{ gap: 4, paddingTop: 16 }}>
          <Typography weight="semiBold">
            {otherRresidentialFacilityData.find((elem) => elem.value === data.otherResidentialFacilityType)?.label}
          </Typography>
          {data?.otherFacilityName && <Typography>{data.otherFacilityName}</Typography>}
          {data?.otherFacilityPhoneNumber && (
            <Typography>{phoneNumberFormatter(data.otherFacilityPhoneNumber)}</Typography>
          )}
          {data?.otherFacilityAddress && <Typography>{data.otherFacilityAddress}</Typography>}
        </View>
      )}
    </View>
  );

  return (
    <DataCard
      title="Address"
      navigationData={{
        navigationScreen: 'Address',
      }}
      dataProps={{
        isLoading,
        data,
        isError,
      }}
      arrayToOmit={['isCreated', 'addressType']}
    >
      {content}
    </DataCard>
  );
};
