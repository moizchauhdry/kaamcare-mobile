import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from 'react-native-screens/native-stack';

import { Card } from '../../../../UI/Card/Card';
import { Typography } from '../../../../UI/Typography/Typography';
import type { WeightApiLog } from '../../../../../model/api/medicalLogs/Weight';
import { formatDate, getDateFromSeparatedModel } from '../../../../../utils/date/date';
import type { AddMedicalDataNavigationParamsList } from '../../../../Navigation/AddMedicalDataNavigation';
import { useUnitsData } from '../../../../../context/UnitsContext';

type WeightCardProps = WeightApiLog & {
  isNewest?: boolean;
  days?: number;
};

export const WeightCard = ({ id, date, currentKilograms, currentPounds, isNewest, days }: WeightCardProps) => {
  const { mass } = useUnitsData();
  const navigation = useNavigation<NativeStackNavigationProp<AddMedicalDataNavigationParamsList>>();

  return (
    <Pressable onPress={() => navigation.navigate('WeightForm', { id, edit: true, isNewest, days })}>
      <Card>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography style={{ fontSize: 22 }} weight="bolder" color="secondary">
            {mass === 'Pound' ? currentPounds : currentKilograms}{' '}
            <Typography size="sm" weight="semiBold" color="secondary">
              {mass === 'Pound' ? 'lbs' : 'kg'}
            </Typography>
          </Typography>
          <Typography color="gray" size="sm">
            {formatDate(getDateFromSeparatedModel(date), 'datetime')}
          </Typography>
        </View>
      </Card>
    </Pressable>
  );
};
