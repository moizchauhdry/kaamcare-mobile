import { SvgXml } from 'react-native-svg';
import { Modal, Pressable, TouchableOpacity, View, Platform } from 'react-native';
import { useState } from 'react';
import type { DateTimePickerEvent, IOSNativeProps, AndroidNativeProps } from '@react-native-community/datetimepicker';
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

import type { TextInputProps } from '../TextInput/TextInput';
import { TextInput } from '../TextInput/TextInput';
import { formatDate } from '../../../../utils/date/date';
import calendar from '../../../../assets/icons/calendar.svg';
import { theme } from '../../../../config/Theme';
import { Typography } from '../../Typography/Typography';

type AndroidModeType = 'date' | 'time';

export type DateTimePickerInputProps = TextInputProps & {
  forbidFuture?: boolean;
  mode?: 'date' | 'datetime';
  onChange?: (date?: Date) => void;
};

export type DateTimePickerProps = (IOSNativeProps | AndroidNativeProps) & {
  value: Date;
  onDateChange: (date?: Date) => void;
  inputProps?: DateTimePickerInputProps;
  error?: boolean;
};

export const DateTimePicker = ({ error, value, onDateChange, inputProps }: DateTimePickerProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const { forbidFuture, mode, onChange, ...textInputProps } = inputProps || {};
  const isAndroid = Platform.OS === 'android';

  const handleDateTimePickerToggle = (date?: Date, properMode?: AndroidModeType) => {
    if (mode === 'datetime' && properMode === 'date') {
      handleOpenPicker('time', date);
    }
  };

  const handleOpenPicker = (properMode?: AndroidModeType, properValue: Date = new Date()) => {
    if (isAndroid) {
      DateTimePickerAndroid.open({
        value: properValue,
        onChange: (e, date) => handleDateChange(e, date, onDateChange, properMode),
        mode: properMode ?? 'date',
        maximumDate: forbidFuture ? new Date() : undefined,
      });
    }

    setShowPicker(true);
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    date?: Date,
    cb?: (date?: Date) => void,
    properMode?: AndroidModeType,
  ) => {
    if (event.type === 'set') {
      cb?.(date);
      onChange?.(date);
      if (Platform.OS === 'android') {
        DateTimePickerAndroid.dismiss(properMode);
        handleDateTimePickerToggle(date, properMode);
      }
    } else {
      if (Platform.OS === 'android') {
        DateTimePickerAndroid.dismiss(properMode);
      }

      setShowPicker(false);
    }
  };

  const renderDateTimePicker = () => (
    <RNDateTimePicker
      onChange={(e: DateTimePickerEvent, date?: Date) => handleDateChange(e, date, onDateChange)}
      mode={mode ?? 'date'}
      display="spinner"
      value={value ?? new Date()}
      maximumDate={forbidFuture ? new Date() : undefined}
    />
  );

  const renderIOSPicker = () => (
    <Modal transparent animationType="slide">
      <View style={{ width: '100%', flex: 1, position: 'absolute', bottom: 0, paddingVertical: 16 }}>
        <View
          style={{
            alignItems: 'flex-end',
            backgroundColor: theme.colors.gray,
            paddingVertical: 12,
            paddingHorizontal: 10,
            shadowOffset: { width: 0, height: -0.5 },
            shadowColor: '#000',
          }}
        >
          <TouchableOpacity onPress={() => setShowPicker(false)}>
            <Typography color="secondary" weight="semiBold">
              Done
            </Typography>
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: 16,
            flex: 1,
            backgroundColor: theme.colors.white,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {renderDateTimePicker()}
        </View>
      </View>
    </Modal>
  );

  const renderPickerDependsOnOS = () => {
    if (Platform.OS === 'ios') {
      return renderIOSPicker();
    }

    return null;
  };

  return (
    <>
      <Pressable onPress={() => handleOpenPicker('date', value)}>
        <TextInput
          showSoftInputOnFocus={false}
          placeholder="MM.DD.YYYY"
          {...textInputProps}
          value={value ? formatDate(value, mode) : ''}
          editable={false}
          onPressIn={() => handleOpenPicker('date', value)}
          rightElement={<SvgXml xml={calendar} />}
          isFocused={showPicker}
          error={error}
        />
      </Pressable>

      {showPicker ? renderPickerDependsOnOS() : null}
    </>
  );
};
