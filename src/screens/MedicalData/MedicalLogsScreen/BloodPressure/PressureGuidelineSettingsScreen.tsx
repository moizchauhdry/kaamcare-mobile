import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ScreenModalLayout } from 'components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { Typography } from 'components/UI/Typography/Typography';
import { theme } from 'config/Theme';
import { Button } from 'components/UI/Button/Button';
import { Card } from 'components/UI/Card/Card';
import RadioButton from 'components/UI/RadioButton/RadioButton';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { useState } from 'react';
import RadioButton2o from 'components/UI/RadioButton/RadioButton2o';

type PressureGuidelineSettingsScreenProps = NativeStackScreenProps<
  AddMedicalDataNavigationParamsList,
  'PressureGuidelineSettings'
>;

const guidelines = [
  { id: '1', label: '2017 ACC/AHA', value: 'acc_aha' },
  { id: '2', label: '2018 ESC/ESH', value: 'esc_esh' },
];

const pressureRanges = [
  { type: 'Lower', sys: '<90', dia: '<60', color: '#FA4FFD' },
  { type: 'Optimal', sys: '<90', dia: '<80', color: '#34C759' },
  { type: 'Normal', sys: '120-129', dia: '80-84', color: '#11A404' },
  { type: 'Elevated', sys: '130-139', dia: '85-89', color: '#FFCC5F' },
  { type: 'Grade 1', sys: '140-159', dia: '90-99', color: '#F8AE11' },
  { type: 'Grade 2', sys: '160-179', dia: '100-109', color: '#FF8102' },
  { type: 'Grade 3', sys: '>180', dia: '>110', color: '#FF8102' },
];

export const PressureGuidelineSettingsScreen = ({}: PressureGuidelineSettingsScreenProps) => {
  const navigation = useNavigation();
  const [selectedGuideline, setSelectedGuideline] = useState(guidelines[0].value);

  return (
    <View style={styles.container}>
      <ScreenModalLayout title="" isScrollable>
        <View style={styles.content}>
          {/* Guidelines Selection */}
          {/* <Card style={styles.guidelinesCard}> */}
          {guidelines.map((guideline) => (
            <RadioButton2o
              key={guideline.id}
              selected={selectedGuideline === guideline.value}
              onPress={() => setSelectedGuideline(guideline.value)}
              label={guideline.label}
            />
          ))}
          {/* </Card> */}

          {/* Pressure Ranges Table */}
          <Card style={styles.tableCard}>
            {/* Header */}
            <View style={styles.tableHeader}>
              <Typography style={[styles.headerCell]}>Type</Typography>
              <Typography style={styles.headerCell}>SYS</Typography>
              <Typography style={[styles.headerCell, { marginRight: 20 }]}>DIA</Typography>
            </View>

            {/* Rows */}
            {pressureRanges.map((range, index) => (
              <View key={index} style={styles.tableRow}>
                <View style={{ width: '30%' }}>
                  <Typography style={[styles.cell, { textAlign: 'left', fontSize: 15 }]} weight="semiBold">
                    {range.type}
                  </Typography>
                </View>
                <View style={styles.valueCell}>
                  <View>
                    <Typography style={styles.cell}>{range.sys}</Typography>
                    <View style={[styles.line, { backgroundColor: range.color }]} />
                  </View>
                </View>
                <Typography style={styles.andText}>and</Typography>
                <View style={styles.valueCell}>
                  <View>
                    <Typography style={styles.cell}>{range.dia}</Typography>
                    <View style={[styles.line, { backgroundColor: range.color }]} />
                  </View>
                </View>
              </View>
            ))}
          </Card>
        </View>
      </ScreenModalLayout>

      <View style={styles.buttonWrapper}>
        <Button variant="default" onPress={() => navigation.goBack()}>
          Done
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    gap: 16,
    paddingBottom: 80,
    paddingHorizontal: 16,
  },
  guidelinesCard: {
    padding: 16,
    gap: 12,
    borderRadius: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  tableCard: {
    // padding: 16,
    // borderRadius: 12,
    // backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.05,
    // shadowRadius: 4,
    // elevation: 3,
    paddingVertical: 16,
    paddingHorizontal: 0,
  },
  tableHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingHorizontal: 22,
    justifyContent: 'space-between',
  },
  headerCell: {
    // flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  typeCell: {
    // flex: 1.5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 22,

    // borderBottomWidth: 1,
    // borderBottomColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  cell: {
    flex: 1,
    fontSize: 13,
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
  valueCell: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  line: {
    width: 60,
    height: 2,
    borderRadius: 1,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  andText: {
    fontSize: 14,
    color: theme.colors.textGray,
  },
  orText: {
    fontSize: 14,
    color: theme.colors.textGray,
  },
});
