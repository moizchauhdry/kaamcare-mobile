import { View } from 'react-native';
import { memo } from 'react';

import type { HomeCardDataType } from 'model/common/HomeData';

import { useQueryAllergies } from '../../../../../hooks/query/medicalHistory/allergies/useQueryAllergies';
import { Typography } from '../../../../UI/Typography/Typography';
import { HomeDataCard } from '../../../../UI/DataCard/HomeDataCard';

export const Allergies = memo((props: HomeCardDataType) => {
  const {
    data = [],
    isLoading,
    isError,
  } = useQueryAllergies({
    retry: false,
  });

  return (
    <HomeDataCard
      title={props.title}
      navigationData={{
        navigationScreen: 'MedicalDataNavigation',
        navigationProps: {
          addNewScreenName: props.addNavigation,
          listScreenName: props.listNavigation,
        },
      }}
      dataProps={{
        isLoading,
        data,
        isError,
      }}
      renderItem={({ item }) => (
        <View style={{ paddingLeft: 8, flexDirection: 'row', gap: 8 }}>
          <Typography>{`\u2022`}</Typography>
          <Typography>{`${item.allergyName}`}</Typography>
        </View>
      )}
    />
  );
});
