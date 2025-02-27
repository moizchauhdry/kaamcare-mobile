import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { styles } from './ModalGrabber.styles';
import { Typography } from '../Typography/Typography';
import { theme } from 'config/Theme';
import { useState } from 'react';

export const ModalGrabber = ({
  title,
  onPress,
  showDropDown,
  onSelect,
}: {
  title?: string;
  onPress: any;
  showDropDown?: boolean;
  onSelect?: (option: string) => void; // Optional prop
}) => {
  // Format title to replace camel case or Pascal case with spaces
  const formattedTitle = title
    ? title.replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before uppercase letters
    : '';
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
    <TouchableOpacity onPress={onPress} style={styles.headerContainer}>
      {!showDropDown && title && (
        <Typography size="lg" style={{ fontSize: 24, fontWeight: '600', lineHeight: 36 }} weight="semiBold">
          {formattedTitle}
        </Typography>
      )}
      {showDropDown && (
        <View style={myStyles.container}>
          <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={myStyles.titleContainer}>
            <Typography size="lg" style={{ fontSize: 22, color: theme.colors.primary }} weight="bolder">
              {selectedType} ▼
            </Typography>
          </TouchableOpacity>

          {dropdownVisible && (
            <View style={myStyles.dropdown}>
              {['Blood Pressure', 'Heart Rate', 'Blood sugar', 'Height', 'Weight', 'SpO2'].map((option) => (
                <TouchableOpacity key={option} style={myStyles.option} onPress={() => handleSelect(option)}>
                  <Typography color={selectedType === option ? 'primary' : 'gray'} size="sm" weight="bolder">
                    {option}
                  </Typography>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const myStyles = StyleSheet.create({
  container: {
    // marginTop: 20,
    alignItems: 'flex-end',
    // borderBottomWidth: 1,
    // borderColor: theme.colors.border,
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
