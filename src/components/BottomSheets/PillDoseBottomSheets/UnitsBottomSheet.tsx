import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomSheet } from "react-native-btr";
import { SvgXml } from "react-native-svg";
import checkcircle from '../../../assets/icons/check-mark.svg';

interface UnitSelectorProps {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    selectedUnit: string;
    setSelectedUnit: React.Dispatch<React.SetStateAction<string>>;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({
    visible,
    setVisible,
    selectedUnit,
    setSelectedUnit,
}) => {
    const unitlevels: string[] = ['gram', 'milli gram', 'micro gram', 'Liter', 'Drop', 'Puff'];

    return (
        <BottomSheet
            visible={visible}
            onBackButtonPress={() => setVisible(false)}
            onBackdropPress={() => setVisible(false)}
        >
            <View style={styles.sheetContent}>
                <Text style={styles.title}>Unit</Text>
                {unitlevels.map((level) => (
                    <TouchableOpacity
                        key={level}
                        style={[
                            styles.option,
                            selectedUnit === level && styles.selectedOption,
                        ]}
                        onPress={() => {
                            setSelectedUnit(level);
                            setVisible(false);
                        }}
                    >
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text style={styles.optionText}>{level}</Text>
                        </View>
                        {selectedUnit === level && <SvgXml xml={checkcircle} width={24} height={24} />}
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
        alignSelf: 'flex-start'
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#1E88E5",
        paddingVertical: 8,
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
    },
});

export default UnitSelector;
