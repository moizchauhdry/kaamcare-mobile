/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable import/order */
import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../../config/Theme';
import { Typography } from '../../UI/Typography/Typography';

type MedicalHistoryContentProps = {
  title: string;
  onSelect?: (option: string) => void; // Optional prop
  children: React.ReactNode;
};

export const MedicalLogsMainLayout = ({ title, onSelect, children }: MedicalHistoryContentProps) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedType, seSelectedType] = useState(title);

  const handleSelect = (option: string) => {
    if (onSelect) {
      onSelect(option); // Call only if defined
    }
    seSelectedType(option);
    setDropdownVisible(false);
  };

  return (
    <ScrollView
      style={{ paddingHorizontal: 16, backgroundColor: theme.colors.background }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={styles.titleContainer}>
          <Typography size="lg" style={{ fontSize: 22, color: theme.colors.primary }} weight="bolder">
            {selectedType} ▼
          </Typography>
        </TouchableOpacity>

        {dropdownVisible && (
          <View style={styles.dropdown}>
            {['Blood Pressure', 'Heart Rate', 'Blood Sugar'].map((option) => (
              <TouchableOpacity key={option} style={styles.option} onPress={() => handleSelect(option)}>
                <Typography color={selectedType === option ? 'primary' : 'gray'} size="sm" weight="bolder">
                  {option}
                </Typography>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {children}
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    // marginTop: 20,
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
    zIndex: 50,
  },
  titleContainer: {
    padding: 10,
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    right: 10,
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 50,
  },
  option: {
    padding: 10,
  },
});
