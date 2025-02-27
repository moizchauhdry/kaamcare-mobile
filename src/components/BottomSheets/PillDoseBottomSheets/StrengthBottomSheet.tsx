import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomSheet } from "react-native-btr";
import checkcircle from '../../../assets/icons/check-mark.svg';
import { SvgXml } from "react-native-svg";

interface StrengthSelectorProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    selectedStrength: number;
    setSelectedStrength: React.Dispatch<React.SetStateAction<number>>;
}

const StrengthSelector: React.FC<StrengthSelectorProps> = ({
    visible,
    setVisible,
    selectedStrength,
    setSelectedStrength,
}) => {
    const strengthLevels: number[] = [10, 50, 100, 500, 1000];

    return (
        <BottomSheet
            visible={visible}
            onBackButtonPress={() => setVisible(false)}
            onBackdropPress={() => setVisible(false)}
        >
            <View style={styles.sheetContent}>
                <Text style={styles.title}>Strength</Text>
                {strengthLevels.map((level) => (
                    <TouchableOpacity
                        key={level}
                        style={[
                            styles.option,
                            selectedStrength === level && styles.selectedOption,
                        ]}
                        onPress={() => {
                            setSelectedStrength(level);
                            setVisible(false);
                        }}
                    >
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text style={styles.optionText}>{level}</Text>
                        </View>
                        {selectedStrength === level && <SvgXml xml={checkcircle} width={24} height={24} />}
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
        alignSelf: 'flex-start',
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#1E88E5",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginVertical: 7,
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
        marginLeft: "auto",
    },
});

export default StrengthSelector;
