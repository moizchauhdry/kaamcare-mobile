import React, { useState, useEffect } from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { theme } from "config/Theme"; // Adjust based on your project structure
import { useQueryMedications } from "hooks/query/medicalHistory/medication/useQueryMedications";
import { MedicationReminder } from "components/DataDisplay/PillTrackerData/MedicationData/MedicationReminder";

interface DayItem {
  day: string;
  date: string;
  fullDate: string;
  hasDot: boolean;
}

const generateDays = (): DayItem[] => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const numDays = new Date(year, month + 1, 0).getDate();

  const daysArray: DayItem[] = [];
  for (let i = 1; i <= numDays; i++) {
    const dateObj = new Date(year, month, i);
    const dayName = daysOfWeek[dateObj.getDay()];
    const dateStr = i < 10 ? `0${i}` : `${i}`;
    const fullDate = `${year}-${month + 1 < 10 ? `0${month + 1}` : month + 1}-${dateStr}`;

    daysArray.push({
      day: dayName,
      date: dateStr,
      fullDate,
      hasDot: i === 4 || i === 6,
    });
  }
  return daysArray;
};

const HorizontalDatePicker = ({ selectedDate, setSelectedDate }) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={generateDays()}
        keyExtractor={(item) => item.fullDate}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.dayContainer, selectedDate === item.fullDate && styles.selectedDay]}
            onPress={() => setSelectedDate(item.fullDate)}
          >
            <Text style={[styles.dayText, selectedDate === item.fullDate && styles.selectedText]}>
              {item.day}
            </Text>
            <Text style={[styles.dateText, selectedDate === item.fullDate && styles.selectedText]}>
              {item.date}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 1,
    height: 150,
  },
  dayContainer: {
    width: 45,
    height: 95,
    borderRadius: 10,
    backgroundColor: "#F8F9FA",
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  selectedDay: {
    backgroundColor: theme.colors.primary200,
  },
  dayText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 16,
    color: "#000",
  },
  selectedText: {
    color: "#FFFFFF",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "red",
    marginTop: 4,
  },
  medicationItem: {
    backgroundColor: "#E8EAF6",
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  medicationText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  medicationTime: {
    fontSize: 14,
    color: "#555",
  },
});

export default HorizontalDatePicker;
