import type { ListRenderItemInfo } from 'react-native';
import { FlatList } from 'react-native';
import type { ComponentType, JSXElementConstructor, ReactElement } from 'react';
import { useCallback, useMemo } from 'react';

import { Allergies } from './MedicalHistoryData/Allergies/Allergies';
import { DentalHistory } from './MedicalHistoryData/DentalHistory/DentalHistory';
import { Diagnosis } from './MedicalHistoryData/Diagnosis/Diagnosis';
import { FamilyHistory } from './MedicalHistoryData/FamilyHistory/FamilyHistory';
import { HearingHistory } from './MedicalHistoryData/HearingHistory.tsx/HearingHistory';
import { MedicalDevices } from './MedicalHistoryData/MedicalDevices/MedicalDevices';
import { Medications } from './MedicalHistoryData/Medications/Medications';
import { SocialHistory } from './MedicalHistoryData/SocialHistory/SocialHistory';
import { SurgicalHistory } from './MedicalHistoryData/SurgicalHistory/SurgicalHistory';
import { VisionHistory } from './MedicalHistoryData/VisionHistory/VisionHistory';
import { Immunizations } from './PrimaryPreventionData/Immunizations/Immunizations';
import { ScreeningExams } from './PrimaryPreventionData/ScreeningExams/ScreeningExams';
import { ActivitiesOfDailyLiving } from './GoalsOfCareData/ActivitiesOfDailyLiving/ActivitiesOfDailyLiving';
import { AdvancedCarePlanning } from './GoalsOfCareData/AdvancedCarePlanning/AdvancedCarePlanning';
import { homeData } from '../../../constants/data/addMedicalDataScreen';
import type { HomeCardDataType } from '../../../model/common/HomeData';

type HomeDataTilesProps = {
  selected: number;
  contentAboveTheList?: ReactElement<any, string | JSXElementConstructor<any>> | ComponentType<any>;
  contentBellowTheList?: ReactElement<any, string | JSXElementConstructor<any>> | ComponentType<any>;
};

export const HomeDataTiles = ({ selected, contentAboveTheList, contentBellowTheList }: HomeDataTilesProps) => {
  const properData = useMemo(() => homeData[selected], [selected]);
  const homeDataTilesData = useMemo(
    () => [
      [
        Allergies,
        Diagnosis,
        VisionHistory,
        DentalHistory,
        HearingHistory,
        Medications,
        SurgicalHistory,
        MedicalDevices,
        SocialHistory,
        FamilyHistory,
      ],
      [Immunizations, ScreeningExams],
      [ActivitiesOfDailyLiving, AdvancedCarePlanning],
    ],
    [],
  );

  const currentComponent = useMemo(() => homeDataTilesData[selected], [homeDataTilesData, selected]);

  const memoizedRender = useCallback(
    ({ item, index }: ListRenderItemInfo<HomeCardDataType>) => {
      const Component = currentComponent![index]!;
      return <Component {...item} />;
    },
    [currentComponent],
  );
  const memoizedKey = useCallback((item: HomeCardDataType) => item.id, []);

  return (
    <FlatList
      contentContainerStyle={{ gap: 16 }}
      showsVerticalScrollIndicator={false}
      data={properData}
      initialNumToRender={6}
      maxToRenderPerBatch={6}
      windowSize={2}
      renderItem={memoizedRender}
      keyExtractor={memoizedKey}
      ListHeaderComponent={contentAboveTheList}
      ListFooterComponent={contentBellowTheList}
      initialScrollIndex={0}
    />
  );
};
