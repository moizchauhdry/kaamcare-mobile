import { TouchableOpacity, View } from 'react-native';
import { useFieldArray } from 'react-hook-form';
import { SvgXml } from 'react-native-svg';

import close from 'assets/icons/delete.svg';

import { theme } from '../../../../../config/Theme';
import { AdditionButton } from '../../../../UI/Button/AdditionButton';
import { PickerSelectControlled } from '../../../../UI/Inputs/PickerSelect/PickerSelectControlled';
import { insulinTypeValues } from '../../../../../constants/forms/medicalLogs/bloodSugar';
import { NumberInputControlled } from '../../../../UI/Inputs/NumberInput/NumberInputControlled';
import { Typography } from '../../../../UI/Typography/Typography';

export const InsulinList = () => {
  const { fields, append, remove } = useFieldArray({
    name: 'insulin', // unique name for your Field Array
  });

  return (
    <View
      style={{
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.lightBlue,
        borderTopWidth: 1,
        borderTopColor: theme.colors.lightBlue,
      }}
    >
      <AdditionButton onPress={() => append({ type: '', dose: '' })}>Add insulin</AdditionButton>
      <View style={{ gap: 16 }}>
        {fields.map((field, index) => (
          <View style={{ gap: 8 }} key={field.id}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <View>
                <Typography weight="semiBold">Insulin</Typography>
              </View>
              <View>
                <TouchableOpacity onPress={() => remove(index)}>
                  <SvgXml xml={close} color={theme.colors.danger} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', gap: 16 }}>
              <View style={{ flex: 1 }}>
                <PickerSelectControlled name={`insulin.${index}.type`} items={insulinTypeValues} label="Insulin type" />
              </View>
              <View style={{ flex: 1 }}>
                <NumberInputControlled
                  name={`insulin.${index}.dose`}
                  label="Dose"
                  inputProps={{ rightElement: 'u', type: 'int', maxLength: 3 }}
                />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
