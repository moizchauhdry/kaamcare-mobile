import { View } from 'react-native';
import { memo } from 'react';

import { DataCard } from 'components/UI/DataCard/DataCard';

import type { HomeCardDataType } from '../../../../../model/common/HomeData';
import { useQueryGetADL } from '../../../../../hooks/query/goalsOfCare/adl/useQueryGetADL';
import { Typography } from '../../../../UI/Typography/Typography';

const keysLabel: { [key: string]: string } = {
  ToiletUse: 'Toilet use',
  Grooming: 'Grooming',
  Dressing: 'Dressing',
  Stairs: 'Stairs',
  Feeding: 'Feeding',
  BladderControl: 'Bladder control',
  Transfers: 'Transfers',
  MobilityOnLevelSurfaces: 'Mobility on level surfaces',
  Bathing: 'Bathing',
  BowelControl: 'Bowel control',
};

export const ActivitiesOfDailyLiving = memo((props: HomeCardDataType) => {
  const {
    data = [],
    isLoading,
    isError,
  } = useQueryGetADL({
    retry: false,
  });

  const notIndependent = data.filter(
    (elem) =>
      elem.values &&
      elem.values.length > 0 &&
      !(elem.values?.includes('Independent') || elem.values?.includes('Continent')),
  );

  const renderContent = () => {
    const allSectionDisable = data.every((elem) => !elem.isActive);

    if (allSectionDisable) {
      return (
        <View>
          <Typography style={{ fontStyle: 'italic' }} color="gray">
            Tap to add more information
          </Typography>
        </View>
      );
    }

    return (
      <View>
        {data.length > 0 && notIndependent.length === 0 ? (
          <Typography weight="semiBold">I am independent with all activities of daily living</Typography>
        ) : null}
        {notIndependent.length > 0 ? (
          <View style={{ flexDirection: 'column', gap: 12 }}>
            <Typography weight="semiBold">I am NOT independent with all activities of daily living:</Typography>
            <View style={{ flexDirection: 'column', gap: 12 }}>
              {notIndependent.map((elem) => (
                <View style={{ flexDirection: 'column' }} key={elem.key}>
                  <Typography weight="semiBold">
                    {keysLabel[elem.key]}
                    {elem.explanation ? ':' : ''}
                  </Typography>
                  {elem.explanation ? (
                    <Typography style={{ fontStyle: 'italic' }}>{elem.explanation}</Typography>
                  ) : null}
                </View>
              ))}
            </View>
          </View>
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
