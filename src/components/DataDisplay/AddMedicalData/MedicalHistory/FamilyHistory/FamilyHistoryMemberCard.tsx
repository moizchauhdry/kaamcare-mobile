import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { Card } from '../../../../UI/Card/Card';
import { Typography } from '../../../../UI/Typography/Typography';
import type { AddMedicalDataNavigationParamsList } from '../../../../Navigation/AddMedicalDataNavigation';
import type {
  FamilyMemberModel,
  FamilyMemberDiagnosisModelValues,
} from '../../../../../model/api/medicalHistory/FamilyHistory';
import { capitalize } from '../../../../../utils/string/string';
import { ListItemTypography } from '../../../../UI/Typography/ListItemTypography/ListItemTypography';
import { useQueryFamilyMemberData } from '../../../../../hooks/query/medicalHistory/familyHistory/useQueryFamilyMemberData';

const DISPLAY_ELEMENT_COUNT = 4;

type FamilyHistoryMemberCardProps = FamilyMemberModel;

export const FamilyHistoryMemberCard = ({ relationshipName, familyMemberName, id }: FamilyHistoryMemberCardProps) => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const data = useQueryFamilyMemberData(id);
  const diagnosisDisplay = data?.slice(0, DISPLAY_ELEMENT_COUNT);
  const calculateMore = data ? data.length - DISPLAY_ELEMENT_COUNT : 0;
  const properName = familyMemberName || capitalize(relationshipName ?? '');

  const renderDiagnosis = () => {
    if (!data || diagnosisDisplay.length === 0) {
      return null;
    }

    return diagnosisDisplay.map((elem) => {
      const explanation = Array.isArray(elem.values)
        ? elem.values.find((value) => value.key === 'Explanation')?.value
        : (elem.values as FamilyMemberDiagnosisModelValues)?.explanation;
      return (
        <View key={elem.id} style={{ flexDirection: 'column' }}>
          <Typography weight="semiBold" size="md">
            {Array.isArray(elem.values)
              ? elem.values.find((value) => value.key === 'Name').value
              : (elem.values as FamilyMemberDiagnosisModelValues).name}
          </Typography>
          {explanation ? <ListItemTypography>{explanation}</ListItemTypography> : null}
        </View>
      );
    });
  };

  return (
    <TouchableOpacity onPress={() => navigation.navigate('FamilyHistoryMember', { name: properName, id })}>
      <Card>
        <View style={{ gap: 12 }}>
          <Typography style={{ fontSize: 20 }} color="secondary">
            {properName}
          </Typography>
          {renderDiagnosis()}
          {calculateMore > 0 ? <ListItemTypography>{`${calculateMore} more`}</ListItemTypography> : null}
        </View>
      </Card>
    </TouchableOpacity>
  );
};
