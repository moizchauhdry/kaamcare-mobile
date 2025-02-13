import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Switch, TouchableOpacity, Text } from 'react-native';
import { Card } from 'components/UI/Card/Card';
import { Typography } from 'components/UI/Typography/Typography';
import { theme } from 'config/Theme';

export const BloodPressureSettingsScreen = () => {
  // States for toggles
  const [dateTime, setDateTime] = useState(true);
  const [heartRate, setHeartRate] = useState(true);
  const [spo2, setSpo2] = useState(true);
  const [measurementPosition, setMeasurementPosition] = useState(true);
  const [measurementSide, setMeasurementSide] = useState(true);
  const [explanation, setExplanation] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Typography style={styles.title}>Default</Typography>

        {/* Date & Time Toggle */}
        <View style={styles.row}>
          <Text style={styles.label}>Date & time</Text>
          <Switch
            value={dateTime}
            onValueChange={(value) => setDateTime(value)}
            trackColor={{ true: theme.colors.primary, false: theme.colors.lightGray }}
          />
        </View>

        {/* Heart Rate Toggle */}
        <View style={styles.row}>
          <Text style={styles.label}>Heart rate</Text>
          <Switch
            value={heartRate}
            onValueChange={(value) => setHeartRate(value)}
            trackColor={{ true: theme.colors.primary, false: theme.colors.lightGray }}
          />
        </View>

        {/* SpO2 Toggle */}
        <View style={styles.row}>
          <Text style={styles.label}>Spo2</Text>
          <Switch
            value={spo2}
            onValueChange={(value) => setSpo2(value)}
            trackColor={{ true: theme.colors.primary, false: theme.colors.lightGray }}
          />
        </View>

        {/* Measurement Position */}
        <View style={styles.row}>
          <Text style={styles.label}>Measurement position</Text>
          <Switch
            value={measurementPosition}
            onValueChange={(value) => setMeasurementPosition(value)}
            trackColor={{ true: theme.colors.primary, false: theme.colors.lightGray }}
          />
        </View>
        <View style={styles.subRow}>
          <Text style={styles.subLabel}>Measured arm</Text>
          <Text style={styles.subValue}>Right hand</Text>
        </View>

        {/* Measurement Side */}
        <View style={styles.row}>
          <Text style={styles.label}>Measurement Side</Text>
          <Switch
            value={measurementSide}
            onValueChange={(value) => setMeasurementSide(value)}
            trackColor={{ true: theme.colors.primary, false: theme.colors.lightGray }}
          />
        </View>
        <View style={styles.subRow}>
          <Text style={styles.subLabel}>Body position</Text>
          <Text style={styles.subValue}>Sitting</Text>
        </View>

        {/* Explanation */}
        <View style={styles.row}>
          <Text style={styles.label}>Explanation</Text>
          <Switch
            value={explanation}
            onValueChange={(value) => setExplanation(value)}
            trackColor={{ true: theme.colors.primary, false: theme.colors.lightGray }}
          />
        </View>

        {/* Additional Options */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Connect your device</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Export / share data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Blood pressure classification</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Delete data all specific range</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: theme.colors.textPrimary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  label: {
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  subRow: {
    flexDirection: 'column',
    paddingVertical: 8,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  subLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  subValue: {
    fontSize: 14,
    color: theme.colors.textPrimary,
  },
  button: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
  },
  buttonText: {
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  saveButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
