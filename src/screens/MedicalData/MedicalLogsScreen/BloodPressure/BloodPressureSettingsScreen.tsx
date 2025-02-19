import { Animated, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { ScreenModalLayout } from 'components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { Card } from 'components/UI/Card/Card';
import { Typography } from 'components/UI/Typography/Typography';
import { theme } from 'config/Theme';
import { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import LeftHandIcon from '../../../../assets/icons//left-hand-filled.svg';
import SittingIcon from '../../../../assets/icons/sitting-filled.svg';
import chevronRight from '../../../../assets/icons/chevron-right.svg';
import { Button } from 'components/UI/Button/Button';
import { useNavigation } from '@react-navigation/native';

type BloodPressureSettingsScreenProps = NativeStackScreenProps<
  AddMedicalDataNavigationParamsList,
  'BloodPressureSettingsScreen'
>;

export const BloodPressureSettingsScreen = (props: BloodPressureSettingsScreenProps) => {
  const navigation = useNavigation();
  const [keyboardHeight] = useState(new Animated.Value(0));

  const [dateTime, setDateTime] = useState(true);
  const [heartRate, setHeartRate] = useState(true);
  const [spo2, setSpo2] = useState(true);
  const [measurementPosition, setMeasurementPosition] = useState(true);
  const [measurementSide, setMeasurementSide] = useState(true);
  const [explanation, setExplanation] = useState(true);

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
  return (
    <View style={{ flex: 1 }}>
      <ScreenModalLayout title="" isScrollable>
        <Typography style={styles.title}>Default</Typography>
        <Card>
          <Selector label="Date & time" state={dateTime} setState={setDateTime} />
          <Selector label="Heart rate" state={heartRate} setState={setHeartRate} />
          <Selector label="Spo2" state={spo2} setState={setSpo2} />
          <Selector label="Measurement position" state={measurementPosition} setState={setMeasurementPosition} />
          {measurementPosition && (
            <Card>
              <View style={styles.container}>
                <View style={styles.textContainer}>
                  <Typography style={styles.titleText}>Measured arm</Typography>
                  <Typography style={styles.subText}>Left Hand</Typography>
                </View>
                <View style={styles.iconContainer}>
                  <SvgXml xml={LeftHandIcon} width={30} height={30} color={theme.colors.primary} />
                </View>
              </View>
            </Card>
          )}
          <Selector label="Measurement Side" state={measurementSide} setState={setMeasurementSide} />
          {measurementSide && (
            <Card>
              <View style={styles.container}>
                <View style={styles.textContainer}>
                  <Typography style={styles.titleText}>Body position</Typography>
                  <Typography style={styles.subText}>Sitting</Typography>
                </View>
                <View style={styles.iconContainer}>
                  <SvgXml xml={SittingIcon} width={30} height={30} color={theme.colors.primary} />
                </View>
              </View>
            </Card>
          )}
          <Selector label="Explanation" state={explanation} setState={setExplanation} />
        </Card>
        <TouchableOpacity onPress={() => (navigation as any).navigate('ConnectDeviceScreen')}>
          <Card style={{ marginVertical: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography style={styles.title}>Connect your device</Typography>
            <SvgXml xml={chevronRight} />
          </Card>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => (navigation as any).navigate('ExportShareDataScreen')}>
          <Card style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography style={styles.title}>Export / share data</Typography>
            <SvgXml xml={chevronRight} />
          </Card>
        </TouchableOpacity>
        <Card style={{ marginVertical: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography style={styles.title}>Blood pressure classification</Typography>
        </Card>
        <Card style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography style={styles.title}>Delete data all specific range</Typography>
        </Card>
        <View style={{ marginBottom: 60 }} />
      </ScreenModalLayout>
      <Animated.View style={[styles.buttonWrapper, { bottom: keyboardHeight }]}>
        <Button variant="default" onPress={() => navigation.goBack()}>
          Save
        </Button>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    // marginBottom: 5,
    marginLeft: 10,
    lineHeight: 28,
    color: theme.colors.textPrimary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    // borderBottomWidth: 1,
    // borderBottomColor: theme.colors.backgroundDark,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 28,
    color: theme.colors.textPrimary,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'column',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    // lineHeight: 32,
    color: theme.colors.textPrimary,
  },
  subText: {
    fontSize: 13,
    color: theme.colors.textGray,
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 16, // Space between icons or labels
  },
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
});
