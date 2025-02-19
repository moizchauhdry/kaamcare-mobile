import React, { useState, useEffect } from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { theme } from "config/Theme"; // Adjust based on your project structure

interface DayItem {
  day: any;
  date: string;
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
    daysArray.push({
      day: dayName,
      date: i < 10 ? `0${i}` : `${i}`,
      hasDot: i === 4 || i === 6, 
    });
  }
  return daysArray;
};

const HorizontalDatePicker = () => {
    const [selectedDate, setSelectedDate] = useState<string>('');

    useEffect(() => {
      const today = new Date().getDate();
      const todayStr = today < 10 ? `0${today}` : `${today}`;
      setSelectedDate(todayStr || "01"); 
    }, []);
    
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={generateDays()}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.dayContainer,
              selectedDate === item.date && styles.selectedDay,
            ]}
            onPress={() => setSelectedDate(item.date)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDate === item.date && styles.selectedText,
              ]}
            >
              {item.day}
            </Text>
            <Text
              style={[
                styles.dateText,
                selectedDate === item.date && styles.selectedText,
              ]}
            >
              {item.date}
            </Text>
            {item.hasDot && <View style={styles.dot} />}
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
    height: 100,
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
});

export default HorizontalDatePicker;
