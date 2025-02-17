import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomSheet } from "react-native-btr";

interface FrequencySelectorProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    selectedFrequency: string;
    setSelectedFrequency: React.Dispatch<React.SetStateAction<string>>;
}

const frequencyOptions: string[] = ["1/day", "2/day", "3/day", "4/day", "5/day"];

const FrequencySelector: React.FC<FrequencySelectorProps> = ({
    visible,
    setVisible,
    selectedFrequency,
    setSelectedFrequency,
}) => {
    return (
        <BottomSheet
            visible={visible}
            onBackButtonPress={() => setVisible(false)}
            onBackdropPress={() => setVisible(false)}
        >
            <View style={styles.sheetContent}>
                <Text style={styles.title}>Select Frequency</Text>
                {frequencyOptions.map((freq) => (
                    <TouchableOpacity
                        key={freq}
                        style={[
                            styles.option,
                            selectedFrequency === freq && styles.selectedOption,
                        ]}
                        onPress={() => {
                            setSelectedFrequency(freq);
                            setVisible(false);
                        }}
                    >
                        <Text style={styles.optionText}>{freq}</Text>
                        {selectedFrequency === freq && <Text style={styles.checkmark}>✔️</Text>}
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

export default FrequencySelector;
