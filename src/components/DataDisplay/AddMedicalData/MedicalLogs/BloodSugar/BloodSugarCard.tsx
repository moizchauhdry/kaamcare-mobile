import { View } from 'react-native';

import type { BloodSugarLog } from 'model/api/medicalLogs/BloodSugar';
import { Typography } from 'components/UI/Typography/Typography';
import { formatDate, getDateFromSeparatedModel } from 'utils/date/date';

import { theme } from '../../../../../config/Theme';
import { calculateLogInsulin } from '../../../../../utils/medicalLogs/bloodSugar';
import { insulinColors, insulinLabel, mealTimeLabel } from '../../../../../constants/data/medicalLogs/bloodSugar';
import { useUnitsData } from '../../../../../context/UnitsContext';

type BloodSugarCardProps = BloodSugarLog & {
  bloodPressureStage?: string;
};

export const BloodSugarCard = ({
  milligramsPerMillilitresValue,
  millimolesPerLitreValue,
  date,
  carbs,
  bloodPressureStage,
  mealTime,
  mealType,
  insulin,
}: BloodSugarCardProps) => {
  const calculatedInsulin = calculateLogInsulin(insulin);
  const { sugar } = useUnitsData();

  return (
    <View style={{ gap: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            <Typography weight="bolder" color="secondary" style={{ fontSize: 22 }}>
              {sugar === 'mmolL' ? millimolesPerLitreValue : milligramsPerMillilitresValue}
            </Typography>
            <Typography weight="semiBold" size="sm">
              {sugar === 'mmolL' ? 'mmol/L' : 'mg/dL'}
            </Typography>
          </View>
          {carbs ? (
            <View style={{ flexDirection: 'row', gap: 4 }}>
              <Typography weight="semiBold" size="sm">
                {carbs}g
              </Typography>
              <Typography weight="semiBold" size="sm">
                (carbs)
              </Typography>
            </View>
          ) : null}
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
          {mealType || mealTime ? (
            <Typography color="gray" size="sm" style={{ textAlign: 'right' }}>
              {mealTimeLabel[mealTime ?? ''] || ''} {mealType || ''}
            </Typography>
          ) : null}
        </View>
      </View>
      {calculatedInsulin && calculatedInsulin.length > 0 ? (
        <View
          style={{
            borderTopWidth: 1,
            borderTopColor: theme.colors.lightBlue,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {calculatedInsulin.map((elem) => (
            <View key={elem.type} style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 8 }}>
              <View
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 8,
                  backgroundColor: insulinColors[elem.type.toLowerCase()],
                  marginRight: 4,
                }}
              />
              <Typography size="sm" weight="semiBold">
                {elem.dose} u{' '}
              </Typography>
              <Typography size="sm" weight="semiBold">
                {insulinLabel[elem.type]}
              </Typography>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};
