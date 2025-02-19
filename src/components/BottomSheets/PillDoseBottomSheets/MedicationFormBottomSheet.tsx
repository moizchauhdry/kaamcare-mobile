import React, { useState } from "react";
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheet } from "react-native-btr";

const medicationForms = [
  "Pill", "Capsule", "Injection", "Inhaler",
  "Powder", "Liquid / solutions", "Suspensions",
  "Creams", "Ointments"
];

interface MedicationFormBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (form: string) => void;
}

const MedicationFormBottomSheet: React.FC<MedicationFormBottomSheetProps> = ({ visible, onClose, onSelect }) => {
  const [search, setSearch] = useState("");

  const filteredForms = medicationForms.filter(item =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <BottomSheet visible={visible} onBackButtonPress={onClose} onBackdropPress={onClose}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.bottomSheet}
      >
        <Text style={styles.header}>Select Form</Text>
        
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />

        <FlatList
          data={filteredForms}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          style={{ maxHeight: 300 }} 
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                onSelect(item);
                onClose();
              }}
            >
              <Text style={styles.text}>{item}</Text>
              <Ionicons name="chevron-forward" size={20} color="#007AFF" />
            </TouchableOpacity>
          )}
        />
      </KeyboardAvoidingView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: "#fff",
    padding: 20,
    maxHeight: 600,
  },
  searchBar: {
    height: 50,
    borderColor: "#71CFFF",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 3,
    backgroundColor: "#EEF6FF",
    borderRadius: 10,
  },
  text: { fontSize: 18, color: "#333" },
});

export default MedicationFormBottomSheet;
