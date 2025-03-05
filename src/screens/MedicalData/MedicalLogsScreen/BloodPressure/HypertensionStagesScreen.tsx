import { Animated, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
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
import { graphStages } from 'constants/data/medicalLogs/bloodPressure';
import { GraphStage } from 'model/medicalLogs/MedicalLogsCommon';
import { getStageRange } from 'utils/medicalLogs/summary';

type HypertensionStagesScreenProps = NativeStackScreenProps<
  AddMedicalDataNavigationParamsList,
  'HypertensionStagesScreen'
>;

export const HypertensionStagesScreen = (props: HypertensionStagesScreenProps) => {
  const navigation = useNavigation();
  const [keyboardHeight] = useState(new Animated.Value(0));

  return (
    <>
      <View style={{ flex: 1, backgroundColor: theme.colors.background, gap: 8, padding: 16 }}>
        {/* <ScreenModalLayout title="" isScrollable> */}
        <ScrollView
          style={{ flex: 1 }}
          keyboardShouldPersistTaps="never"
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets
          // contentContainerStyle={{ flexGrow: 1 }}
        >
          {graphStages.map((stage, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('PressureGuidelineDetails', { stage })}>
              <Card key={index} style={{ marginBottom: 10 }}>
                <View style={styles.contentContainer}>
                  {/* Title */}
                  <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: 15, height: 15, borderRadius: 15, backgroundColor: stage.color }} />
                    <Typography style={{ ...styles.titleText, color: stage.color }}>{stage.label}</Typography>
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
                  <Typography style={styles.subtitleText}>{getStageRange(stage)}</Typography>
                  {/* </View> */}
                  {/* Colored indicators */}
                  <View style={styles.indicatorContainer}>
                    {graphStages.map((_, indicatorIndex) => (
                      <View
                        key={indicatorIndex}
                        style={[
                          styles.indicator,
                          { backgroundColor: graphStages[indicatorIndex]?.color || 'transparent' },
                        ]}
                      >
                        {indicatorIndex === stage.index && (
                          <SvgXml style={styles.arrow} color={stage.color} xml={chevronDown} />
                        )}
                      </View>
                    ))}
                  </View>

                  {/* Instructional text */}
                  <Typography style={styles.warningText}>{stage.advice}</Typography>
                </View>
              </Card>
            </TouchableOpacity>
          ))}

          <View style={{ marginBottom: 60 }} />
          {/* </ScreenModalLayout> */}
        </ScrollView>
      </View>
      <Animated.View style={[styles.buttonWrapper, { bottom: keyboardHeight }]}>
        <Button variant="default" onPress={() => navigation.goBack()}>
          Save
        </Button>
      </Animated.View>
    </>
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
