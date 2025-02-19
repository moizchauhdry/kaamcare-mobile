import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import MedicationReminder from 'components/DataDisplay/PillTrackerData/MedicationData/MedicationReminder';

export const CalendarScreen = () => {
    const [selectedDate, setSelectedDate] = useState<string>('');

    const handleDayPress = (day: DateData) => {
        setSelectedDate(day.dateString);
    };


    return (
        <View style={{ flex: 1,backgroundColor: '#FFFFFF' }}>
            <Calendar
                current={'2025-11-17'}
                markedDates={{
                    '2025-11-12': { selected: true, selectedColor: 'blue' },
                    '2025-11-17': { selected: true, selectedColor: 'green' },
                    '2025-11-27': { selected: true, selectedColor: 'orange' },
                    // ...selectedDate && { [selectedDate]: { selected: true, marked: true, selectedColor: 'grey' } }
                }}
                onDayPress={(day: any) => setSelectedDate(day.dateString)}
                theme={{
                    todayTextColor: '#673AB7',
                    arrowColor: '#007AFF',
                    selectedDayBackgroundColor: '#673AB7',
                }}
            />
            <MedicationReminder/>
        </View>
    );
}
