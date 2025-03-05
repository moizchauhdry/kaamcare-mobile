import { MedicalHistoryUnitLayout } from 'components/Layouts/MedicalHistory/MedicalHistoryUnitLayout';

import { useQueryHearingHistoryList } from '../../../../hooks/query/medicalHistory/hearingHistory/useQueryHearingHistoryList';
import { HearingHistoryList } from '../../../../components/DataDisplay/List/MedicalHistory/HearingHistoryList/HearingHistoryList';

export const HearingHistoryScreen = () => {
  const {
    data = {
      hearingAidsCochlearImplants: [],
      hearingDiagnosis: [],
      hearingTests: [],
    },
  } = useQueryHearingHistoryList();
  console.log('data of HearingHistoryScreen====', JSON.stringify(data));

  return (
    <MedicalHistoryUnitLayout title="Hearing History">
      <HearingHistoryList
        diagnosis={data.hearingDiagnosis}
        aids={data.hearingAidsCochlearImplants}
        tests={data.hearingTests}
      />
    </MedicalHistoryUnitLayout>
  );
};
