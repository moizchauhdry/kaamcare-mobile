import { Animated, StyleSheet, Switch, Text, View, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ScreenModalLayout } from 'components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { Card } from 'components/UI/Card/Card';
import { Typography } from 'components/UI/Typography/Typography';
import { theme } from 'config/Theme';
import { useState } from 'react';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SvgXml } from 'react-native-svg';
import pdfIcon from 'assets/icons/pdf-icon.svg';
import arrowIcon from 'assets/icons/arrow-right.svg';
type ExportShareDataScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'ExportShareDataScreen'>;

export const ExportShareDataScreen = (props: ExportShareDataScreenProps) => {
  const navigation = useNavigation();
  const [keyboardHeight] = useState(new Animated.Value(0));

  const [heartRate, setHeartRate] = useState(true);
  const [bloodOxygen, setBloodOxygen] = useState(true);
  const [bloodPressure, setBloodPressure] = useState(true);
  const [temperature, setTemperature] = useState(true);
  const [pdf, setPdf] = useState(true);
  const [csv, setCSV] = useState(true);
  const [excel, setExcel] = useState(true);

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const Selector = ({
    label,
    state,
    setState,
  }: {
    label: string;
    state: boolean;
    setState: (value: boolean) => void;
  }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Switch
          value={state}
          onValueChange={(value) => setState(value)}
          thumbColor={state ? theme.colors.primary : theme.colors.primary100}
          trackColor={{ true: theme.colors.primary100, false: theme.colors.backgroundDark }}
        />
      </View>
    );
  };

  const CustomButton = ({
    title,
    onPress,
    variant = 'default',
  }: {
    title: string;
    onPress: () => void;
    variant?: 'default' | 'outline';
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.customButton, variant === 'outline' ? styles.outlineButton : styles.defaultButton]}
      >
        <Text style={[styles.buttonText, variant === 'outline' ? styles.outlineButtonText : styles.defaultButtonText]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScreenModalLayout title="" isScrollable>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18 }}>
          <Typography style={styles.title}>Export your personal health report</Typography>
          <SvgXml xml={pdfIcon} />
        </View>
        <Card>
          <Typography style={styles.label}>Category</Typography>
          <Selector label="Heart rate" state={heartRate} setState={setHeartRate} />
          <Selector label="Blood oxygen" state={bloodOxygen} setState={setBloodOxygen} />
          <Selector label="Blood pressure" state={bloodPressure} setState={setBloodPressure} />
          <Selector label="Temperature" state={temperature} setState={setTemperature} />
        </Card>
        <Card style={{ marginVertical: 10 }}>
          <Typography style={styles.label}>File format</Typography>
          <Selector label="PDF" state={pdf} setState={setPdf} />
          <Selector label="CSV" state={csv} setState={setCSV} />
          <Selector label="Excel" state={excel} setState={setExcel} />
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <Typography style={styles.label}>Period</Typography>
          <View style={styles.periodContainer}>
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.dateContainer}>
              <Typography style={styles.dateLabel}>From</Typography>
              <View style={styles.dateLabelContainer}>
                <Typography style={styles.dateText}>{formatDate(startDate)}</Typography>
              </View>
            </TouchableOpacity>
            <SvgXml style={{ marginTop: 25 }} xml={arrowIcon} color={theme.colors.primary} />
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.dateContainer}>
              <Typography style={styles.dateLabel}>To</Typography>
              <View style={styles.dateLabelContainer}>
                <Typography style={styles.dateText}>{formatDate(endDate)}</Typography>
              </View>
            </TouchableOpacity>
          </View>
          {showStartDatePicker && (
            <DateTimePicker value={startDate} mode="date" display="default" onChange={handleStartDateChange} />
          )}
          {showEndDatePicker && (
            <DateTimePicker value={endDate} mode="date" display="default" onChange={handleEndDateChange} />
          )}
        </Card>
      </ScreenModalLayout>
      <Animated.View style={[styles.buttonWrapper, { bottom: keyboardHeight }]}>
        <View style={styles.buttonContainer}>
          <CustomButton title="View" onPress={() => navigation.goBack()} />
          <CustomButton title="Export" onPress={() => navigation.goBack()} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginLeft: 10,
    lineHeight: 28,
    color: theme.colors.textPrimary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 28,
    color: theme.colors.textPrimary,
  },
  periodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  dateContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 14,
    color: theme.colors.textPrimary,
  },
  dateText: {
    fontSize: 16,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  arrow: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  customButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultButton: {
    backgroundColor: theme.colors.primary,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  defaultButtonText: {
    color: theme.colors.white,
  },
  outlineButtonText: {
    color: theme.colors.primary,
  },
  dateLabelContainer: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    borderColor: theme.colors.primary200,
    marginTop: 8,
  },
});
