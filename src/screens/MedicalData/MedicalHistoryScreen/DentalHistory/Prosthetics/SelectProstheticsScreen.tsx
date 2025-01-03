import { MedicalHistoryCustomSelectLayout } from '../../../../../components/Layouts/MedicalHistory/MedicalHistoryCustomSelectLayout';
import { useQueryDentalHistoryList } from '../../../../../hooks/query/medicalHistory/dentalHistory/useQueryDentalHistoryList';
import { commonDentalHistoryProstheticsData } from '../../../../../constants/data/medicalHistory/dentalHistory';

export const SelectProstheticsScreen = () => {
  const { data } = useQueryDentalHistoryList();

  return (
    <MedicalHistoryCustomSelectLayout
      title="Add Prosthetics"
      navigationScreen="DentalHistoryForm"
      sectionName="dentalProthetics"
      userData={data?.dentalProthetics ?? []}
      selectProps={{
        commonData: commonDentalHistoryProstheticsData,
        dynamicData: [],
        searchInputProps: {
          placeholder: 'Search your prosthetics',
        },
      }}
    />
  );
};
