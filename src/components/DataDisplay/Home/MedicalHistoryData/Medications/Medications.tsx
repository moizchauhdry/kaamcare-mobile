import { memo } from 'react';

import type { HomeCardDataType } from 'model/common/HomeData';

import { useQueryMedications } from '../../../../../hooks/query/medicalHistory/medication/useQueryMedications';
import { HomeDataCard } from '../../../../UI/DataCard/HomeDataCard';
import type { Medication } from '../../../../../model/api/medicalHistory/Medications';
import { MedicationData } from './MedicationData';

export const Medications = memo((props: HomeCardDataType) => {
  const {
    isLoading,
    isError,
    data = [],
  } = useQueryMedications({
    retry: false,
  });

  return (
    <HomeDataCard<Medication>
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
      renderItem={({ item }) => <MedicationData {...item} />}
    />
  );
});
