import { View } from 'react-native';

import { Typography } from '../../../../../UI/Typography/Typography';
import type { BloodPressureLog } from '../../../../../../model/api/medicalLogs/BloodPressure';
import { formatDate, getDateFromSeparatedModel } from '../../../../../../utils/date/date';
import { useUnitsData } from '../../../../../../context/UnitsContext';

type BloodPressureCardProps = BloodPressureLog & {
  bloodPressureStage?: string;
};

export const BloodPressureCard = ({
  date,
  millimetersOfMercurySystolic,
  millimetersOfMercuryDiastolic,
  kilopascalsDiastolic,
  kilopascalsSystolic,
  pulse,
  side,
  position,
  bloodPressureStage,
}: BloodPressureCardProps) => {
  const { pressure } = useUnitsData();
  const isMercury = pressure === 'mmHg';

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ gap: 8 }}>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          <Typography weight="bolder" color="secondary" style={{ fontSize: 22 }}>
            {isMercury ? millimetersOfMercurySystolic : kilopascalsSystolic.toFixed(2)} /{' '}
            {isMercury ? millimetersOfMercuryDiastolic : kilopascalsDiastolic.toFixed(2)}
          </Typography>
          <Typography weight="semiBold" size="sm">
            {isMercury ? 'mmHg' : 'kPa'}
          </Typography>
        </View>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          <Typography weight="bolder" color="secondary" style={{ fontSize: 22 }}>
            {pulse}
          </Typography>
          <Typography weight="semiBold" size="sm">
            bpm
          </Typography>
        </View>
      </View>
      <View style={{ gap: 4 }}>
        {bloodPressureStage ? (
          <Typography size="sm" weight="semiBold" style={{ textAlign: 'right' }}>
            {bloodPressureStage}
          </Typography>
        ) : null}
        {date ? (
          <Typography color="gray" size="sm" style={{ textAlign: 'right' }}>
            {formatDate(getDateFromSeparatedModel(date), 'datetime')}
          </Typography>
        ) : null}
        {position || side ? (
          <Typography color="gray" size="sm" style={{ textAlign: 'right' }}>
            {position || ''}
            {position && side ? ', ' : null}
            {side || ''}
          </Typography>
        ) : null}
      </View>
    </View>
  );
};
