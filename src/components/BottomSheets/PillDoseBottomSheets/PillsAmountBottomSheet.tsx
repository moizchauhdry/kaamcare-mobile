import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform
} from "react-native";
import { BottomSheet } from "react-native-btr";

interface PillsAmountBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (quantity: string) => void;
}

const PillsAmountBottomSheet: React.FC<PillsAmountBottomSheetProps> = ({ visible, onClose, onSubmit }) => {
  const [quantity, setQuantity] = useState("");

  return (
    <BottomSheet visible={visible} onBackButtonPress={onClose} onBackdropPress={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.bottomSheet}
      >
        <Text style={styles.header}>Enter quantity manually</Text>

        <TextInput
          style={styles.input}
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="default"
          placeholder="Enter quantity"
          placeholderTextColor="#A0AEC0"
        />

        <TouchableOpacity style={styles.button} onPress={() => { onSubmit(quantity); onClose(); }}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
    alignSelf:'flex-start'
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#F0F5FF",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    textAlign: "center",
    color: "#A0AEC0",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2979FF",
    width: "80%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PillsAmountBottomSheet;
