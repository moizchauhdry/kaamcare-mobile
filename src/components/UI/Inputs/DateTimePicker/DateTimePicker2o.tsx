import type { AndroidNativeProps, DateTimePickerEvent, IOSNativeProps } from '@react-native-community/datetimepicker';
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { theme } from '../../../../config/Theme';
import { Typography } from '../../Typography/Typography';
import type { TextInputProps } from '../TextInput/TextInput';

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

export const DateTimePicker2o = ({ value, onDateChange, inputProps }: DateTimePickerProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const { forbidFuture, mode, onChange } = inputProps || {};
  const isAndroid = Platform.OS === 'android';

  const handleDateTimePickerToggle = (date?: Date, properMode?: AndroidModeType) => {
    if (mode === 'datetime' && properMode === 'date') {
      // handleOpenPicker('time', date);
    }
  };

  const handleOpenPicker = (properMode: AndroidModeType, properValue: Date = new Date()) => {
    if (isAndroid) {
      DateTimePickerAndroid.open({
        value: properValue,
        onChange: (e, date) => handleDateChange(e, date, onDateChange, properMode),
        mode: properMode,
        maximumDate: forbidFuture ? new Date() : undefined,
      });
    } else {
      setShowPicker(true);
    }
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

  const formatDateParts = (date: Date) => {
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' }); // Full month name
    const day = date.getDate().toString().padStart(2, '0');
    const time = date.toTimeString().slice(0, 5); // HH:MM format
    const isAM = date.getHours() < 12;

    return { year, month, day, time, isAM };
  };

  const { year, month, day, time, isAM } = formatDateParts(value ?? new Date());
  const toggleAMPM = (isAM: boolean) => {
    if (value) {
      let newDate = new Date(value);
      const hours = newDate.getHours();

      // Convert hours based on AM/PM selection
      if (isAM && hours >= 12) {
        newDate.setHours(hours - 12); // Convert to AM
      } else if (!isAM && hours < 12) {
        newDate.setHours(hours + 12); // Convert to PM
      }

      onDateChange(newDate); // Update parent component with the new date
      onChange?.(newDate);
    }
  };

  return (
    <>
      <View style={styles.dateContainer}>
        {/* Year */}
        <Pressable onPress={() => handleOpenPicker('date', value)}>
          <View style={styles.datePart}>
            <Text style={styles.datePartText}>{year}</Text>
          </View>
        </Pressable>

        {/* Separator */}
        <View style={styles.separator} />

        {/* Month */}
        <Pressable onPress={() => handleOpenPicker('date', value)}>
          <View style={styles.datePart}>
            <Text style={styles.datePartText}>{month}</Text>
          </View>
        </Pressable>

        {/* Separator */}
        <View style={styles.separator} />

        {/* Day */}
        <Pressable onPress={() => handleOpenPicker('date', value)}>
          <View style={styles.datePart}>
            <Text style={styles.datePartText}>{day}</Text>
          </View>
        </Pressable>

        {/* Separator */}
        <View style={styles.separator} />

        {/* Time */}
        <Pressable onPress={() => handleOpenPicker('time', value)}>
          <View style={styles.datePart}>
            <Text style={styles.datePartText}>{time}</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.timeContainer}>
        {/* AM */}
        <Pressable
          onPress={() => toggleAMPM(true)}
          style={[styles.timePart, { backgroundColor: isAM ? theme.colors.white : 'transparent' }]}
        >
          <Text style={styles.timePartText}>Am</Text>
        </Pressable>

        {/* PM */}
        <Pressable
          onPress={() => toggleAMPM(false)}
          style={[styles.timePart, { backgroundColor: !isAM ? theme.colors.white : 'transparent' }]}
        >
          <Text style={styles.timePartText}>Pm</Text>
        </Pressable>
      </View>
      {showPicker ? renderPickerDependsOnOS() : null}
    </>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.primary,
  },
  timeContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 14,
    borderRadius: 4,
    backgroundColor: '#C8E1FD',
    padding: 3,
  },
  timePart: { paddingVertical: 4, paddingHorizontal: 12, borderRadius: 4 },
  separator: {
    width: 1,
    height: '100%',
    backgroundColor: theme.colors.border,
    marginHorizontal: 5,
  },
  datePart: {
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  datePartText: {
    fontSize: 17,
    color: theme.colors.textPrimary,
  },
  timePartText: {
    color: theme.colors.textPrimary,
  },
});
