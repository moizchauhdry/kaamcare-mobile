import { View } from 'react-native';

import { DataCard } from '../../../UI/DataCard/DataCard';
import { Typography } from '../../../UI/Typography/Typography';
import { phoneNumberFormatter } from '../../../../utils/formatter/phoneNumber';
import { useQueryPharmacy } from '../../../../hooks/query/profile/useQueryPharmacy';

export const Pharmacy = () => {
  const { data, isLoading, isError } = useQueryPharmacy({
    retry: false,
  });

  const content = (
    <View style={{ gap: 4 }}>
      {data?.pharmacyName ? <Typography weight="semiBold">{data.pharmacyName}</Typography> : null}
      {data?.pharmacyPhoneNumber ? <Typography>{phoneNumberFormatter(data.pharmacyPhoneNumber)}</Typography> : null}
      {data?.address ? <Typography>{data.address}</Typography> : null}
    </View>
  );

  return (
    <DataCard
      title="Pharmacy"
      navigationData={{
        navigationScreen: 'Pharmacy',
      }}
      dataProps={{
        isLoading,
        data,
        isError,
      }}
      arrayToOmit={['isCreated']}
    >
      {content}
    </DataCard>
  );
};
