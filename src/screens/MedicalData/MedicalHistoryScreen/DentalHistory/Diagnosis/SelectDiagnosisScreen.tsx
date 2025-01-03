import { MedicalHistoryCustomSelectLayout } from '../../../../../components/Layouts/MedicalHistory/MedicalHistoryCustomSelectLayout';
import { useQueryDentalHistoryList } from '../../../../../hooks/query/medicalHistory/dentalHistory/useQueryDentalHistoryList';
import {
  commonDentalHistoryDiagnosisData,
  dynamicDentalHistoryDiagnosisData,
} from '../../../../../constants/data/medicalHistory/dentalHistory';

export const SelectDiagnosisScreen = () => {
  const { data } = useQueryDentalHistoryList();

  return (
    <MedicalHistoryCustomSelectLayout
      title="Add dental diagnosis"
      navigationScreen="DentalHistoryForm"
      sectionName="dentalDiagnosis"
      userData={data?.dentalDiagnosis ?? []}
      selectProps={{
        commonData: commonDentalHistoryDiagnosisData,
        dynamicData: dynamicDentalHistoryDiagnosisData,
        searchInputProps: {
          placeholder: 'Search your dental diagnosis',
        },
      }}
    />
  );
};
