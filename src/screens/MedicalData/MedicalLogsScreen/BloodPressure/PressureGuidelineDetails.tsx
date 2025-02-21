import { StyleSheet, TouchableOpacity, View } from 'react-native';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { useNavigation } from '@react-navigation/native';
import { ScreenModalLayout } from 'components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { Typography } from 'components/UI/Typography/Typography';
import { theme } from 'config/Theme';
import { Card } from 'components/UI/Card/Card';
import { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import chevronDown from '../../../../assets/icons/chevron-down.svg';
import chevronDownTransparent from '../../../../assets/icons/chevron-down-transparent.svg';
import chevronUp from '../../../../assets/icons/chevron-up.svg';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { GraphStage } from 'model/medicalLogs/MedicalLogsCommon';
import { getStageRange } from 'utils/medicalLogs/summary';

type PressureGuidelineDetailsProps = NativeStackScreenProps<
  AddMedicalDataNavigationParamsList,
  'PressureGuidelineDetails'
>;

const indicators = [
  { color: '#007AFF' }, // Hypotension
  { color: '#34C759' }, // Normal
  { color: '#F8AE11' }, // Prehypertension
  { color: '#FF8102' }, // Stage 1
  { color: '#FF9647' }, // Stage 2
  { color: '#E84420' }, // Crisis
];

export const PressureGuidelineDetails = ({ route }: PressureGuidelineDetailsProps) => {
  const { stage } = route.params;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <ScreenModalLayout title={''} isScrollable>
        <View style={styles.content}>
          {/* Main Card */}
          <Card style={styles.mainCard}>
            {/* Title Section */}
            <View style={styles.titleContainer}>
              {/* <View style={{ width: 15, height: 15, borderRadius: 15, backgroundColor: stage.color }} /> */}
              <Typography style={[styles.titleText]}>{stage.label}</Typography>
            </View>

            {/* Indicators */}
            <View style={styles.indicatorContainer}>
              {indicators.map((indicator, index) => (
                <View key={index} style={[styles.indicator, { backgroundColor: indicator.color }]}>
                  {index === stage.index && (
                    <SvgXml
                      style={styles.arrow}
                      width={28}
                      height={28}
                      color={indicator.color}
                      xml={chevronDownTransparent}
                    />
                  )}
                </View>
              ))}
            </View>
            {/* Subtitle */}
            <View style={styles.subtitleContainer}>
              <Typography style={styles.subtitleText}>{getStageRange(stage)}</Typography>
            </View>
            {/* Warning Text */}
            {/* <Typography style={styles.warningText}>{stage.advice}</Typography> */}
          </Card>

          {/* Advice Card */}
          <Card style={styles.adviceCard}>
            <TouchableOpacity style={styles.adviceHeader} onPress={() => setIsExpanded(!isExpanded)}>
              <View style={styles.avatarContainer}>
                <Typography style={styles.avatarText}>👨‍⚕️</Typography>
              </View>
              <View style={styles.headerTextContainer}>
                <Typography style={styles.adviceTitle}>Exclusive advice</Typography>
              </View>
              <SvgXml xml={isExpanded ? chevronUp : chevronDown} />
            </TouchableOpacity>

            {isExpanded && (
              <View style={styles.adviceContent}>
                {stage.exclusiveAdvices.map((advice: any, index) => (
                  <View key={index} style={styles.adviceItem}>
                    <Typography style={[styles.adviceItemTitle, { color: advice.titleColor }]} weight="semiBold">
                      • {advice.title}
                    </Typography>
                    <Typography style={styles.adviceItemContent}>{advice.description}</Typography>
                  </View>
                ))}
              </View>
            )}
          </Card>
        </View>
      </ScreenModalLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    // padding: 16,
    gap: 16,
  },
  mainCard: {
    // paddingHorizontal: 12,
    paddingVertical: 0,
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: 'center',
    // width: '90%',
    marginHorizontal: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 35,
    color: theme.colors.textPrimary,
  },
  subtitleContainer: {
    flexDirection: 'row',
    // width: '70%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  subtitleText: {
    fontSize: 13,
    color: '#181818',
    marginTop: 6,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    width: '100%',
    paddingHorizontal: 8,
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
    top: -25,
  },
  warningText: {
    fontSize: 12,
    textAlign: 'center',
    color: theme.colors.textGrayDark,
    lineHeight: 18,
    width: '85%',
  },
  adviceCard: {
    padding: 16,
  },
  adviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    lineHeight: 30,
  },
  headerTextContainer: {
    flex: 1,
  },
  adviceTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    lineHeight: 30,
  },
  adviceContent: {
    marginTop: 16,
    gap: 16,
  },
  adviceItem: {
    gap: 4,
  },
  adviceItemTitle: {
    fontSize: 15,
    color: theme.colors.textPrimary,
  },
  adviceItemContent: {
    fontSize: 14,
    color: theme.colors.textPrimary,
    lineHeight: 20,
  },
});
