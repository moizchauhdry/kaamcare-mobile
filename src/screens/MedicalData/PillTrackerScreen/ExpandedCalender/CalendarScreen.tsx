import { MedicationReminder } from 'components/DataDisplay/PillTrackerData/MedicationData/MedicationReminder';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { useQueryMedications } from '../../../../hooks/query/medicalHistory/medication/useQueryMedications';
import { Calendar } from 'react-native-calendars';
import NoMedicationData from 'components/DataDisplay/PillTrackerData/MedicationData/NoMedicationData';
import { FontAwesome } from '@expo/vector-icons';

type CalendarScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'Medications'>;

export const CalendarScreen = ({ navigation }: CalendarScreenProps) => {
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const { data = [] } = useQueryMedications();
    const handleAddMedication = () => {
        navigation.navigate('SelectMedication');
    }
    const filteredMedications = data
        .filter((medication) => medication.start_date === selectedDate)
        .sort((a, b) => {
            const timeA = Array.isArray(a.times) ? a.times[0] : a.times;
            const timeB = Array.isArray(b.times) ? b.times[0] : b.times;

            if (!timeA || !timeB) {
                return 0;
            }

            const timeComparison = timeA.localeCompare(timeB);
            if (timeComparison !== 0) {
                return timeComparison;
            }

            return a.medication_name.localeCompare(b.medication_name);
        });



    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <Calendar
                current={selectedDate}
                onDayPress={(day: { dateString: string }) => setSelectedDate(day.dateString)}
                theme={{
                    todayTextColor: '#673AB7',
                    arrowColor: '#007AFF',
                    selectedDayBackgroundColor: '#673AB7',
                }}
            />

            {filteredMedications.length > 0 ? (
                <FlatList
                    data={filteredMedications}
                    keyExtractor={(item) => item.userMedicationId}
                    renderItem={({ item }) => <MedicationReminder {...item} />}
                />

            ) : (
                <NoMedicationData />
            )}
            <TouchableOpacity style={styles.addButton} onPress={handleAddMedication}>
                <FontAwesome name="plus-circle" size={20} color="white" />
                <Text style={styles.addButtonText}>Add medications</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    addButton: {
        flexDirection: 'row',
        backgroundColor: '#4285F4',
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal:10,
        marginBottom:10
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
    },
})