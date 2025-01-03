import { View } from 'react-native';

import { Typography } from 'components/UI/Typography/Typography';
import { useQueryGetEmergencyContact } from 'hooks/query/profile/useQueryGetEmergencyContact';

import { DataCard } from '../../../UI/DataCard/DataCard';
import { phoneNumberFormatter } from '../../../../utils/formatter/phoneNumber';

export const EmergencyContact = () => {
  const { data, isLoading, isError } = useQueryGetEmergencyContact({
    retry: false,
  });

  const content = (
    <View style={{ gap: 4 }}>
      {(data?.firstName || data?.lastName) && (
        <Typography weight="semiBold">
          {data?.firstName} {data?.lastName} {data?.relationshipKind ? `(${data.relationshipKind})` : null}
        </Typography>
      )}
      {data?.phoneNumber && <Typography>{phoneNumberFormatter(data.phoneNumber)}</Typography>}
      {data?.address && <Typography>{data.address}</Typography>}
    </View>
  );

  return (
    <DataCard
      title="Emergency Contact"
      navigationData={{
        navigationScreen: 'EmergencyContact',
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
