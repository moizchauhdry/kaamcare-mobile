import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import type { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';

const NoMedicationData: React.FC = () => {
    const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();

    const handleAddMedication = () => {
        navigation.navigate('SelectMedication');
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../../../../assets/images/PillsBackground.png")} style={styles.background} resizeMode="contain">
                <Text style={styles.noScheduleText}>
                    You have <Text style={styles.redText}>no{" "}</Text>
                    <Text style={styles.redText}>schedule</Text> today.
                </Text>
            </ImageBackground>

            <TouchableOpacity style={styles.addButton} onPress={handleAddMedication}>
                <FontAwesome name="plus-circle" size={20} color="white" />
                <Text style={styles.addButtonText}>Add medications</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    background: {
        width: 348,
        height: 348,
        alignItems: "center",
        justifyContent: "center",
    },
    noScheduleText: {
        fontSize: 27,
        fontWeight: "bold",
        color: "#4A4A4A",
    },
    redText: {
        color: "#E57373",
    },
    addButton: {
        flexDirection: "row",
        backgroundColor: "#3578F6",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 30,
        width: "100%",
        justifyContent: "center",
    },
    addButtonText: {
        color: "#fff",
        fontSize: 16,
        marginLeft: 10,
        fontWeight: "600",
    },
});

export default NoMedicationData;
