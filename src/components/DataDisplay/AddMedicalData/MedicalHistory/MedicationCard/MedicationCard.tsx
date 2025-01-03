import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { Typography } from '../../../../UI/Typography/Typography';
import { Card } from '../../../../UI/Card/Card';
import type { AddMedicalDataNavigationParamsList } from '../../../../Navigation/AddMedicalDataNavigation';
import type { Medication } from '../../../../../model/api/medicalHistory/Medications';

type MedicationCardProps = Medication & {
  [key: string]: string | null;
};

export const MedicationCard = (props: MedicationCardProps) => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { userMedicationId, medicationName, explanation, ...rest } = props;
  const objectKeys = Object.keys(rest).filter((elem) => Boolean(rest[elem]));

  const renderContent = () => {
    const order = ['form', 'dose', 'units', 'route', 'frequency'];
    const orderMap = new Map(order.map((item, index) => [item, index]));
    const sorted = [...objectKeys].sort(
      (a, b) => (orderMap.get(a) ?? objectKeys.length) - (orderMap.get(b) ?? objectKeys.length),
    );

    return sorted.map((elem, index) => {
      const trailingComa = index !== sorted.length - 1 ? ', ' : null;

      if (elem === 'dose' || elem === 'units') {
        if (elem === 'units' || !rest[elem] || !rest.units) {
          return null;
        }

        return (
          <Typography key={`${rest.dose}-${rest.units}`}>
            {rest.dose} {rest.units}
            {index !== sorted.length - 2 ? ', ' : null}
          </Typography>
        );
      }

      return (
        /* eslint-disable-next-line */
        <Typography key={`${elem}-${index}`}>
          {rest[elem]}
          {trailingComa}
        </Typography>
      );
    });
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MedicationForm', { id: userMedicationId, edit: true, name: medicationName })}
    >
      <Card>
        <View style={{ gap: 12 }}>
          <Typography style={{ fontSize: 20 }} color="secondary">
            {medicationName}
          </Typography>
          {objectKeys.length > 0 ? <Typography>{renderContent()}</Typography> : null}
          {explanation ? <Typography>{explanation}</Typography> : null}
        </View>
      </Card>
    </TouchableOpacity>
  );
};
