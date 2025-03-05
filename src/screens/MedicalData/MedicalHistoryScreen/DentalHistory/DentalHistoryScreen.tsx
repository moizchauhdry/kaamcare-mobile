import { MedicalHistoryUnitLayout } from 'components/Layouts/MedicalHistory/MedicalHistoryUnitLayout';

import { useQueryDentalHistoryList } from '../../../../hooks/query/medicalHistory/dentalHistory/useQueryDentalHistoryList';
import { DentalHistoryList } from '../../../../components/DataDisplay/List/MedicalHistory/DentalHistoryList/DentalHistoryList';

export const DentalHistoryScreen = () => {
  const {
    data: dentalHistory = {
      dentalDiagnosis: [],
      dentalOntograms: [],
      dentalProthetics: [],
    },
  } = useQueryDentalHistoryList();
  console.log('data of Dental History====', JSON.stringify(dentalHistory));

  return (
    <MedicalHistoryUnitLayout title="Dental History">
      <DentalHistoryList
        diagnosis={dentalHistory.dentalDiagnosis}
        odontogram={dentalHistory.dentalOntograms}
        prosthetics={dentalHistory.dentalProthetics}
      />
    </MedicalHistoryUnitLayout>
  );
};
