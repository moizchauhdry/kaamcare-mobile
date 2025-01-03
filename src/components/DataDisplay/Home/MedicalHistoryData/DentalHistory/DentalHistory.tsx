import { View } from 'react-native';
import { memo } from 'react';

import { DataCard } from 'components/UI/DataCard/DataCard';

import type { HomeCardDataType } from '../../../../../model/common/HomeData';
import { useQueryDentalHistoryList } from '../../../../../hooks/query/medicalHistory/dentalHistory/useQueryDentalHistoryList';
import type { DentalHistory as DentalHistoryType } from '../../../../../model/api/medicalHistory/DentalHistory';
import { Typography } from '../../../../UI/Typography/Typography';
import { ListItemTypography } from '../../../../UI/Typography/ListItemTypography/ListItemTypography';
import { AttachmentTypography } from '../../../../UI/Typography/AttachmentTypography/AttachmentTypography';

const DISPLAY_ELEMENT_COUNT = 3;

export const DentalHistory = memo((props: HomeCardDataType) => {
  const { data, isLoading } = useQueryDentalHistoryList();
  const diagnosisDisplay = data?.dentalDiagnosis?.slice(0, DISPLAY_ELEMENT_COUNT);
  const prostheticsDisplay = data?.dentalProthetics?.slice(0, DISPLAY_ELEMENT_COUNT);
  const odontogramDisplay = data?.dentalOntograms?.slice(0, DISPLAY_ELEMENT_COUNT);
  const allData = {
    diagnosis: diagnosisDisplay?.length === 0 ? null : diagnosisDisplay,
    prosthetics: prostheticsDisplay?.length === 0 ? null : prostheticsDisplay,
    odontogram: odontogramDisplay?.length === 0 ? null : odontogramDisplay,
  };

  const renderItem = (name: string, dataDisplay?: DentalHistoryType[], dentalData?: DentalHistoryType[]) => {
    const calculateMore = dentalData ? dentalData.length - DISPLAY_ELEMENT_COUNT : 0;

    return (
      <View>
        {dataDisplay && dataDisplay?.length > 0 ? (
          <View style={{ gap: 4 }}>
            <Typography weight="semiBold">{name}</Typography>
            <View style={{ paddingLeft: 8 }}>
              {dataDisplay.map((elem) => (
                <View key={elem.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <ListItemTypography key={elem.id}>{elem.name}</ListItemTypography>
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
      {renderItem('Diagnosis', diagnosisDisplay, data?.dentalDiagnosis)}
      {renderItem('Prosthetics', prostheticsDisplay, data?.dentalProthetics)}
      {renderItem('Odontograms', odontogramDisplay, data?.dentalProthetics)}
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
