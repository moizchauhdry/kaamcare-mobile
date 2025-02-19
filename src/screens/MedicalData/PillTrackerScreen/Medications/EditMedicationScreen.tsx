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
import MedicationFormBottomSheet from "components/BottomSheets/PillDoseBottomSheets/MedicationFormBottomSheet";
import MedicationRouteBottomSheet from "components/BottomSheets/PillDoseBottomSheets/MedicalRouteBottomSheet";
import PillsAmountBottomSheet from "components/BottomSheets/PillDoseBottomSheets/PillsAmountBottomSheet";
import DatePickerBottomSheet from "components/BottomSheets/PillsScheduleBottomSheets/DatePickerBottomSheet";
import AlarmBottomSheet from "components/BottomSheets/PillsScheduleBottomSheets/AlarmBottomSheet";

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
    const [selectedForm, setSelectedForm] = useState("Tablet");
    const [selectedFormVisible, setSelectedFormVisible] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState("Oral");
    const [selectedRouteVisible, setSelectedRouteVisible] = useState(false);
    const [amountSheetVisible, setAmountSheetVisible] = useState(false);
    const [amount, setAmount] = useState("10 / 20");
    const [isSheetVisible, setSheetVisible] = useState(false);
    const [dateRange, setDateRange] = useState("02-12-2025 - 02-12-2025");
    const [visible, setVisible] = useState(false);
    const [selectedTime, setSelectedTime] = useState("1:00 am");

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
                <MedicationDetails
                    label="Form"
                    value={selectedForm}
                    onPress={() => setSelectedFormVisible(true)}
                />
                <MedicationDetails
                    label="Color"
                    customRightComponent={<View style={[styles.colorCircle, { backgroundColor: selectedColor }]} />}
                    onPress={() => setColorShapeVisible(true)}
                />
                <MedicationDetails
                    label="For"
                    value={selectedMedicineType}
                    onPress={() => setMedicineForSheetVisible(true)}
                />

                <MedicationDetails
                    label="Pill Amount"
                    value={amount}
                    onPress={() => setAmountSheetVisible(true)}
                />
                <MedicationDetails label="Route" value={selectedRoute} onPress={() => setSelectedRouteVisible(true)} />
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
                    customRightComponent={<Text style={styles.alarmText}>{selectedTime}</Text>}
                    onPress={() => setVisible(true)}
                />
                <MedicationDetails
                    label="Date Range"
                    value={dateRange}
                    onPress={() => setSheetVisible(true)}
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

                {/* <MedicationDetails
                    label="Interval"
                    value={`Every ${selectedInterval.value} ${selectedInterval.unit}`}
                    onPress={() => setIntervalSheetVisible(true)}
                />
                <MedicationDetails label="Tapering Dose" value="Step Down" onPress={() => { }} />
                <MedicationDetails label="On a Recurring Cycle" value="21 days active" onPress={() => { }} /> */}
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
                setVisible={setUnitSheetVisible}
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
            <MedicationFormBottomSheet
                visible={selectedFormVisible}
                onClose={() => setSelectedFormVisible(false)}
                onSelect={(form) => setSelectedForm(form)}
            />
            <MedicationRouteBottomSheet
                visible={selectedRouteVisible}
                onClose={() => setSelectedRouteVisible(false)}
                onSelect={(form) => setSelectedRoute(form)}
            />
            <PillsAmountBottomSheet
                visible={amountSheetVisible}
                onClose={() => setAmountSheetVisible(false)}
                onSubmit={(selectedQuantity) => setAmount(selectedQuantity)}
            />
            <DatePickerBottomSheet
                visible={isSheetVisible}
                onClose={() => setSheetVisible(false)}
                onSubmit={(start, end) => setDateRange(`${start} - ${end}`)}
            />
            <AlarmBottomSheet
                visible={visible}
                setVisible={setVisible}
                setSelectedTime={setSelectedTime}
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
        fontSize: 23,
        fontWeight: "500",
        color: "#0072EF",
        marginVertical: 10,
    },
    card: {
        backgroundColor: "#F2FCFF",
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
