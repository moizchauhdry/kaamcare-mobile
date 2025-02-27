import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Searchbar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import type { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';

const medications = [
    { name: "Atorvastatin", description: "A drug used to treat cholesterol" },
    { name: "Amoxicillin", description: "An antibiotic used to treat bacterial infections" },
    { name: "Lisinopril", description: "A drug used to treat high blood pressure" },
];

const AddMedicationScreen = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();

    const filteredMedications = medications.filter((med) =>
        med.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const handleEditMedication = () => {
        navigation.navigate('EditMedication');
    }
    return (
        <View style={styles.container}>
            <Searchbar
                placeholder="Search your medication"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchbar}
                icon="magnify"
                iconColor="#0072EF"
                placeholderTextColor="#8F8D8D"
            />
            <FlatList
                data={filteredMedications}
                style={{ marginTop: 20 }}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.medicationItem} onPress={handleEditMedication}>
                        <View>
                            <Text style={styles.medicationName}>{item.name}</Text>
                            <Text style={styles.medicationDescription}>{item.description}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#0072EF" />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    searchbar: {
        backgroundColor: "#EEF6FF",
        borderRadius: 10,
    },
    medicationItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#EEF6FF",
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
        marginTop: 5
    },
    medicationName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    medicationDescription: {
        fontSize: 14,
        color: "#555",
    },
});

export default AddMedicationScreen;
