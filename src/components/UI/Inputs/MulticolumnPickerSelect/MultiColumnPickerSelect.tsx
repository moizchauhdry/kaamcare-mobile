import { Modal, Platform, Pressable, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useState } from 'react';
import type { PickerProps } from '@react-native-picker/picker';
import { Picker } from '@react-native-picker/picker';

import chevronDown from 'assets/icons/chevron-down.svg';

import type { TextInputProps } from '../TextInput/TextInput';
import { TextInput } from '../TextInput/TextInput';
import { theme } from '../../../../config/Theme';
import { Typography } from '../../Typography/Typography';
import { styles } from './MultiColumnPickerSelect.styled';
import { splitStringBySuffix } from '../../../../utils/string/string';

type Item = {
  value: string;
  label: string;
};

type MultiColumnPickerProps = PickerProps & {
  data: Item[];
  singleData?: Item[];
  initialValue?: string;
};

export type MultiColumnPickerSelectProps = {
  pickerProps: MultiColumnPickerProps[];
  textInputProps?: TextInputProps;
  joinSeparator?: string;
  valueSplittingSuffix?: string | string[];
  initialValue?: string;
};

export const MultiColumnPickerSelect = ({
  initialValue,
  pickerProps,
  textInputProps,
  joinSeparator = ' ',
  valueSplittingSuffix = ' ',
}: MultiColumnPickerSelectProps) => {
  const properInitialValue = splitStringBySuffix(initialValue, valueSplittingSuffix);
  const [showPicker, setShowPicker] = useState(false);
  const [values, setValues] = useState<(string | number | undefined)[]>(
    pickerProps.map((elem, index) =>
      properInitialValue ? properInitialValue[index] : (elem.initialValue ?? 'undefined'),
    ),
  );

  const togglePicker = () => setShowPicker((prevState) => !prevState);

  const handleValueChange = (pickerValue: string | number, index: number) => {
    setValues((prevState) => {
      const newArr = [...prevState];
      newArr[index] = pickerValue;

      return newArr;
    });
  };

  const handleDonePress = () => {
    handleJoinedValueChange(values);

    togglePicker();
  };

  const handleJoinedValueChange = (columnValues: (string | number | undefined)[]) => {
    const newJoinedValue = getJoinedValue(columnValues);

    textInputProps?.onChangeText?.(newJoinedValue);
  };

  const getJoinedValue = (columnValues: (string | number | undefined)[]) =>
    columnValues.some((elem) => elem === 'undefined') ? '' : values.join(joinSeparator);

  const getLabelFromValue = (columnValues: (string | number | undefined)[]) => {
    const columnValuesCp = [...columnValues];

    return columnValuesCp
      .map((elem, index) => pickerProps[index]?.data.find((dataElem) => dataElem.value === elem)?.label)
      .join(joinSeparator);
  };

  const getValueFromString = (stringValue: string) => {
    const labeledValue = splitStringBySuffix(stringValue, valueSplittingSuffix);

    return getLabelFromValue(labeledValue ?? values);
  };

  const renderPicker = () =>
    pickerProps.map((dataArray, index) => {
      const { data, singleData = [], ...rest } = dataArray;

      return (
        <Picker
          style={[styles.picker, dataArray?.style]}
          /* eslint-disable-next-line */
          key={`picker-${index}`}
          selectedValue={values[index]}
          onValueChange={(pickerValue) => handleValueChange(pickerValue, index)}
          {...rest}
        >
          <Picker.Item value="undefined" label="Select" />
          {index === 1 && values[0] === '1' && singleData?.length > 0
            ? singleData.map((elem) => <Picker.Item key={elem.value} value={elem.value} label={elem.label} />)
            : data.length > 0
              ? data.map((elem) => <Picker.Item key={elem.value} value={elem.value} label={elem.label} />)
              : null}
        </Picker>
      );
    });

  const renderModalPicker = () => (
    <Modal transparent animationType="slide">
      <View
        style={{
          width: '100%',
          flex: 1,
          position: 'absolute',
          bottom: 0,
          paddingVertical: Platform.select({ ios: 16, android: 0 }),
        }}
      >
        <View
          style={{
            alignItems: 'flex-end',
            backgroundColor: theme.colors.gray,
            paddingVertical: 12,
            paddingHorizontal: 10,
            shadowOffset: { width: 0, height: -0.5 },
            shadowColor: '#000',
            borderTopWidth: 1,
            borderTopColor: theme.colors.gray100,
          }}
        >
          <TouchableOpacity onPress={handleDonePress}>
            <Typography color="secondary" weight="semiBold">
              Done
            </Typography>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, backgroundColor: theme.colors.white, flexDirection: 'row' }}>{renderPicker()}</View>
      </View>
    </Modal>
  );

  return (
    <>
      <Pressable onPress={togglePicker}>
        <TextInput
          {...textInputProps}
          onChangeText={undefined}
          value={textInputProps?.value ? getValueFromString(textInputProps.value) : ''}
          editable={false}
          onPressIn={togglePicker}
          rightElement={<SvgXml xml={chevronDown} />}
          isFocused={showPicker}
        />
      </Pressable>

      {showPicker ? renderModalPicker() : null}
    </>
  );
};
