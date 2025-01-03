import { View } from 'react-native';
import { memo } from 'react';

import type { HomeCardDataType } from 'model/common/HomeData';

import { HomeDataCard } from '../../../../UI/DataCard/HomeDataCard';
import { useQueryMedicalDevices } from '../../../../../hooks/query/medicalHistory/medicalDevices/useQueryMedicalDevices';
import { AttachmentTypography } from '../../../../UI/Typography/AttachmentTypography/AttachmentTypography';
import { ListItemTypography } from '../../../../UI/Typography/ListItemTypography/ListItemTypography';

export const MedicalDevices = memo((props: HomeCardDataType) => {
  const {
    data = { medicalDevices: [] },
    isLoading,
    isError,
  } = useQueryMedicalDevices({
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
        data: data.medicalDevices,
        isError,
      }}
      renderItem={({ item }) => (
        <View style={{ paddingLeft: 8, flexDirection: 'row', gap: 4, alignItems: 'center' }}>
          <ListItemTypography>{`${item.name}`}</ListItemTypography>
          <AttachmentTypography attachments={item.attachments} />
        </View>
      )}
    />
  );
});
