import { View } from 'react-native';

import { MoreLayout } from '../../../components/Layouts/MoreLayout/MoreLayout';
import { SwitchSelectorComponent } from '../../../components/UI/Inputs/SwitchSelector/SwitchSelector';
import { Typography } from '../../../components/UI/Typography/Typography';
import { useUnitsData } from '../../../context/UnitsContext';

const unitOfLength = [
  {
    value: 'Centimeter',
    label: 'cm',
  },
  {
    value: 'FeetInch',
    label: 'Ft/Inches',
  },
];

const unitOfMass = [
  {
    value: 'Kilogram',
    label: 'kg',
  },
  {
    value: 'Pound',
    label: 'lbs',
  },
];

const unitOfPressure = [
  {
    value: 'mmHg',
    label: 'mmHg',
  },
  {
    value: 'kPa',
    label: 'kPa',
  },
];

const unitOfSugar = [
  {
    value: 'mmolL',
    label: 'mmol/L',
  },
  {
    value: 'mgdL',
    label: 'mg/dL',
  },
];

export const UnitsScreen = () => {
  const { pressure, length, mass, onUnitChange, sugar } = useUnitsData();

  return (
    <MoreLayout title="Units">
      <View style={{ gap: 16 }}>
        <View>
          <Typography>Unit of length</Typography>
          <SwitchSelectorComponent
            value={length}
            options={unitOfLength}
            onPress={(value) => onUnitChange('length', value as string)}
          />
        </View>
        <View>
          <Typography>Unit of mass</Typography>
          <SwitchSelectorComponent
            value={mass}
            options={unitOfMass}
            onPress={(value) => onUnitChange('mass', value as string)}
          />
        </View>
        <View>
          <Typography>Unit of pressure</Typography>
          <SwitchSelectorComponent
            value={pressure}
            options={unitOfPressure}
            onPress={(value) => onUnitChange('pressure', value as string)}
          />
        </View>
        <View>
          <Typography>Unit of blood sugar</Typography>
          <SwitchSelectorComponent
            value={sugar}
            options={unitOfSugar}
            onPress={(value) => onUnitChange('sugar', value as string)}
          />
        </View>
      </View>
    </MoreLayout>
  );
};
