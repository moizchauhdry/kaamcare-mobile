import { View } from 'react-native';
import { memo } from 'react';

import { DataCard } from 'components/UI/DataCard/DataCard';
import type { HomeCardDataType } from 'model/common/HomeData';

import { useQueryVisionHistoryList } from '../../../../../hooks/query/medicalHistory/visionHistory/useQueryVisionHistoryList';
import { Typography } from '../../../../UI/Typography/Typography';
import { ListItemTypography } from '../../../../UI/Typography/ListItemTypography/ListItemTypography';
import type { VisionHistoryModel } from '../../../../../model/api/medicalHistory/VisionHistory';
import { AttachmentTypography } from '../../../../UI/Typography/AttachmentTypography/AttachmentTypography';

const DISPLAY_ELEMENT_COUNT = 3;

export const VisionHistory = memo((props: HomeCardDataType) => {
  const { data, isLoading } = useQueryVisionHistoryList();
  const eyeWearDisplay = data?.eyeWears?.slice(0, DISPLAY_ELEMENT_COUNT) ?? [];
  const visionDiagnosisDisplay = data?.visionDiagnosis?.slice(0, DISPLAY_ELEMENT_COUNT) ?? [];
  const allData = {
    eyeWear: data?.eyeWears?.length === 0 ? null : data?.eyeWears,
    visionDiagnosis: data?.visionDiagnosis?.length === 0 ? null : data?.visionDiagnosis,
  };

  const renderItem = (name: string, visionHistoryData?: VisionHistoryModel[], visionData?: VisionHistoryModel[]) => {
    const calculateMore = visionData ? visionData.length - DISPLAY_ELEMENT_COUNT : 0;

    return (
      <View>
        {visionHistoryData && visionHistoryData?.length > 0 ? (
          <View style={{ gap: 4 }}>
            <Typography weight="semiBold">{name}</Typography>
            <View style={{ paddingLeft: 8 }}>
              {visionHistoryData.map((elem) => (
                <View key={elem.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <ListItemTypography key={elem.id}>{elem.kind ?? elem.name}</ListItemTypography>
                  <AttachmentTypography attachments={elem.attachments} />
                </View>
              ))}
              {calculateMore > 0 ? <ListItemTypography>{`+${calculateMore} more`}</ListItemTypography> : null}
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  const renderContent = () => (
    <View style={{ gap: 8 }}>
      {renderItem('Diagnosis', visionDiagnosisDisplay, data?.visionDiagnosis)}
      {renderItem('Eye Wear', eyeWearDisplay, data?.eyeWears)}
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
        data: allData,
      }}
    >
      {renderContent()}
    </DataCard>
  );
});
