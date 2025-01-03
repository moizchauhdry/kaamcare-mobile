import type { DefaultSectionT, SectionListData } from 'react-native';
import { View } from 'react-native';

import { SectionList } from 'components/DataDisplay/List/SectionList/SectionList';
import { VaccineCard as VaccineCardComponent } from 'components/DataDisplay/AddMedicalData/PrimaryPrevention/Immunization/VaccineCard';

import type { GroupedIllnessData, Vaccine, VaccineCard } from '../../../../../model/api/primaryPrevention/Immunization';
import { VaccineCardPreview } from '../../../AddMedicalData/PrimaryPrevention/Immunization/VaccineCardPreview';
import { AdditionButton } from '../../../../UI/Button/AdditionButton';

type ImmunizationListProps = {
  vaccines: GroupedIllnessData[];
  vaccinesCard: VaccineCard[];
  onPress?: () => void;
};

export const ImmunizationList = ({ vaccines, vaccinesCard, onPress }: ImmunizationListProps) => {
  const sections: SectionListData<Vaccine | VaccineCard, DefaultSectionT>[] = [
    {
      title: 'Vaccine Cards',
      data: vaccinesCard,
      component: VaccineCardPreview,
      screen: 'VaccineCardForm',
      additionalCountText: undefined,
    },
    ...vaccines.map((elem) => ({
      title: elem.illness,
      data: elem.data,
      component: VaccineCardComponent,
      screen: 'SelectVaccine',
      additionalCountText: ['dose', 'doses'],
    })),
  ];

  return (
    <View style={{ flex: 1, paddingTop: 16 }}>
      <AdditionButton onPress={onPress} style={{ paddingTop: 16 }}>
        Add vaccine
      </AdditionButton>
      <SectionList sections={sections} />
    </View>
  );
};
