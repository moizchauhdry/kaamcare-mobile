import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomSheet } from "react-native-btr";

interface RepeatSelectorProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    selectedRepeat: string;
    setSelectedRepeat: React.Dispatch<React.SetStateAction<string>>;
}

const repeatOptions: string[] = ["Yes", "No"];

const RepeatSelector: React.FC<RepeatSelectorProps> = ({
    visible,
    setVisible,
    selectedRepeat,
    setSelectedRepeat,
}) => {
    return (
        <BottomSheet
            visible={visible}
            onBackButtonPress={() => setVisible(false)}
            onBackdropPress={() => setVisible(false)}
        >
            <View style={styles.sheetContent}>
                <Text style={styles.title}>Repeat Prescription?</Text>
                {repeatOptions.map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={[
                            styles.option,
                            selectedRepeat === option && styles.selectedOption,
                        ]}
                        onPress={() => {
                            setSelectedRepeat(option);
                            setVisible(false);
                        }}
                    >
                        <Text style={styles.optionText}>{option}</Text>
                        {selectedRepeat === option && <Text style={styles.checkmark}>✔️</Text>}
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
        justifyContent: "center",
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
        fontWeight: "normal",
    },
    checkmark: {
        fontSize: 18,
        color: "white",
    },
});

export default RepeatSelector;
