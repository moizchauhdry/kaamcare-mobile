import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { useNavigation } from '@react-navigation/native';
import { ScreenModalLayout } from 'components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { Button } from 'components/UI/Button/Button';
import { Card } from 'components/UI/Card/Card';
import { Typography } from 'components/UI/Typography/Typography';
import { theme } from 'config/Theme';
import { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import chevronRight from '../../../../assets/icons/chevron-right.svg';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';

type PressureGuidlineScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'PressureGuidline'>;

const stages = [
  {
    title: 'Hypotension',
    subtitle: 'sys >90 or DIA <60',
    advice: 'Please seek help from your doctor if it remains low for a long time.',
    color: '#007AFF',
    arrowIndex: 0,
  },
  {
    title: 'Normal',
    subtitle: 'sys 90-119 and DIA 60-79',
    advice: 'Great! Your blood pressure is in the healthy range. Just keep it!',
    color: '#34C759',

    arrowIndex: 1,
  },
  {
    title: 'Prehypertension',
    subtitle: 'sys 120-129 and DIA <80',
    advice: 'Please seek help from your doctor if it remains low for a long time.',
    color: '#F8AE11',
    arrowIndex: 2,
  },
  {
    title: 'Hypertension Stage 1',
    subtitle: 'sys 130-139 or DIA 80-89',
    advice: 'Please seek help from your doctor if it remains low for a long time.',
    color: '#FF8102',
    arrowIndex: 3,
  },
  {
    title: 'Hypertension Stage 2',
    subtitle: 'sys 140-180 or DIA 90-120',
    advice: `Attention! If you've got 3 or more results in the range, your doctor's advice and immediate medical treatment are necessary.`,
    color: '#FF9647',
    arrowIndex: 4,
  },
  {
    title: 'Hypertensive Crisis',
    subtitle: 'sys >180 or DIA >120',
    advice: 'We are worried about you, please call emergency services immediately.',
    color: '#E84420',
    arrowIndex: 5,
  },
];

export const PressureGuidlineScreen = (props: PressureGuidlineScreenProps) => {
  const navigation = useNavigation();
  const [keyboardHeight] = useState(new Animated.Value(0));
  const CustomButton = ({
    title,
    onPress,
    variant = 'default',
  }: {
    title: string;
    onPress: () => void;
    variant?: 'default' | 'outline';
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.customButton, variant === 'outline' ? styles.outlineButton : styles.defaultButton]}
      >
        <Text style={[styles.buttonText, variant === 'outline' ? styles.outlineButtonText : styles.defaultButtonText]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <ScreenModalLayout title="" isScrollable>
        {stages.map((stage, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('PressureGuidelineDetails', { stage })}>
            <Card style={{ marginBottom: 10, paddingVertical: 0, paddingHorizontal: 4 }}>
              <View style={styles.contentContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 6 }}>
                  <View style={{ width: 15, height: 41, borderRadius: 15, backgroundColor: stage.color }} />
                  {/* Title */}
                  <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography style={{ ...styles.titleText }}>{stage.title}</Typography>
                    <Typography style={styles.subtitleText}>{stage.subtitle}</Typography>
                  </View>
                </View>

                <SvgXml xml={chevronRight} color={theme.colors.primary} />
              </View>
            </Card>
          </TouchableOpacity>
        ))}
        <View style={{ marginBottom: 60 }} />
      </ScreenModalLayout>
      <Animated.View style={[styles.buttonWrapper, { bottom: keyboardHeight }]}>
        <View style={styles.buttonContainer}>
          <CustomButton title="Got it" onPress={() => navigation.goBack()} />
          <CustomButton title="Settings" onPress={() => navigation.navigate('PressureGuidelineSettings')} />
        </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  customButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  defaultButton: {
    backgroundColor: theme.colors.primary,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  defaultButtonText: {
    color: theme.colors.white,
  },
  outlineButtonText: {
    color: theme.colors.primary,
  },
  contentContainer: {
    // alignItems: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'left',
    // lineHeight: 25,
    color: theme.colors.textPrimary,
  },
  subtitleText: {
    fontSize: 13,
    color: theme.colors.textGray,
    // marginTop: 6,
    // marginBottom: 12,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 18,
    width: '100%',
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
    textAlign: 'left',
    color: theme.colors.textGrayDark,
    lineHeight: 18,
    width: '100%',
  },
});
