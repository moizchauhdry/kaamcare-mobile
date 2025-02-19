import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const MedicationReminder: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Up comings</Text>

      <View style={styles.timeline}>
        <View style={styles.timelineLine} />
        <View style={[styles.timelineDot, { backgroundColor: 'green' }]} />
        <Text style={styles.time}>8:30 pm</Text>
        <View style={[styles.timelineDot, { backgroundColor: 'orange', top:150 }]} />
      </View>

      <View style={styles.medicationCard}>
        <View style={styles.pillImageContainer}>
          <Image source={require('../../../../assets/images/pills.png')} style={styles.pillImage} />
        </View>

        <View style={styles.medicationDetails}>
          <Text style={styles.medicationName}>Azithromycin 500mg Tablets</Text>
          <View style={styles.detailsRow}>
            <Text style={styles.pillText}>1 pill</Text>
            <Text style={styles.mealText}>After Meal</Text>
          </View>
          <Text style={styles.refillText}>Refill needed</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.daysLeft}>15 days left</Text>
            <Text style={styles.date}>02-12-2025</Text>
          </View>
        </View>
      </View>
      {/* <TouchableOpacity style={styles.addButton}>
        <FontAwesome name="plus-circle" size={20} color="white" />
        <Text style={styles.addButtonText}>Add medications</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  medicationCard: {
    flexDirection: 'row',
    backgroundColor: '#EAF8E8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 20
  },
  pillImageContainer: {
    backgroundColor: '#F8DADA',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  pillImage: {
    width: 50,
    height: 50,
  },
  medicationDetails: {
    flex: 1,
  },
  medicationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A3C70',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
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
});

export default MedicationReminder;
