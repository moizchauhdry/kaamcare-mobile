import { Typography } from 'components/UI/Typography/Typography';
import { theme } from 'config/Theme';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { SvgXml } from 'react-native-svg';

import info from 'assets/icons/info.svg';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const PieChartComponent = () => {
  // Define pie chart data
  const navigation = useNavigation();

  const pieData = [
    { value: 5, color: '#84c3f5', text: 'Low', percentage: '10%' },
    { value: 15, color: '#89d7a5', text: 'Normal', percentage: '10%' },
    { value: 34, color: '#ffcd56', text: 'Prehypertension', percentage: '34%' },
    { value: 33, color: '#ff6f61', text: 'Hypertension Stage 1', percentage: '33%' },
    { value: 13, color: '#d9534f', text: 'Hypertension Stage 2', percentage: '33%' },
  ];
  const truncateText = (text: string) => {
    const words = text.split(' ');
    if (words.length > 2) {
      return `${words[0]} ${words[1]} ...`;
    }
    return text;
  };
  const onInfoPress = () => {
    navigation.navigate('PressureGuidline');
  };
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Pie Chart (Last 12 Months)</Text>

        <TouchableOpacity onPress={onInfoPress} style={{ marginTop: -3 }}>
          <SvgXml xml={info} height={28} />
        </TouchableOpacity>
      </View>

      <View style={styles.chartLegendContainer}>
        {/* Pie Chart */}
        <View style={styles.chartWrapper}>
          <PieChart
            data={pieData}
            donut
            // showText
            textColor="black"
            radius={width * 0.14} // Adjusts dynamically to screen size
            innerRadius={width * 0.07}
            centerLabelComponent={() => <Text style={styles.percentage}>34%</Text>}
          />
        </View>

        {/* Legend Section */}
        <View style={styles.legendWrapper}>
          {pieData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.percentage}</Text>

              <Text style={styles.legendText}>{truncateText(item.text)}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 12,
    // elevation: 4,
    // shadowColor: '#000',
    shadowOpacity: 0.1,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 4,
    alignSelf: 'center',
  },
  infoContainer: {
    marginBottom: 12,
    position: 'absolute',
    left: 0,
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 12,
    color: theme.colors.gray200,
  },
  chartLegendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 30,
  },
  chartWrapper: {
    alignItems: 'center',
    marginRight: 10,
  },
  percentage: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  legendWrapper: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: theme.colors.danger,
    padding: 10,
    borderRadius: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColor: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.gray200,
    marginLeft: 10,
  },
});

export default PieChartComponent;
