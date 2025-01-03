import type { DefaultSectionT, SectionListData } from 'react-native';

import { SectionList } from 'components/DataDisplay/List/SectionList/SectionList';

import { SocialHistorySmokingCard } from '../../../AddMedicalData/MedicalHistory/SocialHistory/SmokingCard';
import { SocialHistoryAlcoholCard } from '../../../AddMedicalData/MedicalHistory/SocialHistory/AlcoholCard';
import { SocialHistoryOccupationCard } from '../../../AddMedicalData/MedicalHistory/SocialHistory/OccupationCard';
import { SocialHistoryRecreationalDrugUse } from '../../../AddMedicalData/MedicalHistory/SocialHistory/RecreationalDrugUseCard';
import type { SocialHistory } from '../../../../../model/api/medicalHistory/SocialHistory';

type SocialHistoryListProps = {
  alcohol: SocialHistory[];
  occupation: SocialHistory[];
  recreationalDrug: SocialHistory[];
  smoking: SocialHistory[];
};

export const SocialHistoryList = ({ alcohol, occupation, recreationalDrug, smoking }: SocialHistoryListProps) => {
  const sections: SectionListData<SocialHistory, DefaultSectionT>[] = [
    {
      title: 'Smoking',
      data: smoking,
      component: SocialHistorySmokingCard,
      screen: 'SocialHistorySmokingForm',
    },
    {
      title: 'Alcohol',
      data: alcohol,
      component: SocialHistoryAlcoholCard,
      screen: 'SocialHistoryAlcoholForm',
    },
    {
      title: 'Recreational drug use',
      data: recreationalDrug,
      component: SocialHistoryRecreationalDrugUse,
      screen: 'SocialHistoryDrugForm',
    },
    {
      title: 'Occupation',
      data: occupation,
      component: SocialHistoryOccupationCard,
      screen: 'SocialHistoryOccupationForm',
    },
  ];

  return <SectionList sections={sections} />;
};
