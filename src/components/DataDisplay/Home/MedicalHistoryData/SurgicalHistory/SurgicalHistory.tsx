import { memo } from 'react';
import { View } from 'react-native';

import type { HomeCardDataType } from 'model/common/HomeData';

import { useQuerySurgicalHistoryList } from '../../../../../hooks/query/medicalHistory/surgicalHistory/useQuerySurgicalHistoryList';
import { HomeDataCard } from '../../../../UI/DataCard/HomeDataCard';
import { ListItemTypography } from '../../../../UI/Typography/ListItemTypography/ListItemTypography';
import type { SurgicalHistory as SurgicalHistoryType } from '../../../../../model/api/medicalHistory/SurgicalHistory';
import { AttachmentTypography } from '../../../../UI/Typography/AttachmentTypography/AttachmentTypography';

export const SurgicalHistory = memo((props: HomeCardDataType) => {
  const { data = { surgicalHistory: [] }, isLoading, isError } = useQuerySurgicalHistoryList();

  return (
    <HomeDataCard<SurgicalHistoryType>
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
        data: data.surgicalHistory,
        isError,
      }}
      renderItem={({ item }) => (
        <View style={{ gap: 4, flexDirection: 'row', alignItems: 'center' }}>
          <ListItemTypography>{item.name}</ListItemTypography>
          <AttachmentTypography attachments={item.attachments} />
        </View>
      )}
    />
  );
});
