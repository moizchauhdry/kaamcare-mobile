import { Animated, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { useNavigation } from '@react-navigation/native';
import { ScreenModalLayout } from 'components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { Button } from 'components/UI/Button/Button';
import { Card } from 'components/UI/Card/Card';
import { Typography } from 'components/UI/Typography/Typography';
import { theme } from 'config/Theme';
import { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import chevronDown from '../../../../assets/icons/chevron-down-transparent.svg';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';

type HypertensionStagesScreenProps = NativeStackScreenProps<
  AddMedicalDataNavigationParamsList,
  'HypertensionStagesScreen'
>;

const stages = [
  {
    title: 'Low',
    subtitle: 'Your blood pressure seems a little low.',
    systolicRange: 'Your blood pressure seems a little low.',
    advice: 'Please seek help from your doctor if it remains low for a long time.',
    color: '#007AFF',
    arrowIndex: 0,
  },
  {
    title: 'Normal',
    subtitle: 'Great! Your blood pressure is in the healthy range.',
    systolicRange: 'Systolic 90–119 and Diastolic 60–79',
    advice: 'Great! Your blood pressure is in the healthy range. Just keep it!',
    color: '#34C759',
    arrowIndex: 1,
  },
  {
    title: 'Pre-hypertension',
    subtitle: 'Please seek help from your doctor if it remains low for a long time.',
    systolicRange: 'Systolic 120–129 and Diastolic < 80',
    advice: 'Please seek help from your doctor if it remains low for a long time.',
    color: '#F8AE11',
    arrowIndex: 2,
  },
  {
    title: 'Hypertension-Stage 1',
    subtitle: 'Please seek help from your doctor.',
    systolicRange: 'Systolic 130–139 or Diastolic 80–89',
    advice: 'Please seek help from your doctor if it remains low for a long time.',
    color: '#FF8102',
    arrowIndex: 3,
  },
  {
    title: 'Hypertension-Stage 2',
    subtitle: 'Attention! If you’ve got 3 or more results in this range.',
    systolicRange: 'Systolic 140–180 or Diastolic 90–120',
    advice: `Attention! If you've got 3 or more results in the range, your doctor's advice and immediate medical treatment are necessary.`,
    color: '#FF9647',
    arrowIndex: 4,
  },
  {
    title: 'Hypertensive-Crisis',
    subtitle: 'We are worried about you.',
    systolicRange: 'Systolic > 180 or Diastolic > 120',
    advice: 'We are worried about you, please call emergency services immediately.',
    color: '#E84420',
    arrowIndex: 5,
  },
];

export const HypertensionStagesScreen = (props: HypertensionStagesScreenProps) => {
  const navigation = useNavigation();
  const [keyboardHeight] = useState(new Animated.Value(0));

  return (
    <View style={{ flex: 1 }}>
      <ScreenModalLayout title="" isScrollable>
        {stages.map((stage, index) => (
          <Card key={index} style={{ marginBottom: 10 }}>
            <View style={styles.contentContainer}>
              {/* Title */}
              <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 15, height: 15, borderRadius: 15, backgroundColor: stage.color }} />
                <Typography style={{ ...styles.titleText, color: stage.color }}>{stage.title}</Typography>
              </View>

              {/* Subtitle */}
              {/* <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  // justifyContent: 'space-between',
                  // alignItems: 'center',
                }}
              > */}
              <Typography style={styles.subtitleText}>{stage.systolicRange}</Typography>
              {/* </View> */}
              {/* Colored indicators */}
              <View style={styles.indicatorContainer}>
                {stages.map((_, indicatorIndex) => (
                  <View
                    key={indicatorIndex}
                    style={[styles.indicator, { backgroundColor: stages[indicatorIndex]?.color || 'transparent' }]}
                  >
                    {indicatorIndex === stage.arrowIndex && (
                      <SvgXml style={styles.arrow} color={stage.color} xml={chevronDown} />
                    )}
                  </View>
                ))}
              </View>

              {/* Instructional text */}
              <Typography style={styles.warningText}>{stage.advice}</Typography>
            </View>
          </Card>
        ))}
        <View style={{ marginBottom: 60 }} />
      </ScreenModalLayout>
      <Animated.View style={[styles.buttonWrapper, { bottom: keyboardHeight }]}>
        <Button variant="default" onPress={() => navigation.goBack()}>
          Save
        </Button>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    // marginTop: 6,
    textAlign: 'center',
    lineHeight: 25,
    color: theme.colors.textPrimary,
  },
  subtitleText: {
    fontSize: 13,
    color: '#181818',
    marginTop: 6,
    textAlign: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 18,
  },
  indicator: {
    width: 40,
    height: 15,
    borderRadius: 20,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    position: 'absolute',
    top: -20,
  },
  warningText: {
    fontSize: 12,
    textAlign: 'center',
    color: theme.colors.textGrayDark,
    lineHeight: 18,
    width: '85%',
  },
});
