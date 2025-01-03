import { View } from 'react-native';
import { memo } from 'react';

import { DataCard } from 'components/UI/DataCard/DataCard';
import type { HomeCardDataType } from 'model/common/HomeData';

import { useQueryVacinesList } from '../../../../../hooks/query/primaryPrevention/immunizations/useQueryVacinesList';
import { Typography } from '../../../../UI/Typography/Typography';
import { groupByIllness } from '../../../../../utils/primaryPrevention/immunizations';
import { ListItemTypography } from '../../../../UI/Typography/ListItemTypography/ListItemTypography';
import { displayDateSegment } from '../../../../../utils/date/date';
import { useQueryVaccineCardList } from '../../../../../hooks/query/primaryPrevention/immunizations/useQueryVaccineCardList';

const DISPLAY_ELEMENT_COUNT = 3;

export const Immunizations = memo((props: HomeCardDataType) => {
  const { data = [], isLoading, isError } = useQueryVacinesList();
  const { data: vaccineCards = [] } = useQueryVaccineCardList();
  const groupedData = groupByIllness(data);
  const dataDisplay = groupedData?.slice(0, DISPLAY_ELEMENT_COUNT);

  const renderContent = () => {
    const calculateMore = dataDisplay ? groupedData.length - DISPLAY_ELEMENT_COUNT : 0;

    return (
      <View style={{ gap: 4 }}>
        {vaccineCards.length > 0 ? (
          <Typography weight="semiBold" style={{ paddingBottom: 8 }}>
            Vaccine Cards {`(${vaccineCards.length})`}
          </Typography>
        ) : null}
        {dataDisplay.map((elem) => {
          const groupedByVaccine = elem.data.reduce(
            (acc, item) => {
              const vaccineName = item.vaccineName || '';
              const date = displayDateSegment(
                item.diagnosisDate?.day,
                item.diagnosisDate?.month,
                item.diagnosisDate?.year,
              );

              if (vaccineName && date) {
                if (!acc[vaccineName]) {
                  acc[vaccineName] = [];
                }
                acc[vaccineName]!.push(date);
              }
              return acc;
            },
            {} as Record<string, string[]>,
          );
          const entries = Object.entries(groupedByVaccine);
          return (
            <View key={elem.illness} style={{ gap: 4 }}>
              <Typography weight="semiBold" size="md">
                {elem.illness} {`(${elem.data.length}${elem.data.length > 1 ? ' doses' : ' dose'})`}
              </Typography>

              {entries.map(([vaccineName, dates]) => (
                <View key={vaccineName}>
                  {entries.length > 1 ? (
                    <Typography weight="normal" size="md">
                      {vaccineName}
                    </Typography>
                  ) : null}
                  {dates.length > 0 && (
                    <ListItemTypography weight="normal" size="md">
                      {dates.join(', ')}
                    </ListItemTypography>
                  )}
                </View>
              ))}
            </View>
          );
        })}
        {calculateMore > 0 ? (
          <Typography weight="semiBold" size="sm" color="secondary">
            {`+${calculateMore} more`}
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
        data: [...data, ...vaccineCards],
        isError,
      }}
    >
      {renderContent()}
    </DataCard>
  );
});
