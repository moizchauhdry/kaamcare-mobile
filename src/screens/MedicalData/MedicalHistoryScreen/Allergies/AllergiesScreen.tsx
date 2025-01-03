import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import allergies from 'assets/icons/allergies.svg';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { MedicalHistoryUnitLayout } from '../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitLayout';
import { MedicalHistoryUnitEmpty } from '../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitEmpty';
import { useQueryAllergies } from '../../../../hooks/query/medicalHistory/allergies/useQueryAllergies';
import { MedicalHistoryUnitList } from '../../../../components/Layouts/MedicalHistory/MedicalHistoryUnitList';
import { AllergyCard } from '../../../../components/DataDisplay/AddMedicalData/MedicalHistory/AllergyCard/AllergyCard';

type AllergiesScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'Allergies'>;

export const AllergiesScreen = ({ navigation }: AllergiesScreenProps) => {
  const { data = [] } = useQueryAllergies();

  return (
    <MedicalHistoryUnitLayout title="Allergies">
      {data.length > 0 ? (
        <MedicalHistoryUnitList
          data={data}
          renderItem={({ item }) => <AllergyCard {...item} />}
          onAddButtonPress={() => navigation.navigate('SelectAllergy')}
          additionButtonText="Add allergies"
        />
      ) : (
        <MedicalHistoryUnitEmpty
          contentTitle="Start adding allergies"
          description="Your allergies section is empty. Tap the button to add your first vaccine"
          buttonText="Add Allergy"
          onButtonPress={() => navigation.navigate('SelectAllergy')}
          icon={allergies}
        />
      )}
    </MedicalHistoryUnitLayout>
  );
};
