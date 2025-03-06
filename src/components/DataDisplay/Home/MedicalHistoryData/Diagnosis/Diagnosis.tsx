import { View } from 'react-native';
import { memo } from 'react';

import type { HomeCardDataType } from 'model/common/HomeData';

import { HomeDataCard } from '../../../../UI/DataCard/HomeDataCard';
import { useQueryDiagnosisList } from '../../../../../hooks/query/medicalHistory/diagnosis/useQueryDiagnosisList';
import { ListItemTypography } from '../../../../UI/Typography/ListItemTypography/ListItemTypography';
import { AttachmentTypography } from '../../../../UI/Typography/AttachmentTypography/AttachmentTypography';

export const Diagnosis = memo((props: HomeCardDataType) => {
  const {
    data = [],
    isLoading,
    isError,
  } = useQueryDiagnosisList({
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
        <View style={{ paddingLeft: 8, flexDirection: 'row', gap: 4, alignItems: 'center' }}>
          <ListItemTypography>{item.name}</ListItemTypography>
          <AttachmentTypography attachments={item.attachments} />
        </View>
      )}
    />
  );
});
