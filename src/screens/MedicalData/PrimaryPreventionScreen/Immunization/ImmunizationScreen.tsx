import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { MedicalHistoryUnitLayout } from '../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitLayout';
import { MedicalHistoryUnitEmpty } from '../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitEmpty';
import vaccine from '../../../../assets/icons/vaccine.svg';
import { useQueryVacinesList } from '../../../../hooks/query/primaryPrevention/immunizations/useQueryVacinesList';
import { ImmunizationList } from '../../../../components/DataDisplay/List/PrimaryPrevention/ImmunizationList/ImmunizationList';
import { useQueryVaccineCardList } from '../../../../hooks/query/primaryPrevention/immunizations/useQueryVaccineCardList';
import { groupByIllness } from '../../../../utils/primaryPrevention/immunizations';

type ImmunizationScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'Immunizations'>;

export const ImmunizationScreen = ({ navigation }: ImmunizationScreenProps) => {
  const { data = [] } = useQueryVacinesList();
  const { data: vaccineCards = [] } = useQueryVaccineCardList();
  const groupedData = groupByIllness(data);

  return (
    <MedicalHistoryUnitLayout title="Immunizations">
      {data.length > 0 || vaccineCards.length > 0 ? (
        <ImmunizationList
          vaccines={groupedData}
          vaccinesCard={vaccineCards}
          onPress={() => navigation.navigate('SelectVaccine')}
        />
      ) : (
        <MedicalHistoryUnitEmpty
          contentTitle="Start adding vaccine"
          description="Your Immunizations list is empty. Tap the button to add your first vaccine"
          buttonText="Add vaccine"
          onButtonPress={() => navigation.navigate('SelectVaccine')}
          icon={vaccine}
        />
      )}
    </MedicalHistoryUnitLayout>
  );
};
