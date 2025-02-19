import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { BottomSheet } from "react-native-btr";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";

interface AlarmBottomSheetProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setSelectedTime: (time: string) => void;
}

const AlarmBottomSheet: React.FC<AlarmBottomSheetProps> = ({ visible, setVisible, setSelectedTime }) => {
  const [alarms, setAlarms] = useState(["1:00 am", "1:00 am", "1:00 am"]);
  const [selectedTune, setSelectedTune] = useState("Peace");
  const [volume, setVolume] = useState(0.5);

  const addAlarm = () => setAlarms([...alarms, "1:00 am"]);

  return (
    <BottomSheet visible={visible} onBackButtonPress={() => setVisible(false)} onBackdropPress={() => setVisible(false)}>
      <View style={styles.sheetContainer}>
        <Text style={styles.heading}>Set alarm</Text>
        <View style={styles.alarmContainer}>
          {alarms.map((alarm, index) => (
            <TouchableOpacity key={index} style={styles.alarmBox} onPress={() => setSelectedTime(alarm)}>
              <Text style={styles.alarmText}>{alarm}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={addAlarm}>
            <Ionicons name="images" size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.heading}>Set tune</Text>
        <View style={styles.tuneContainer}>
          <TextInput
            style={styles.tuneInput}
            value={selectedTune}
            onChangeText={setSelectedTune}
            placeholder="Select tune"
          />
          <Ionicons name="images" size={20} color="black" style={styles.musicIcon} />
        </View>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={setVolume}
          minimumTrackTintColor="#007AFF"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#007AFF"
        />

        <TouchableOpacity style={styles.doneButton} onPress={() => setVisible(false)}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
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
    alignItems: "center",
    flexWrap: "wrap",
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
  addButton: {
    borderWidth: 1,
    borderColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
  },
  tuneContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  tuneInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  musicIcon: {
    marginLeft: 10,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  doneButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
  doneText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AlarmBottomSheet;
