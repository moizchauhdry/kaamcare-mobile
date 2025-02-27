import React, { useState } from "react";
import {
  View, Text, FlatList, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheet } from "react-native-btr";

const medicationRoutes = [
  "Oral", "Intravenous", "Injection", "Intramuscular",
  "Topical", "Sublingual", "Buccal", "Rectal", "Transdermal"
];

interface MedicationRouteBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (route: string) => void;
}

const MedicationRouteBottomSheet: React.FC<MedicationRouteBottomSheetProps> = ({ visible, onClose, onSelect }) => {
  const [search, setSearch] = useState("");

  const filteredRoutes = medicationRoutes.filter(item =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <BottomSheet visible={visible} onBackButtonPress={onClose} onBackdropPress={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.bottomSheet}
      >
        <Text style={styles.header}>Select Route</Text>

        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />

        <FlatList
          data={filteredRoutes}
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

export default MedicationRouteBottomSheet;
