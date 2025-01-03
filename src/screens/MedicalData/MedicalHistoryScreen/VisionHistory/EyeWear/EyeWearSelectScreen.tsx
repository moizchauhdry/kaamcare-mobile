import { MedicalHistoryCustomSelectLayout } from '../../../../../components/Layouts/MedicalHistory/MedicalHistoryCustomSelectLayout';
import { useQueryVisionHistoryList } from '../../../../../hooks/query/medicalHistory/visionHistory/useQueryVisionHistoryList';
import { commonVisionHistoryEyeWearData } from '../../../../../constants/data/medicalHistory/visionHistory';

export const EyeWearSelectScreen = () => {
  const {
    data = {
      eyeWears: [],
    },
  } = useQueryVisionHistoryList();

  return (
    <MedicalHistoryCustomSelectLayout
      title="Add Eye Wear"
      navigationScreen="VisionHistoryForm"
      sectionName="eyeWears"
      userData={data.eyeWears}
      selectProps={{
        commonData: commonVisionHistoryEyeWearData,
        dynamicData: [],
        searchInputProps: {
          placeholder: 'Search your eye wear',
        },
        searchKey: 'kind',
      }}
    />
  );
};
