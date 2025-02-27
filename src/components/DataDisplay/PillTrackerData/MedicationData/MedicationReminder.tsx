import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Medication } from 'model/api/medicalHistory/Medications';
import { useNavigation } from '@react-navigation/native';
import type { AddMedicalDataNavigationParamsList } from '../../../Navigation/AddMedicalDataNavigation';
import type { StackNavigationProp } from '@react-navigation/stack';
import { Typography } from 'components/UI/Typography/Typography';


type MedicationReminderProps = Medication & {
  [key: string]: string | string[] | null;
};

export const MedicationReminder = (props: MedicationReminderProps) => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { userMedicationId, medication_name, explanation, ...rest } = props;

  const handleAddMedication = () => {
    navigation.navigate('SelectMedication');
  }

  return (
    <View style={styles.container}>
      <View style={styles.medicationCard}>
        <View style={styles.pillImageContainer}>
          <Image source={require('../../../../assets/images/pills.png')} resizeMode='contain' style={styles.pillImage} />
        </View>

        <View style={styles.medicationDetails}>
          <View style={styles.row}>
            <Text style={styles.medicationName}>{medication_name}</Text>
            <Text style={styles.medicationName}> {rest.strength} {rest.unit}</Text>
            <Text style={styles.medicationName}> {rest.form}</Text>
          </View>

          <Text style={styles.time}>{rest.time}</Text>

          <View style={styles.detailsRow}>
            <Typography size='xs' weight='normal'>
              Take {rest.form} by {rest.route} {rest.frequency}
            </Typography>
          </View>

          <View style={styles.dateRow}>
            <Text style={styles.date}>
              Start from {rest.start_date} till {rest.end_date}
            </Text>
          </View>
        </View>
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeline: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginRight: 10
  },
  timelineLine: {
    width: 2,
    height: 300,
    backgroundColor: '#4285F4',
    position: 'absolute',
    left: 8,
    top: 10,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    left: 2.5,
  },
  time: {
    marginLeft: 30,
    fontSize: 16,
    color: '#555',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  medicationCard: {
    flexDirection: 'row',
    backgroundColor: '#EAF8E8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  pillImageContainer: {
    backgroundColor: '#F8DADA',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  pillImage: {
    width: 40,
    height: 65,
  },
  medicationDetails: {
  },
  medicationName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A3C70',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pillText: {
    fontSize: 14,
    color: '#333',
  },
  mealText: {
    fontSize: 14,
    color: '#666',
  },
  refillText: {
    fontSize: 12,
    color: 'red',
    fontWeight: 'bold',
  },
  daysLeft: {
    fontSize: 12,
    color: '#555',
  },
  date: {
    fontSize: 12,
    color: '#777',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 20
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});

