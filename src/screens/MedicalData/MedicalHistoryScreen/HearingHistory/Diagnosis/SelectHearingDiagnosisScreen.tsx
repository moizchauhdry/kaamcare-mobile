import { MedicalHistoryCustomSelectLayout } from '../../../../../components/Layouts/MedicalHistory/MedicalHistoryCustomSelectLayout';
import {
  commonHearingHistoryDiagnosisData,
  dynamicHearingHistoryDiagnosisData,
} from '../../../../../constants/data/medicalHistory/hearingHistory';
import { useQueryHearingHistoryList } from '../../../../../hooks/query/medicalHistory/hearingHistory/useQueryHearingHistoryList';

export const SelectHearingDiagnosisScreen = () => {
  const {
    data = {
      hearingDiagnosis: [],
    },
  } = useQueryHearingHistoryList();

  return (
    <MedicalHistoryCustomSelectLayout
      title="Add Hearing Diagnosis"
      navigationScreen="HearingHistoryForm"
      sectionName="hearingDiagnosis"
      userData={data.hearingDiagnosis}
      selectProps={{
        commonData: commonHearingHistoryDiagnosisData,
        dynamicData: dynamicHearingHistoryDiagnosisData,
        searchInputProps: {
          placeholder: 'Search your hearing diagnosis',
        },
      }}
    />
  );
};
