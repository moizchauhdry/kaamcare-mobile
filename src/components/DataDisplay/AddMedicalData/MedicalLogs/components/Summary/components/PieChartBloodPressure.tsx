import { Typography } from 'components/UI/Typography/Typography';
import { theme } from 'config/Theme';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { SvgXml } from 'react-native-svg';

import info from 'assets/icons/info.svg';
import { useNavigation } from '@react-navigation/native';
import { graphStages } from 'constants/data/medicalLogs/bloodPressure';

const { width } = Dimensions.get('window');

const PieChartComponent = ({ mainData }: { mainData: any }) => {
  // Define pie chart data
  const navigation = useNavigation();
  const categorizeBloodPressure = (systolic, diastolic) => {
    for (const stage of graphStages) {
      const systolicMatch = stage.scopes.find((s) => s.key === 'systolic' && systolic >= s.min && systolic <= s.max);
      const diastolicMatch = stage.scopes.find(
        (d) => d.key === 'diastolic' && diastolic >= d.min && diastolic <= d.max,
      );

      if (
        (stage.conditionType === 'AND' && systolicMatch && diastolicMatch) ||
        (stage.conditionType === 'OR' && (systolicMatch || diastolicMatch))
      ) {
        return stage;
      }
    }
    return null;
  };

  const processPieData = (mainData) => {
    const categoryCounts = {};

    // Initialize all stages with zero count
    graphStages.forEach((stage) => {
      categoryCounts[stage.label] = 0;
    });

    mainData.forEach((entry) => {
      const systolic = parseInt(entry.millimetersOfMercurySystolic, 10);
      const diastolic = parseInt(entry.millimetersOfMercuryDiastolic, 10);
      const category = categorizeBloodPressure(systolic, diastolic);

      if (category) {
        categoryCounts[category.label]++;
      }
    });

    const totalEntries = mainData.length;
    return graphStages.map((stage) => {
      const count = categoryCounts[stage.label];
      return {
        value: count,
        color: stage.color,
        text: stage.label,
        percentage: totalEntries > 0 ? ((count / totalEntries) * 100).toFixed(2) + '%' : '0%',
      };
    });
  };

  const pieDataDynamic = processPieData(mainData);

  const truncateText = (text: string) => {
    const words = text.split(' ');
    if (words.length > 2) {
      return `${words[0].charAt(0)}... ${words[1]} ${words[2]}`;
    }
    return text;
  };

  const onInfoPress = () => {
    navigation.navigate('PressureGuidline');
  };
  const totalPercentage = pieDataDynamic.reduce((acc, item) => acc + parseFloat(item.percentage), 0).toFixed(2) + '%';

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Pie Chart </Text>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Last 12 Months</Text>

        <TouchableOpacity onPress={onInfoPress} style={{ marginTop: -3 }}>
          <SvgXml xml={info} height={28} />
        </TouchableOpacity>
      </View>

      <View style={styles.chartLegendContainer}>
        {/* Pie Chart */}
        <View style={styles.chartWrapper}>
          <PieChart
            data={pieDataDynamic}
            donut
            // showText
            textColor="black"
            radius={width * 0.14} // Adjusts dynamically to screen size
            innerRadius={width * 0.07}
            centerLabelComponent={() => (
              <Text style={styles.percentage}>
                {totalPercentage && totalPercentage > '100' ? '100%' : totalPercentage}
              </Text>
            )}
          />
        </View>

        {/* Legend Section */}
        <View style={styles.legendWrapper}>
          {pieDataDynamic.map((item, index) => (
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
    padding: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.shadowPrimary,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 1,
    shadowOpacity: 0.9,
    elevation: 4,
    borderColor: theme.colors.backgroundDark,
    borderWidth: 1,
    marginTop: 15,
  },
  infoContainer: {
    marginBottom: 12,
    // position: 'absolute',
    // left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 12,
    color: theme.colors.textPrimary,
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
