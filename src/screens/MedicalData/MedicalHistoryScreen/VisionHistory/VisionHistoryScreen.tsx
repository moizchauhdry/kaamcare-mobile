import { MedicalHistoryUnitLayout } from 'components/Layouts/MedicalHistory/MedicalHistoryUnitLayout';

import { VisionHistoryList } from '../../../../components/DataDisplay/List/MedicalHistory/VisionHistory/VisionHistoryList';
import { useQueryVisionHistoryList } from '../../../../hooks/query/medicalHistory/visionHistory/useQueryVisionHistoryList';

export const VisionHistoryScreen = () => {
  const {
    data = {
      eyeWears: [],
      visionDiagnosis: [],
    },
  } = useQueryVisionHistoryList();

  return (
    <MedicalHistoryUnitLayout title="Vision History">
      <VisionHistoryList visionDiagnosis={data.visionDiagnosis ?? []} eyeWear={data.eyeWears ?? []} />
    </MedicalHistoryUnitLayout>
  );
};
