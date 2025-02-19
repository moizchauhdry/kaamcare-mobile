import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, Dimensions } from "react-native";
import { BottomSheet } from "react-native-btr";
import SvgShape1 from 'assets/icons/shape15.svg';
import SvgShape2 from 'assets/icons/shape1.svg';
import SvgShape3 from 'assets/icons/shape2.svg';
import SvgShape4 from 'assets/icons/shape3.svg';
import SvgShape5 from 'assets/icons/shape4.svg';
import SvgShape6 from 'assets/icons/shape5.svg';
import SvgShape7 from 'assets/icons/shape6.svg';
import SvgShape8 from 'assets/icons/shape7.svg';
import SvgShape9 from 'assets/icons/shape8.svg';
import SvgShape10 from 'assets/icons/shape9.svg';
import SvgShape11 from 'assets/icons/shape10.svg';
import SvgShape12 from 'assets/icons/shape11.svg';
import SvgShape13 from 'assets/icons/shape12.svg';
import SvgShape14 from 'assets/icons/shape13.svg';
import SvgShape15 from 'assets/icons/shape14.svg';
import { SvgXml } from 'react-native-svg';

const COLORS = [
  "#FFFFFF", "#EAEAEA", "#F9F1D2", "#FBE192",
  "#F4AF7D", "#F27667", "#F3C1C6", "#76B785",
  "#B6E1F1", "#77A7F6", "#B39DDB"
];

const SHAPES = [
  { name: "Vector1", component: <SvgXml xml={SvgShape1} width={40} height={40} /> },
  { name: "Vector2", component:<SvgXml xml={SvgShape2} width={40} height={40} /> },
  { name: "Vector3", component: <SvgXml xml={SvgShape3} width={40} height={40} /> },
  { name: "Vector4", component:<SvgXml xml={SvgShape4} width={40} height={40} /> },
  { name: "Vector5", component: <SvgXml xml={SvgShape5} width={40} height={40} /> },
  { name: "Vector6", component:<SvgXml xml={SvgShape6} width={40} height={40} /> },
  { name: "Vector7", component: <SvgXml xml={SvgShape7} width={40} height={40} /> },
  { name: "Vector8", component:<SvgXml xml={SvgShape8} width={40} height={40} /> },
  { name: "Vector9", component: <SvgXml xml={SvgShape9} width={40} height={40} /> },
  { name: "Vector10", component:<SvgXml xml={SvgShape10} width={40} height={40} /> },
  { name: "Vector11", component: <SvgXml xml={SvgShape11} width={40} height={40} /> },
  { name: "Vector12", component:<SvgXml xml={SvgShape12} width={40} height={40} /> },
  { name: "Vector13", component: <SvgXml xml={SvgShape13} width={40} height={40} /> },
  { name: "Vector14", component:<SvgXml xml={SvgShape14} width={40} height={40} /> },
  { name: "Vector15", component: <SvgXml xml={SvgShape15} width={40} height={40} /> },
];

const { width } = Dimensions.get("window");

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
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({ x: width * activeTab, animated: false });
      }, 100);
    }
  }, [visible]);

  const handleTabPress = (index: number) => {
    setActiveTab(index);
    scrollRef.current?.scrollTo({ x: width * index, animated: true });
  };

  return (
    <BottomSheet
      visible={visible}
      onBackButtonPress={() => setVisible(false)}
      onBackdropPress={() => setVisible(false)}
    >
      <View style={styles.sheetContent}>
        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() => handleTabPress(0)} style={styles.tab}>
            <Text style={[styles.tabText, activeTab === 0 && styles.activeTabText]}>Color</Text>
            {activeTab === 0 && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleTabPress(1)} style={styles.tab}>
            <Text style={[styles.tabText, activeTab === 1 && styles.activeTabText]}>Shape</Text>
            {activeTab === 1 && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const page = Math.round(e.nativeEvent.contentOffset.x / width);
            setActiveTab(page);
          }}
        >
          <View style={[styles.pageContainer, { width }]}>
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
          </View>

          <View style={[styles.pageContainer, { width }]}>
            <FlatList
              key={"shapeList"}
              data={SHAPES}
              showsVerticalScrollIndicator={false}
              numColumns={5}
              keyExtractor={(item) => item.name}
              contentContainerStyle={styles.grid}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.shapeOption,
                    selectedShape === item.name && styles.selectedShape
                  ]}
                  onPress={() => setSelectedShape(item.name)}
                >
                  {item.component}
                </TouchableOpacity>
              )}
            />
          </View>
        </ScrollView>

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
    maxHeight: 400,
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
  pageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft:-25
  },
  grid: {
    alignItems: "center",
    justifyContent: "center",
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
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    margin: 5,
  },
  selectedShape: {
    backgroundColor: "#1E88E5",
    borderColor: "#1E88E5",
  },
  doneButton: {
    backgroundColor: "#1E88E5",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
  },
  doneText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default ColorShapeSelector;
