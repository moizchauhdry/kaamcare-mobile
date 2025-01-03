import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity, View } from 'react-native';

import type { AddMedicalDataNavigationParamsList } from '../../../../Navigation/AddMedicalDataNavigation';
import { Card } from '../../../../UI/Card/Card';
import { Typography } from '../../../../UI/Typography/Typography';
import { SeparatedDateTypography } from '../../../../UI/Typography/SeparatedDateTypography/SeparatedDateTypography';
import { ConditionalTypography } from '../../../../UI/Typography/ConditionalTypography/ConditionalTypography';
import type { Vaccine } from '../../../../../model/api/primaryPrevention/Immunization';
import {
  commonVaccinesData,
  dymamicVaccinesData,
  vaccineFacilityData,
} from '../../../../../constants/data/primaryPrevention/immunizations';
import { theme } from '../../../../../config/Theme';

type VaccineCardProps = Vaccine;

export const VaccineCard = (props: VaccineCardProps) => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { id, dose, lotNumber, brandName, vaccineFacility, vaccineName, diagnosisDate, illness } = props;
  const subName =
    [...commonVaccinesData, ...dymamicVaccinesData].find((elem) => elem.value === vaccineName)?.subLabel ?? illness;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('VaccineForm', { id, edit: true, name: vaccineName, subName: subName! })}
    >
      <Card>
        <View style={{ flexDirection: 'column', gap: 12 }}>
          <View style={{ gap: 8 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography style={{ fontSize: 20 }} weight="semiBold" color="secondary">
                {vaccineName}
              </Typography>
              <SeparatedDateTypography date={diagnosisDate} />
            </View>
            {dose || vaccineFacility ? (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {dose ? (
                  <Typography size="sm" weight="semiBold">
                    {dose} dose
                  </Typography>
                ) : null}
                <ConditionalTypography
                  typographyProps={{ size: 'sm', weight: 'normal', color: 'gray' }}
                  value={vaccineFacilityData.find((elem) => elem.value === vaccineFacility)?.label}
                />
              </View>
            ) : null}
          </View>
          {brandName || lotNumber ? (
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: theme.colors.lightBlue,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingTop: 8,
              }}
            >
              <View style={{ maxWidth: '50%' }}>
                <ConditionalTypography value={brandName} typographyProps={{ size: 'sm', numberOfLines: 3 }} />
              </View>

              {lotNumber ? (
                <View style={{ maxWidth: '50%' }}>
                  <Typography size="sm">{`#${lotNumber}`}</Typography>
                </View>
              ) : null}
            </View>
          ) : null}
        </View>
      </Card>
    </TouchableOpacity>
  );
};
