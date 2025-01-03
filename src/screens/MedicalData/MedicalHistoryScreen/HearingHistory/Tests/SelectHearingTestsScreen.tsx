import { MedicalHistoryCustomSelectLayout } from '../../../../../components/Layouts/MedicalHistory/MedicalHistoryCustomSelectLayout';
import { commmonHearingHistoryHearingTestsData } from '../../../../../constants/data/medicalHistory/hearingHistory';
import { useQueryHearingHistoryList } from '../../../../../hooks/query/medicalHistory/hearingHistory/useQueryHearingHistoryList';

export const SelectHearingTestsScreen = () => {
  const {
    data = {
      hearingTests: [],
    },
  } = useQueryHearingHistoryList();

  return (
    <MedicalHistoryCustomSelectLayout
      title="Add Hearing Test"
      navigationScreen="HearingHistoryForm"
      sectionName="hearingTests"
      userData={data.hearingTests}
      selectProps={{
        commonData: commmonHearingHistoryHearingTestsData,
        dynamicData: [],
        searchInputProps: {
          placeholder: 'Search your Hearing Tests...',
        },
      }}
    />
  );
};
