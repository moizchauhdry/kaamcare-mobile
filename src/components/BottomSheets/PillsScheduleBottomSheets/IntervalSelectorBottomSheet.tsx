import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from "react-native";
import { BottomSheet } from "react-native-btr";

interface IntervalSelectorProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedInterval: { value: number; unit: string };
  setSelectedInterval: React.Dispatch<React.SetStateAction<{ value: number; unit: string }>>;
}

const INTERVAL_UNITS = ["Hours", "Days", "Weeks"];

const IntervalSelector: React.FC<IntervalSelectorProps> = ({
  visible,
  setVisible,
  selectedInterval,
  setSelectedInterval,
}) => {
  const [tempValue, setTempValue] = useState<string>(selectedInterval.value.toString());
  const [tempUnit, setTempUnit] = useState<string>(selectedInterval.unit);

  return (
    <BottomSheet visible={visible} onBackButtonPress={() => setVisible(false)} onBackdropPress={() => setVisible(false)}>
      <View style={styles.sheetContent}>
        <Text style={styles.title}>Choose Interval:</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.everyText}>Every</Text>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={tempValue}
            onChangeText={setTempValue}
            placeholder="0.0"
          />

          <FlatList
            data={INTERVAL_UNITS}
            horizontal
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.unitScroll}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.unitOption, tempUnit === item && styles.selectedUnit]}
                onPress={() => setTempUnit(item)}
              >
                <Text style={[styles.unitText, tempUnit === item && styles.selectedUnitText]}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => {
            setSelectedInterval({ value: parseInt(tempValue) || 1, unit: tempUnit });
            setVisible(false);
          }}
        >
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetContent: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0D47A1",
    marginBottom: 15,
    alignSelf:'flex-start'
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  everyText: {
    fontSize: 18,
    marginRight: 10,
    fontWeight: "500",
  },
  input: {
    width: 60,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 18,
    marginRight: 10,
  },
  unitScroll: {
    flexDirection: "row",
    alignItems: "center",
  },
  unitOption: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    marginHorizontal: 5,
  },
  selectedUnit: {
    backgroundColor: "#1E88E5",
  },
  unitText: {
    fontSize: 16,
    color: "#555",
  },
  selectedUnitText: {
    color: "white",
    fontWeight: "bold",
  },
  doneButton: {
    backgroundColor: "#1E88E5",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
  },
  doneText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default IntervalSelector;
