import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomSheet } from "react-native-btr";
import checkcircle from '../../../assets/icons/check-mark.svg';
import { SvgXml } from "react-native-svg";

interface MedicineForProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    selectedMedicineType: string;
    setSelectedMedicineType: React.Dispatch<React.SetStateAction<string>>;
}

const medicineTypes: string[] = [
    "Pain killer",
    "Cancer",
    "COVID-19",
    "Accidents",
    "Diabetes",
    "Pre-diabetes",
    "Insulin resistance",
    "Heart failure",
    "Other",
];

const MedicineFor: React.FC<MedicineForProps> = ({
    visible,
    setVisible,
    selectedMedicineType,
    setSelectedMedicineType,
}) => {
    return (
        <BottomSheet
            visible={visible}
            onBackButtonPress={() => setVisible(false)}
            onBackdropPress={() => setVisible(false)}
        >
            <View style={styles.sheetContent}>
                <Text style={styles.title}>Select Medicine Type</Text>
                {medicineTypes.map((type) => (
                    <TouchableOpacity
                        key={type}
                        style={[
                            styles.option,
                            selectedMedicineType === type && styles.selectedOption,
                        ]}
                        onPress={() => {
                            setSelectedMedicineType(type);
                            setVisible(false);
                        }}
                    >
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text style={styles.optionText}>{type}</Text>
                        </View>
                        {selectedMedicineType === type && <SvgXml xml={checkcircle} width={24} height={24} />}
                    </TouchableOpacity>
                ))}
            </View>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    sheetContent: {
        backgroundColor: "white",
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        alignSelf: "flex-start",
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#1E88E5",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginVertical: 5,
    },
    selectedOption: {
        borderWidth: 2,
        borderColor: "#FFF",
    },
    optionText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold",
    },
    checkmark: {
        fontSize: 18,
        color: "white",
    },
});

export default MedicineFor;
