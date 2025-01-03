import { isObjectSomeDataFilled } from 'utils/object/object';

import { MedicalLogsProfileCard } from './MedicalLogsProfileCard';
import { useQueriesMedicalLogsGet } from '../../../../hooks/query/medicalLogs/useQueriesMedicalLogsGet';
import type { MedicalLogsCarouselData } from './MedicalLogsCarousel';
import { MedicalLogsCarousel } from './MedicalLogsCarousel';
import { getHomePageMedicalLogsData } from '../../../../utils/medicalLogs/common';
import type { BloodSugarLogs } from '../../../../model/api/medicalLogs/BloodSugar';

export const MedicalLogs = () => {
  const data = useQueriesMedicalLogsGet();
  const isLoading = data.some((query) => query.isLoading);
  const properData = data.map((query) => query.data);
  const isSomeDataFilled = isObjectSomeDataFilled(properData);
  const carouselData = getHomePageMedicalLogsData(properData);
  const properCarouselData = carouselData.filter((elem) => {
    if (elem.title === 'Insulin') {
      const item = elem.logs as unknown as BloodSugarLogs;

      return item.some((log) => log.insulin && log.insulin.length > 0);
    }

    return Boolean(elem);
  });

  return !isSomeDataFilled ? (
    <MedicalLogsProfileCard
      title="Medical Logs"
      navigationData={{
        navigationScreen: 'MedicalDataNavigation',
        navigationProps: {
          screen: 'MedicalLogs',
        },
      }}
      dataProps={{
        isLoading,
        data: properData,
        isError: false,
      }}
    />
  ) : (
    <MedicalLogsCarousel data={properCarouselData as unknown as MedicalLogsCarouselData[]} />
  );
};
