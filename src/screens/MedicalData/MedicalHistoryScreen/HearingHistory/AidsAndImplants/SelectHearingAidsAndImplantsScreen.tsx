import { MedicalHistoryCustomSelectLayout } from '../../../../../components/Layouts/MedicalHistory/MedicalHistoryCustomSelectLayout';
import { commonHearingHistoryHearingAidsData } from '../../../../../constants/data/medicalHistory/hearingHistory';
import { useQueryHearingHistoryList } from '../../../../../hooks/query/medicalHistory/hearingHistory/useQueryHearingHistoryList';

export const SelectHearingAidsAndImplantsScreen = () => {
  const {
    data = {
      hearingAidsCochlearImplants: [],
    },
  } = useQueryHearingHistoryList();

  return (
    <MedicalHistoryCustomSelectLayout
      title="Add Hearing Aids & Cochlear Implants"
      navigationScreen="HearingHistoryForm"
      sectionName="hearingAidsCochlearImplants"
      userData={data.hearingAidsCochlearImplants}
      selectProps={{
        commonData: commonHearingHistoryHearingAidsData,
        dynamicData: [],
        searchInputProps: {
          placeholder: 'Search your hearing aids & cochlear implants',
        },
      }}
    />
  );
};
