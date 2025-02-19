import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BottomSheet } from "react-native-btr";

interface DatePickerBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (startDate: string, endDate: string) => void;
}

const DatePickerBottomSheet: React.FC<DatePickerBottomSheetProps> = ({
  visible,
  onClose,
  onSubmit,
}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB");
  };

  return (
    <BottomSheet visible={visible} onBackButtonPress={onClose} onBackdropPress={onClose}>
      <View style={styles.bottomSheet}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Start date</Text>
            <TouchableOpacity 
              style={styles.dateInput} 
              onPress={() => setShowStartPicker(true)}
            >
              <Text style={styles.dateText}>{formatDate(startDate)}</Text>
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(_, selectedDate) => {
                  setShowStartPicker(false);
                  if (selectedDate) setStartDate(selectedDate);
                }}
              />
            )}
          </View>

          <View style={styles.divider} />

          <View style={styles.column}>
            <Text style={styles.label}>End date</Text>
            <TouchableOpacity 
              style={styles.dateInput} 
              onPress={() => setShowEndPicker(true)}
            >
              <Text style={styles.dateText}>{formatDate(endDate)}</Text>
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(_, selectedDate) => {
                  setShowEndPicker(false);
                  if (selectedDate) setEndDate(selectedDate);
                }}
              />
            )}
          </View>
        </View>

        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => {
            onSubmit(formatDate(startDate), formatDate(endDate));
            onClose();
          }}
        >
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f0f5ff",
    width: 120,
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  divider: {
    width: 1,
    height: 80,
    backgroundColor: "#A8D0FB",
    marginHorizontal: 10,
  },
  doneButton: {
    marginTop: 20,
    backgroundColor: "#1E6FE3",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    width:'100%'
  },
  doneText: {
    alignSelf:'center',
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DatePickerBottomSheet;
