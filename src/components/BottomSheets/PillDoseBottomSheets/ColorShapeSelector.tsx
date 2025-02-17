import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { BottomSheet } from "react-native-btr";

const COLORS = [
  "#FFFFFF", "#EAEAEA", "#F9F1D2", "#FBE192",
  "#F4AF7D", "#F27667", "#F3C1C6", "#76B785",
  "#B6E1F1", "#77A7F6", "#B39DDB"
];

const SHAPES = ["Circle", "Square", "Triangle"];

interface ColorShapeSelectorProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
  selectedShape: string;
  setSelectedShape: React.Dispatch<React.SetStateAction<string>>;
}

const ColorShapeSelector: React.FC<ColorShapeSelectorProps> = ({
  visible,
  setVisible,
  selectedColor,
  setSelectedColor,
  selectedShape,
  setSelectedShape,
}) => {
  const [activeTab, setActiveTab] = useState<"Color" | "Shape">("Color");

  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
    >
      <View style={styles.sheetContent}>
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => setActiveTab("Color")} style={styles.tab}>
            <Text style={[styles.tabText, activeTab === "Color" && styles.activeTabText]}>Color</Text>
            {activeTab === "Color" && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActiveTab("Shape")} style={styles.tab}>
            <Text style={[styles.tabText, activeTab === "Shape" && styles.activeTabText]}>Shape</Text>
            {activeTab === "Shape" && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
        </View>

        {activeTab === "Color" ? (
          <FlatList
            key={"colorList"} 
            data={COLORS}
            numColumns={4}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.grid}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.colorOption,
                  { backgroundColor: item },
                  selectedColor === item && styles.selectedColor
                ]}
                onPress={() => setSelectedColor(item)}
              />
            )}
          />
        ) : (
          <FlatList
            key={"shapeList"} 
            data={SHAPES}
            numColumns={3}
            keyExtractor={(item) => item}
            contentContainerStyle={styles.grid}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.shapeOption,
                  selectedShape === item && styles.selectedShape
                ]}
                onPress={() => setSelectedShape(item)}
              >
                <Text style={[styles.shapeText, selectedShape === item && styles.selectedShapeText]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}

        <TouchableOpacity style={styles.doneButton} onPress={() => setVisible(false)}>
          <Text style={styles.doneText}>Done</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetContent: {
    backgroundColor: "white",
    padding: 20,
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginBottom: 15,
  },
  tab: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666",
  },
  activeTabText: {
    color: "black",
  },
  activeTabIndicator: {
    width: "100%",
    height: 2,
    backgroundColor: "black",
    marginTop: 5,
  },
  grid: {
    alignItems: "center",
    marginBottom: 15,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedColor: {
    borderColor: "black",
  },
  shapeOption: {
    width: 80,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    margin: 10,
  },
  selectedShape: {
    backgroundColor: "#1E88E5",
    borderColor: "#1E88E5",
  },
  shapeText: {
    fontSize: 16,
    color: "#666",
  },
  selectedShapeText: {
    color: "white",
    fontWeight: "bold",
  },
  doneButton: {
    backgroundColor: "#1E88E5",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
    width:'100%',
  },
  doneText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf:'center'
  },
});

export default ColorShapeSelector;
