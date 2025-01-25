import { View } from 'react-native';
import React, { useMemo } from 'react';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { DataCard } from 'components/UI/DataCard/DataCard';

import { useQueryHealthcareProviderList } from '../../../hooks/query/profile/useQueryHealthcareProviderList';
import { HealthcareProvider } from './components/HealthcareProvider';
import ChevronRight from '../../../assets/icons/chevron-right.svg';
import { Typography } from '../../UI/Typography/Typography';
import Plus from '../../../assets/icons/plus-circle.svg';
import type { MoreNavigationParamsList } from '../../Navigation/MoreNavigation';

export const HealthcareProvidersList = () => {
  const navigation = useNavigation<StackNavigationProp<MoreNavigationParamsList>>();
  const { data } = useQueryHealthcareProviderList();
  const isPrimaryInList = useMemo(() => data?.some((elem) => elem.isPrimaryCareProvider) ?? false, [data]);

  const renderList = () => {
    if (!data || data.length === 0) {
      return (
        <DataCard
          title="Healthcare provider name"
          navigationData={{
            navigationScreen: 'HealthcareProvider',
          }}
        />
      );
    }

    return (
      <View style={{ gap: 8 }}>
        {data.map((elem) => (
          <HealthcareProvider
            id={elem.healthcareProviderId}
            key={elem.healthcareProviderId}
            data={elem}
            isPrimaryInList={isPrimaryInList}
          />
        ))}
      </View>
    );
  };

  return (
    <>
      <View style={{ paddingHorizontal: 16 }}>
        <View style={{ flexDirection: 'row' }}>
          <SvgXml xml={ChevronRight} />
          <Typography style={{ flex: 1 }} weight="regular">
            Healthcare providers
          </Typography>
          <SvgXml xml={Plus} onPress={() => navigation.navigate('HealthcareProvider', { isPrimaryInList })} />
        </View>
      </View>
      <View style={{ paddingHorizontal: 16 }}>{renderList()}</View>
    </>
  );
};
