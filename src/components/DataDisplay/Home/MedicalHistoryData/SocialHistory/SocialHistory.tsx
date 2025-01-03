import { View } from 'react-native';
import { memo } from 'react';

import { DataCard } from 'components/UI/DataCard/DataCard';
import type { HomeCardDataType } from 'model/common/HomeData';

import { useQuerySocialHistoryList } from '../../../../../hooks/query/medicalHistory/socialHistory/useQuerySocialHistoryList';
import { Typography } from '../../../../UI/Typography/Typography';

export const SocialHistory = memo((props: HomeCardDataType) => {
  const {
    data = {
      alcohol: [],
      recreationalDrugUse: [],
      smoking: [],
      occupation: [],
    },
    isLoading,
  } = useQuerySocialHistoryList();

  const wholeData = {
    alcohol: data?.alcohol.length > 0 ? data.alcohol : null,
    smoking: data?.smoking.length > 0 ? data.smoking : null,
    recreationalDrug: data?.recreationalDrugUse.length > 0 ? data.recreationalDrugUse : null,
    occupation: data?.occupation.length > 0 ? data.occupation : null,
  };

  const calculateDataCount = () =>
    data.alcohol.length + data.smoking.length + data.recreationalDrugUse.length + data.occupation.length;

  const renderContent = () => (
    <View>
      <Typography>{`\u2022 ${calculateDataCount()} entries added.`}</Typography>
      <Typography>{`\u2022 Tap to see details.`}</Typography>
    </View>
  );

  return (
    <DataCard
      title={props.title}
      navigationData={{
        navigationScreen: 'MedicalDataNavigation',
        navigationProps: {
          listScreenName: props.listNavigation,
          addNewScreenName: props.addNavigation,
        },
      }}
      dataProps={{
        isLoading,
        data: wholeData,
      }}
    >
      {renderContent()}
    </DataCard>
  );
});
