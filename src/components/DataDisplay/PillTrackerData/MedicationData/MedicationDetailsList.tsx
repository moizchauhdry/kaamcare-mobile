import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface MedicationDetailsProps {
  label: string;
  value?: string;
  onPress?: () => void;
  customRightComponent?: React.ReactNode;
}

const MedicationDetails: React.FC<MedicationDetailsProps> = ({ label, value, onPress, customRightComponent }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress} activeOpacity={0.7}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.rightSection}>
        {customRightComponent ? customRightComponent : <Text style={styles.value}>{value}</Text>}
        <Ionicons name="chevron-forward" size={20} color="#0072EF" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: "#D1F0FF",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color:'black'
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    fontSize: 16,
    color: "#555",
    marginRight: 5,
  },
});

export default MedicationDetails;
