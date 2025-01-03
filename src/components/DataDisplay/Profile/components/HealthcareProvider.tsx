import { View } from 'react-native';

import { specializationCommonData, specializationDynamicData } from 'constants/forms/healthcareProvider';

import { DataCard } from '../../../UI/DataCard/DataCard';
import { Typography } from '../../../UI/Typography/Typography';
import { phoneNumberFormatter } from '../../../../utils/formatter/phoneNumber';
import type { HealthcareProvider as HealthcareProviderData } from '../../../../model/api/ProfileInformation';

type HealthcareProviderProps = {
  data: HealthcareProviderData;
  isPrimaryInList: boolean;
  id?: string;
};

export const HealthcareProvider = ({ id, data, isPrimaryInList }: HealthcareProviderProps) => {
  const getSpecialization = (value: string) =>
    [...specializationCommonData, ...specializationDynamicData]?.find((item) => item.value === value)?.label ?? value;
  const getTitle = () => `${data.title ? `${data.title} ` : ''}${data.firstName} ${data.lastName}`;
  const content = (
    <View style={{ gap: 4 }}>
      {data.isPrimaryCareProvider ? <Typography weight="bolder">Primary Care Provider</Typography> : null}
      {data.specialization ? <Typography>{getSpecialization(data.specialization)}</Typography> : null}
      {data.phoneNumber ? <Typography>{phoneNumberFormatter(data.phoneNumber)}</Typography> : null}
    </View>
  );

  return (
    <DataCard
      title={getTitle()}
      navigationData={{
        navigationScreen: 'HealthcareProvider',
        navigationProps: { id, additionalProps: { isPrimaryInList } },
      }}
      dataProps={{
        isLoading: false,
        data,
        isError: false,
      }}
    >
      {content}
    </DataCard>
  );
};
