import { useState, useEffect } from 'react';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import bellIcon from 'assets/icons/bell.svg';
import arrowDown from 'assets/icons/chevron-down-black.svg';
import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';
import { theme } from 'config/Theme';
import { Typography } from 'components/UI/Typography/Typography';

const days = [
  { day: 'Sun', date: '01', hasDot: false },
  { day: 'Mon', date: '02', hasDot: false },
  { day: 'Tue', date: '03', hasDot: false },
  { day: 'Wed', date: '04', hasDot: true },
  { day: 'Thu', date: '05', hasDot: false },
  { day: 'Fri', date: '06', hasDot: true },
  { day: 'Sat', date: '07', hasDot: false },
];

export const PillTrackerHomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();

  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    const currentDay = new Date().getDate();
    const currentDayString = currentDay < 10 ? `0${currentDay}` : currentDay.toString();
    setSelectedDate(currentDayString);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ height: '100%' }}>
        <View style={styles.header}>
          <View>
            <Image style={styles.avatar} source={require('../../../../assets/images/Avatar.png')} />
            <Typography size="xs">Hello John</Typography>
          </View>
          <Pressable onPress={() => {}}>
            <SvgXml xml={bellIcon} width={28} height={28} />
          </Pressable>
        </View>

        <View style={styles.calendarContainer}>
          <Typography size="xl" style={styles.monthTitle}>
            November
          </Typography>
          <Typography size="md" style={styles.yearText}>
            2025
          </Typography>
          <View style={styles.divider} />

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={days}
            keyExtractor={(item) => item.date}
            renderItem={({ item }) => (
              <Pressable
                style={[styles.dayContainer, selectedDate === item.date && styles.selectedDay]}
                onPress={() => setSelectedDate(item.date)}
              >
                <Text style={[styles.dayText, selectedDate === item.date && styles.selectedText]}>{item.day}</Text>
                <Text style={[styles.dateText, selectedDate === item.date && styles.selectedText]}>{item.date}</Text>
                {item.hasDot && <View style={styles.dot} />}
              </Pressable>
            )}
          />
        </View>

        <View style={styles.arrowWrapper}>
          <Pressable onPress={() => {}}>
            <SvgXml xml={arrowDown} width={28} height={28} />
          </Pressable>
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
    marginBottom: 12,
  },
  arrowWrapper: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default PillTrackerHomeScreen;
