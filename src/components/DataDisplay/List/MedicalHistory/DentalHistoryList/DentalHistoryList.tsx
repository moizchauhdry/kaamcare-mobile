import type { DefaultSectionT, SectionListData } from 'react-native';

import { SectionList } from 'components/DataDisplay/List/SectionList/SectionList';

import { DentalHistoryCard } from '../../../AddMedicalData/MedicalHistory/DentalHistory/DentalHistoryCard';
import type { DentalHistory } from '../../../../../model/api/medicalHistory/DentalHistory';

type SocialHistoryListProps = {
  diagnosis: DentalHistory[];
  prosthetics: DentalHistory[];
  odontogram: DentalHistory[];
};

export const DentalHistoryList = ({ prosthetics, diagnosis, odontogram }: SocialHistoryListProps) => {
  const sections: SectionListData<DentalHistory, DefaultSectionT>[] = [
    {
      title: 'Diagnosis',
      data: diagnosis,
      component: DentalHistoryCard,
      screen: 'DentalHistorySelectDiagnosis',
      additionalProps: { sectionName: 'dentalDiagnosis' },
      params: { sectionName: 'dentalDiagnosis' },
    },
    {
      title: 'Prosthetics',
      data: prosthetics,
      component: DentalHistoryCard,
      screen: 'DentalHistorySelectProsthetics',
      additionalProps: { sectionName: 'dentalProthetics' },
      params: { sectionName: 'dentalProthetics' },
    },
    {
      title: 'Odontogram',
      data: odontogram,
      component: DentalHistoryCard,
      screen: 'DentalHistoryForm',
      additionalProps: { sectionName: 'dentalOntograms' },
      params: { sectionName: 'dentalOntograms', name: 'Odontogram' },
    },
  ];

  return <SectionList sections={sections} />;
};
