import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

import { Typography } from '../../../../UI/Typography/Typography';
import type { AddMedicalDataNavigationParamsList } from '../../../../Navigation/AddMedicalDataNavigation';
import type { Medication } from '../../../../../model/api/medicalHistory/Medications';

type MedicationCardProps = Medication & {
  [key: string]: string | string[] | null;
};

export const MedicationCard = (props: MedicationCardProps) => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { userMedicationId, medication_name, explanation, ...rest } = props;

  const excludedKeys = ['color', 'shape', 'times'];
  const objectKeys = Object.keys(rest)
    .filter((key) => Boolean(rest[key]) && !excludedKeys.includes(key));

  let formattedTimes = '';

  if (rest.times) {
    const timesArray = Array.isArray(rest.times) ? rest.times : [rest.times];

    if (timesArray.length === 1) {
      formattedTimes = timesArray[0] ?? '';
    } else if (timesArray.length > 1) {
      formattedTimes = timesArray.slice(0, -1).join(', ') + ' and ' + timesArray[timesArray.length - 1];
    }
  }


  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('EditMedication', { id: userMedicationId, edit: true, name: medication_name })}
    >
      <View style={styles.medicationCard}>
        {/* <View style={[styles.pillImageContainer, { backgroundColor: rest.color || '#F8DADA' }]}>
          {rest.shape ? (
            <Text style={styles.shapeText}>{rest.shape}</Text>
          ) : (
            <Image source={require('../../../../../assets/images/pills.png')} style={styles.pillImage} />
          )}
        </View> */}
        <View style={styles.medicationDetails}>
          <View style={{ flexDirection: 'row' }}>
            <Typography size='sm' weight='regular'>{medication_name}</Typography>
            <Typography size='sm' weight='regular'> {rest.strength}</Typography>
            <Typography size='sm' weight='regular'> {rest.unit}</Typography>
            <Typography size='sm' weight='regular'> {rest.form}</Typography>
          </View>
          <View style={styles.detailsRow}>
            <Typography size="xs" weight="normal">
              Take via {rest.route} {rest.frequency} at {formattedTimes}
            </Typography>
          </View>
          {explanation && (
            <View style={styles.detailsRow}>
              <Typography size="xs" weight="normal">{explanation}</Typography>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  medicationCard: {
    flexDirection: 'row',
    backgroundColor: '#EAF8E8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  pillImageContainer: {
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillImage: {
    width: 55,
    height: 53,
  },
  shapeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
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
    marginVertical: 5,
  },
});
