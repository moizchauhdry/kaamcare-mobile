import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { theme } from 'config/Theme';
import { SvgXml } from 'react-native-svg';
import chevronDown from '../../../assets/icons/chevron-down-transparent.svg';
import help from '../../../assets/icons/help-filled.svg';
import { Typography } from '../Typography/Typography';
import { Card } from './Card';
import { useNavigation } from '@react-navigation/native';
import { graphStages } from 'constants/data/medicalLogs/bloodPressure';

interface PreHypertensionCardProps {
  systolic: number;
  diastolic: number;
}

const PreHypertensionCard: React.FC<PreHypertensionCardProps> = ({ systolic, diastolic }) => {
  const navigation = useNavigation();

  // Determine the current stage based on systolic and diastolic values
  const currentStage = graphStages.find((stage) => {
    return stage.scopes.some((scope) => {
      if (scope.key === 'systolic') {
        return systolic >= scope.min && systolic <= scope.max;
      } else if (scope.key === 'diastolic') {
        return diastolic >= scope.min && diastolic <= scope.max;
      }
      return false;
    });
  });

  const stageIndex = currentStage?.index || 0;

  return (
    <Card style={{ borderColor: theme.colors.backgroundDark, borderWidth: 1, height: 165 }}>
      <View style={styles.contentContainer}>
        {/* Title */}
        <Typography style={styles.titleText}>{currentStage?.label || 'Pre-Hypertension'}</Typography>

        {/* Subtitle */}
        <View style={{ flexDirection: 'row', gap: 8, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Typography style={styles.subtitleText}>
            Systolic {systolic} and Diastolic {diastolic}
          </Typography>
          <TouchableOpacity onPress={() => (navigation as any).navigate('HypertensionStagesScreen')}>
            <SvgXml xml={help} width={20} height={20} />
          </TouchableOpacity>
        </View>

        {/* Colored indicators */}
        <View style={styles.indicatorContainer}>
          {graphStages.map((stage, index) => (
            <View
              key={stage.label}
              style={[
                styles.indicator,
                { backgroundColor: stage.color },
                index === stageIndex && { justifyContent: 'center', alignItems: 'center' },
              ]}
            >
              {index === stageIndex && <SvgXml style={styles.arrow} color={stage.color} xml={chevronDown} />}
            </View>
          ))}
        </View>

        {/* Instructional text */}
        <Typography style={styles.warningText}>{currentStage?.advice}</Typography>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    elevation: 2,
  },
  contentContainer: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 27,
    color: theme.colors.textPrimary,
  },
  subtitleText: {
    fontSize: 12,
    color: theme.colors.textGray,
    fontWeight: '400',
    textAlign: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    marginTop: 16,
  },
  indicator: {
    width: 40,
    height: 15,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  arrow: {
    position: 'absolute',
    top: -20,
  },
  warningText: {
    fontSize: 12,
    textAlign: 'center',
    color: theme.colors.textGrayDark,
    lineHeight: 15,
    width: '74%',
  },
});

export default PreHypertensionCard;
