import { View } from 'react-native';
import { memo } from 'react';

import { DataCard } from 'components/UI/DataCard/DataCard';
import type { HomeCardDataType } from 'model/common/HomeData';

import { Typography } from '../../../../UI/Typography/Typography';
import { useQueryScreeningExamsList } from '../../../../../hooks/query/primaryPrevention/screeningExams/useQueryScreeningExamsList';
import { groupByScreeningExamName } from '../../../../../utils/primaryPrevention/screeningExams';
import { CardAttachments } from '../../../Attachment/CardAttachments';

const DISPLAY_ELEMENT_COUNT = 2;

export const ScreeningExams = memo((props: HomeCardDataType) => {
  const { data = [], isLoading, isError } = useQueryScreeningExamsList();

  const groupedData = groupByScreeningExamName(data);
  const dataDisplay = groupedData?.slice(0, DISPLAY_ELEMENT_COUNT);

  const renderContent = () => {
    const calculateMore = dataDisplay ? groupedData.length - DISPLAY_ELEMENT_COUNT : 0;
    return (
      <View style={{ gap: 16 }}>
        {dataDisplay.map((elem) => (
          <View key={elem.name} style={{ gap: 4 }}>
            <Typography weight="semiBold" size="md">
              {elem.name}
            </Typography>
            {elem.data?.[0]?.explanation ? (
              <Typography weight="normal" size="md">
                {elem.data?.[0]?.explanation}
              </Typography>
            ) : null}
            <CardAttachments attachment={elem?.data?.[0]?.attachments} />
          </View>
        ))}
        {calculateMore > 0 ? (
          <Typography weight="semiBold" size="sm" color="secondary">
            {`+ ${calculateMore} more`}
          </Typography>
        ) : null}
      </View>
    );
  };

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
        data,
        isError,
      }}
    >
      {renderContent()}
    </DataCard>
  );
});
