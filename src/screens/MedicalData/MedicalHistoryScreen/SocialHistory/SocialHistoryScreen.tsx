import { MedicalHistoryUnitLayout } from 'components/Layouts/MedicalHistory/MedicalHistoryUnitLayout';
import { SocialHistoryList } from 'components/DataDisplay/List/MedicalHistory/SocialHistoryList/SocialHistoryList';
import { useQuerySocialHistoryList } from 'hooks/query/medicalHistory/socialHistory/useQuerySocialHistoryList';

export const SocialHistoryScreen = () => {
  const {
    data = {
      alcohol: [],
      recreationalDrugUse: [],
      smoking: [],
      occupation: [],
    },
  } = useQuerySocialHistoryList();

  return (
    <MedicalHistoryUnitLayout title="Social History">
      <SocialHistoryList
        alcohol={data.alcohol}
        occupation={data.occupation}
        recreationalDrug={data.recreationalDrugUse}
        smoking={data.smoking}
      />
    </MedicalHistoryUnitLayout>
  );
};
