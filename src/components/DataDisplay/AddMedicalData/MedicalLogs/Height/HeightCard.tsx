import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from 'react-native-screens/native-stack';

import { Card } from '../../../../UI/Card/Card';
import { Typography } from '../../../../UI/Typography/Typography';
import { formatDate, getDateFromSeparatedModel } from '../../../../../utils/date/date';
import type { AddMedicalDataNavigationParamsList } from '../../../../Navigation/AddMedicalDataNavigation';
import type { HeightLog } from '../../../../../model/api/medicalLogs/Height';
import { useUnitsData } from '../../../../../context/UnitsContext';

type HeightCardProps = HeightLog & {
  isNewest?: boolean;
  days?: number;
};

export const HeightCard = ({
  id,
  date,
  currentFeet,
  currentInch,
  currentCentimeters,
  isNewest,
  days,
}: HeightCardProps) => {
  const { length } = useUnitsData();
  const navigation = useNavigation<NativeStackNavigationProp<AddMedicalDataNavigationParamsList>>();

  return (
    <Pressable onPress={() => navigation.navigate('HeightForm', { id, edit: true, isNewest, days })}>
      <Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography style={{ fontSize: 22 }} weight="bolder" color="secondary">
            {length === 'FeetInch' ? `${currentFeet}'${currentInch}''` : `${currentCentimeters} cm`}
          </Typography>
          <Typography color="gray" size="sm">
            {formatDate(getDateFromSeparatedModel(date), 'datetime')}
          </Typography>
        </View>
      </Card>
    </Pressable>
  );
};
