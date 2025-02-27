import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import type { Medication } from '../../../../../model/api/medicalHistory/Medications';
import { Typography } from 'components/UI/Typography/Typography';

export const MedicationData = ({ medication_name, strength, unit, frequency, times, form, route }: Medication) => {
  return (
    <View style={styles.medItemContainer}>
      <Text style={styles.medText}>
        {medication_name}
        {strength && unit ? (
          <Text style={styles.medText}>
            {' '}
            {strength} {unit}{' '}
          </Text>
        ) : null}
      </Text>
      <View>
        <Typography size='xs' weight='normal'>
          Take {form} by {route} {frequency}
        </Typography>
      </View>
      {times?.length ? (
        <View style={styles.timesContainer}>
          {times.map((time, index) => (
            <View key={index} style={styles.timePill}>
              <Text style={styles.timePillText}>{time}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  medItemContainer: {
    borderRadius: 8,
    padding: 4,
    marginBottom: 8,
  },
  medText: {
    color: '#07406B',
    fontSize: 15,
    fontWeight:'500'
  },
  frequencyText: {
    color: '#07406B',
    fontSize: 14,
    marginBottom: 4,
  },
  timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  timePill: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderColor: '#5AC1FF',
    borderWidth: 1
  },
  timePillText: {
    color: '#585C61',
    fontSize: 10,
    fontWeight: '500',
  },
});
