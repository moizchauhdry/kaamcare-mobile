import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { BottomSheet } from "react-native-btr";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";

interface AlarmBottomSheetProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setSelectedTimes: (times: string[]) => void;
  maxAlarms: number;
}

const AlarmBottomSheet: React.FC<AlarmBottomSheetProps> = ({
  visible,
  setVisible,
  setSelectedTimes,
  maxAlarms,
}) => {
  const [alarms, setAlarms] = useState<string[]>([]);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showTimePicker = () => {
    if (alarms.length >= maxAlarms) {
      Alert.alert("Limit reached", `You can only set ${maxAlarms} alarms.`);
      return;
    }
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    // Format the selected time
    const formattedTime = formatTime(date);
    setAlarms((prev) => [...prev, formattedTime]);
    hideTimePicker();
  };

  // Helper function to format the time as e.g. "7:30 am"
  const formatTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutesFormatted} ${ampm}`;
  };

  return (
    <>
      <BottomSheet
        visible={visible}
        onBackButtonPress={() => setVisible(false)}
        onBackdropPress={() => setVisible(false)}
      >
        <View style={styles.sheetContainer}>
          <Text style={styles.heading}>Set Times</Text>

          <View style={styles.alarmContainer}>
            {alarms.map((alarm, index) => (
              <TouchableOpacity
                key={index}
                style={styles.alarmBox}
                onPress={() => {
                }}
              >
                <Text style={styles.alarmText}>{alarm}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {alarms.length < maxAlarms && (
            <TouchableOpacity style={styles.addTimeButton} onPress={showTimePicker}>
              <Ionicons name="time" size={20} color="#007AFF" />
              <Text style={styles.addTimeText}>Add Time</Text>
            </TouchableOpacity>
          )}

          {alarms.length >= maxAlarms && (
            <Text style={styles.limitText}>
              You have reached the maximum of {maxAlarms} alarms.
            </Text>
          )}

          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => {
              setSelectedTimes(alarms);
              setVisible(false);
            }}
          >
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={hideTimePicker}
      />
    </>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  alarmContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
  },
  alarmBox: {
    borderWidth: 1,
    borderColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  alarmText: {
    color: "#007AFF",
    fontSize: 16,
  },
  addTimeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 10,
    marginBottom: 15,
  },
  addTimeText: {
    color: "#007AFF",
    fontSize: 16,
    marginLeft: 5,
  },
  doneButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  doneText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  limitText: {
    color: "red",
    marginBottom: 15,
    textAlign: "center",
  },
});

export default AlarmBottomSheet;
