import { View } from 'react-native';
import { memo } from 'react';

import { DataCard } from 'components/UI/DataCard/DataCard';

import type { HomeCardDataType } from '../../../../../model/common/HomeData';
import { Typography } from '../../../../UI/Typography/Typography';
import { ListItemTypography } from '../../../../UI/Typography/ListItemTypography/ListItemTypography';
import { useQueryHearingHistoryList } from '../../../../../hooks/query/medicalHistory/hearingHistory/useQueryHearingHistoryList';
import type { HearingHistory as HearingHistoryType } from '../../../../../model/api/medicalHistory/HearingHistory';
import { AttachmentTypography } from '../../../../UI/Typography/AttachmentTypography/AttachmentTypography';

const DISPLAY_ELEMENT_COUNT = 3;

export const HearingHistory = memo((props: HomeCardDataType) => {
  const {
    data = {
      hearingAidsCochlearImplants: [],
      hearingDiagnosis: [],
      hearingTests: [],
    },
    isLoading,
  } = useQueryHearingHistoryList();
  const diagnosisDisplay = data.hearingDiagnosis.slice(0, DISPLAY_ELEMENT_COUNT);
  const aidsDisplay = data.hearingAidsCochlearImplants.slice(0, DISPLAY_ELEMENT_COUNT);
  const testsDisplay = data.hearingTests.slice(0, DISPLAY_ELEMENT_COUNT);
  const allData = {
    diagnosis: diagnosisDisplay,
    aids: aidsDisplay,
    tests: testsDisplay,
  };

  const renderItem = (name: string, displayData?: HearingHistoryType[], hearingData?: HearingHistoryType[]) => {
    const calculateMore = hearingData ? hearingData.length - DISPLAY_ELEMENT_COUNT : 0;

    return displayData && displayData?.length > 0 ? (
      <View>
        <View style={{ gap: 4 }}>
          <Typography weight="semiBold">{name}</Typography>
          <View style={{ paddingLeft: 8 }}>
            {displayData.map((elem) => (
              <View key={elem.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <ListItemTypography key={elem.id}>{elem.name}</ListItemTypography>
                <AttachmentTypography attachments={elem.attachments} />
              </View>
            ))}
            {calculateMore > 0 ? <ListItemTypography>{`+${calculateMore} more`}</ListItemTypography> : null}
          </View>
        </View>
      </View>
    ) : null;
  };

  const renderContent = () => (
    <View style={{ gap: 8 }}>
      {renderItem('Diagnosis', diagnosisDisplay, data.hearingDiagnosis)}
      {renderItem('Hearing Aids', aidsDisplay, data.hearingAidsCochlearImplants)}
      {renderItem('Hearing Tests', testsDisplay, data.hearingTests)}
    </View>
  );

  return (
    <DataCard
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
        data: allData,
      }}
    >
      {renderContent()}
    </DataCard>
  );
});
