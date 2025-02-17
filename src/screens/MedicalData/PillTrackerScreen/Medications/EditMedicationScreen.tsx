import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import MedicationDetails from "components/DataDisplay/PillTrackerData/MedicationData/MedicationDetailsList";
import StrengthSelector from "components/BottomSheets/PillDoseBottomSheets/StrengthBottomSheet";
import UnitSelector from "components/BottomSheets/PillDoseBottomSheets/UnitsBottomSheet";
import MedicineFor from "components/BottomSheets/PillDoseBottomSheets/MedicineForBottomSheet";
import FrequencySelector from "components/BottomSheets/PillsScheduleBottomSheets/FrequencyBottomSheet";
import RepeatSelector from "components/BottomSheets/PillsScheduleBottomSheets/RepeatBottomSheet";
import IntervalSelector from "components/BottomSheets/PillsScheduleBottomSheets/IntervalSelectorBottomSheet";
import ColorShapeSelector from "components/BottomSheets/PillDoseBottomSheets/ColorShapeSelector";
import DaysSelector from "components/BottomSheets/PillDoseBottomSheets/DaysSelectorBottomSheet";

const EditMedicationScreen = () => {
    const [strengthSheetVisible, setStrengthSheetVisible] = useState(false);
    const [selectedStrength, setSelectedStrength] = useState<number>(500);
    const [unitSheetVisible, setUnitSheetVisible] = useState(false);
    const [selectedUnit, setSelectedUnit] = useState('mg');
    const [medicineForSheetVisible, setMedicineForSheetVisible] = useState<boolean>(false);
    const [selectedMedicineType, setSelectedMedicineType] = useState<string>("Pain killer");
    const [frequencySheetVisible, setFrequencySheetVisible] = useState<boolean>(false);
    const [selectedFrequency, setSelectedFrequency] = useState<string>("1/day");
    const [repeatSheetVisible, setRepeatSheetVisible] = useState<boolean>(false);
    const [selectedRepeat, setSelectedRepeat] = useState<string>("No");
    const [intervalSheetVisible, setIntervalSheetVisible] = useState<boolean>(false);
    const [selectedInterval, setSelectedInterval] = useState<{ value: number; unit: string }>({ value: 3, unit: "Days" });
    const [colorShapeVisible, setColorShapeVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState("#FFFFFF");
    const [selectedShape, setSelectedShape] = useState("Circle");
    const [selectedDaysVisible, setSelectedDaysVisible] = useState(false);
    const [selectedDays, setSelectedDays] = useState<string[]>(["Mon", "Thu"]);

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.sectionTitle}>Dose</Text>
            <View style={styles.card}>
                <MedicationDetails
                    label="Strength"
                    value={selectedStrength.toString()}
                    onPress={() => setStrengthSheetVisible(true)}
                />
                <MedicationDetails
                    label="Unit"
                    value={selectedUnit}
                    onPress={() => setUnitSheetVisible(true)}
                />
                <MedicationDetails label="Form" value="tablet" onPress={() => { }} />
                <MedicationDetails
                    label="Color"
                    customRightComponent={<View style={[styles.colorCircle, { backgroundColor: selectedColor }]} />}
                    onPress={() => setColorShapeVisible(true)} // Open Bottom Sheet
                />
                <MedicationDetails
                    label="For"
                    value={selectedMedicineType}
                    onPress={() => setMedicineForSheetVisible(true)}
                />

                <MedicationDetails label="Pill Amount" value="10/20" onPress={() => { }} />
                <MedicationDetails label="Route" value="oral" onPress={() => { }} />
            </View>

            <Text style={styles.sectionTitle}>Schedule</Text>
            <View style={styles.card}>
                <MedicationDetails
                    label="Frequency"
                    value={selectedFrequency}
                    onPress={() => setFrequencySheetVisible(true)}
                />
                <MedicationDetails
                    label="Set alarms"
                    customRightComponent={<Text style={styles.alarmText}>1:00 am</Text>}
                    onPress={() => { }}
                />
                <MedicationDetails
                    label="Start and end date:"
                    customRightComponent={<Text style={styles.alarmText}>2-12-2025</Text>}
                    onPress={() => { }}
                />
                <MedicationDetails
                    label="Specific days"
                    value={selectedDays.toString()}
                    onPress={() => setSelectedDaysVisible(true)} />
                <MedicationDetails
                    label="Repeat"
                    value={selectedRepeat}
                    onPress={() => setRepeatSheetVisible(true)}
                />

                <MedicationDetails
                    label="Interval"
                    value={`Every ${selectedInterval.value} ${selectedInterval.unit}`}
                    onPress={() => setIntervalSheetVisible(true)}
                />
                <MedicationDetails label="Tapering Dose" value="Step Down" onPress={() => { }} />
                <MedicationDetails label="On a Recurring Cycle" value="21 days active" onPress={() => { }} />
            </View>

            <TouchableOpacity style={styles.doneButton}>
                <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>

            <StrengthSelector
                visible={strengthSheetVisible}
                setVisible={setStrengthSheetVisible}
                selectedStrength={selectedStrength}
                setSelectedStrength={setSelectedStrength}
            />
            <UnitSelector
                visible={unitSheetVisible}
                setVisible={setStrengthSheetVisible}
                selectedUnit={selectedUnit}
                setSelectedUnit={setSelectedUnit}
            />
            <MedicineFor
                visible={medicineForSheetVisible}
                setVisible={setMedicineForSheetVisible}
                selectedMedicineType={selectedMedicineType}
                setSelectedMedicineType={setSelectedMedicineType}
            />
            <FrequencySelector
                visible={frequencySheetVisible}
                setVisible={setFrequencySheetVisible}
                selectedFrequency={selectedFrequency}
                setSelectedFrequency={setSelectedFrequency}
            />
            <RepeatSelector
                visible={repeatSheetVisible}
                setVisible={setRepeatSheetVisible}
                selectedRepeat={selectedRepeat}
                setSelectedRepeat={setSelectedRepeat}
            />
            <IntervalSelector
                visible={intervalSheetVisible}
                setVisible={setIntervalSheetVisible}
                selectedInterval={selectedInterval}
                setSelectedInterval={setSelectedInterval}
            />
            <ColorShapeSelector
                visible={colorShapeVisible}
                setVisible={setColorShapeVisible}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedShape={selectedShape}
                setSelectedShape={setSelectedShape}
            />
            <DaysSelector
                visible={selectedDaysVisible}
                setVisible={setSelectedDaysVisible}
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "400",
        color: "#0072EF",
        marginVertical: 10,
    },
    card: {
        backgroundColor: "#EEF6FF",
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    colorCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "gold",
        marginRight: 5,
    },
    alarmText: {
        fontSize: 16,
        color: "#555",
        marginRight: 5,
    },
    doneButton: {
        backgroundColor: "#0072EF",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 20,
    },
    doneText: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
    },
});

export default EditMedicationScreen;
