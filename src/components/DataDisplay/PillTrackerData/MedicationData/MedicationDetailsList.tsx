import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "config/Theme";
import { Typography } from "components/UI/Typography/Typography";

interface MedicationDetailsProps {
  label: string;
  value?: string;
  onPress?: () => void;
  customRightComponent?: React.ReactNode;
}

const MedicationDetails: React.FC<MedicationDetailsProps> = ({ label, value, onPress, customRightComponent }) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress} activeOpacity={0.7}>
      <Typography size='md' weight='regular'>{label}</Typography>
      <View style={styles.rightSection}>
        {customRightComponent ? customRightComponent : <Typography size='xs'>{value}</Typography>}
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
    color: theme.colors.black,
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
