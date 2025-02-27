import { useState, useEffect } from 'react';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import bellIcon from 'assets/icons/bell.svg';
import arrowDown from 'assets/icons/chevron-down-black.svg';
import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';
import { theme } from 'config/Theme';
import { Typography } from 'components/UI/Typography/Typography';
import NoMedicationData from 'components/DataDisplay/PillTrackerData/MedicationData/NoMedicationData';
import HorizontalDatePicker from 'components/UI/HorizontalDatePicker/HorizontalDatePicker';
import { useQueryMedications } from 'hooks/query/medicalHistory/medication/useQueryMedications';
import { MedicationReminder } from 'components/DataDisplay/PillTrackerData/MedicationData/MedicationReminder';
import { FontAwesome } from '@expo/vector-icons';
import { useQueryGetProfileInformation } from 'hooks/query/profile/useQueryGetProfileInformation';



export const PillTrackerHomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();
  const { data, isLoading, isError } = useQueryGetProfileInformation({
    retry: 1,
  });
  const handleAddMedication = () => {
    navigation.navigate('SelectMedication');
  }
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    const currentDay = new Date().getDate();
    const currentDayString = currentDay < 10 ? `0${currentDay}` : currentDay.toString();
    setSelectedDate(currentDayString);
  }, []);


  const { data: medications = [] } = useQueryMedications();

  useEffect(() => {
    const today = new Date();
    const todayStr = today.getDate().toString().padStart(2, "0");
    setSelectedDate(todayStr);
  }, []);

  const filteredMedications = medications.filter(
    (med) => med.start_date === selectedDate
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={styles.header}>
            <View style={{ flexDirection: 'row' }}>
              {data?.firstName ? (
                <Typography weight="semiBold">Hello {data.firstName} </Typography>
              ) : null}
              {data?.lastName ? (
                <Typography weight="semiBold">{data.lastName}!</Typography>
              ) : null}
            </View>
          {/* <Pressable onPress={() => navigation.navigate('Notifications')}>
            <SvgXml xml={bellIcon} width={28} height={28} />
          </Pressable> */}
        </View>
        <View>
          <HorizontalDatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </View>
        <View style={styles.arrowWrapper}>
          <Pressable onPress={() => navigation.navigate('ExpandedCalendar')}>
            <SvgXml xml={arrowDown} width={28} height={28} />
          </Pressable>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {filteredMedications.length > 0 ? (
              <FlatList
                data={filteredMedications}
                keyExtractor={(med) => med.userMedicationId}
                renderItem={({ item }) => <MedicationReminder {...item} />}
                contentContainerStyle={{ gap: 8 }}
              />
            ) : (
              <NoMedicationData />
            )}
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddMedication}>
            <FontAwesome name="plus-circle" size={20} color="white" />
            <Text style={styles.addButtonText}>Add medications</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.white,
  },
  header: {
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 50,
    marginBottom: 4,
  },
  backgroundimage: {
    width: 380,
    height: 380,
    alignSelf: 'center',
    marginTop: 40
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  primarytext: {
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
  },
  secondarytext: {
    fontSize: 24,
    color: 'red',
    marginBottom: 20,
  },
  calendarContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  monthTitle: {
    fontSize: 24,
    lineHeight: 22,
  },
  yearText: {
    fontSize: 16,
    color: theme.colors.black,
  },
  dayContainer: {
    width: 45,
    height: 95,
    borderRadius: 10,
    backgroundColor: '#DCECF8',
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  selectedDay: {
    backgroundColor: theme.colors.primary200,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.black,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: theme.colors.black,
  },
  selectedText: {
    color: theme.colors.white,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'red',
    marginTop: 4,
  },
  divider: {
    borderWidth: 0.3,
    borderColor: '#9B9B9B',
    marginTop: 8,
  },
  arrowWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  content: {
    flex: 1
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default PillTrackerHomeScreen;
