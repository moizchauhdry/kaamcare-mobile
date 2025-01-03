import { View } from 'react-native';

import { DataCard } from 'components/UI/DataCard/DataCard';

import { Typography } from '../../../UI/Typography/Typography';
import { phoneNumberFormatter } from '../../../../utils/formatter/phoneNumber';
import { useQueryCaregiverGet } from '../../../../hooks/query/profile/useQueryCaregiverGet';
import { theme } from '../../../../config/Theme';

const sectionStyle = {
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.backgroundDark,
  paddingBottom: 16,
};

export const Caregiver = () => {
  const { data, isLoading, isError } = useQueryCaregiverGet({
    retry: false,
  });

  const content = (
    <View style={{ gap: 4 }}>
      {data?.isCaregiverSet && (
        <View style={data.isNursingSet || data.isPhysicalTherapySet ? sectionStyle : null}>
          <Typography weight="semiBold">
            {data.firstName} {data.lastName}
          </Typography>
          <Typography>{phoneNumberFormatter(data.phoneNumber)}</Typography>
        </View>
      )}
      {data?.isPhysicalTherapySet && (
        <View style={[{ gap: 12 }, data.isNursingSet && sectionStyle]}>
          <View>
            <Typography weight="semiBold">Home Health Physical Therapy</Typography>
          </View>
          <View>
            {data.physicalTherapyServiceName && <Typography>{data.physicalTherapyServiceName}</Typography>}
            {data.physicalTherapyPhoneNumber && (
              <Typography>{phoneNumberFormatter(data.physicalTherapyPhoneNumber)}</Typography>
            )}
          </View>
        </View>
      )}
      {data?.isNursingSet && (
        <View style={{ gap: 12 }}>
          <View>
            <Typography weight="semiBold">Home Health Nursing</Typography>
          </View>
          <View>
            {data.nursingServiceName && <Typography>{data.nursingServiceName}</Typography>}
            {data.nursingPhoneNumber && <Typography>{phoneNumberFormatter(data.nursingPhoneNumber)}</Typography>}
          </View>
        </View>
      )}
    </View>
  );

  return (
    <DataCard
      title="Caregiver"
      navigationData={{
        navigationScreen: 'Caregiver',
      }}
      dataProps={{
        data,
        isLoading,
        isError,
      }}
      arrayToOmit={['isCreated']}
    >
      {content}
    </DataCard>
  );
};
