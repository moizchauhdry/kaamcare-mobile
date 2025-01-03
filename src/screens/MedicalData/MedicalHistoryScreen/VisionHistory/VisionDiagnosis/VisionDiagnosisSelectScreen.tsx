import { useQueryVisionHistoryList } from '../../../../../hooks/query/medicalHistory/visionHistory/useQueryVisionHistoryList';
import { MedicalHistoryCustomSelectLayout } from '../../../../../components/Layouts/MedicalHistory/MedicalHistoryCustomSelectLayout';
import {
  commonVisionHistoryDiagnosis,
  dynamicVisionHistoryDiagnosis,
} from '../../../../../constants/data/medicalHistory/visionHistory';

export const VisionDiagnosisSelectScreen = () => {
  const {
    data = {
      visionDiagnosis: [],
    },
  } = useQueryVisionHistoryList();

  return (
    <MedicalHistoryCustomSelectLayout
      title="Add Vision Diagnosis"
      navigationScreen="VisionHistoryForm"
      sectionName="visionDiagnosis"
      userData={data.visionDiagnosis}
      selectProps={{
        commonData: commonVisionHistoryDiagnosis,
        dynamicData: dynamicVisionHistoryDiagnosis,
        searchInputProps: {
          placeholder: 'Search your vision diagnosis',
        },
      }}
    />
  );
};
