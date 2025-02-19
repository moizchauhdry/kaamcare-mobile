import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { theme } from 'config/Theme';
import { SvgXml } from 'react-native-svg';
import chevronDown from '../../../assets/icons/chevron-down-transparent.svg';
import help from '../../../assets/icons/help-filled.svg';
import { Typography } from '../Typography/Typography';
import { Card } from './Card';
import { useNavigation } from '@react-navigation/native';

const PreHypertensionCard = () => {
  const navigation = useNavigation();
  return (
    <Card style={{ borderColor: theme.colors.backgroundDark, borderWidth: 1, height: 165 }}>
      <View style={styles.contentContainer}>
        {/* Title */}
        <Typography style={styles.titleText}>Pre-Hypertension</Typography>

        {/* Subtitle */}
        <View
          style={{
            flexDirection: 'row',
            // width: '70%',
            // justifyContent: 'space-between',
            gap: 10,
            alignItems: 'center',
            // backgroundColor: 'red',
          }}
        >
          <Typography style={styles.subtitleText}>Systolic 121-109 or Diastolic 90-120</Typography>
          <TouchableOpacity style={{}} onPress={() => (navigation as any).navigate('HypertensionStagesScreen')}>
            <SvgXml xml={help} width={18} height={18} />
          </TouchableOpacity>
        </View>
        {/* Colored indicators */}
        <View style={styles.indicatorContainer}>
          <View style={[styles.indicator, { backgroundColor: '#007AFF' }]} />
          <View style={[styles.indicator, { backgroundColor: '#34C759' }]} />
          <View style={[styles.indicator, { backgroundColor: '#F8AE11' }]}>
            <SvgXml style={styles.arrow} color={'#F8AE11'} xml={chevronDown} />
          </View>
          <View style={[styles.indicator, { backgroundColor: '#FF8102' }]} />
          <View style={[styles.indicator, { backgroundColor: '#FF9647' }]} />
          <View style={[styles.indicator, { backgroundColor: '#E84420' }]} />
        </View>

        {/* Instructional text */}
        <Typography style={styles.warningText}>
          Attention if you’ve got 3 or more results in the range your doctor advice and immediate treatment are
          necessary
        </Typography>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    // borderRadius: 12,
    padding: 16,
    // margin: 16,
    elevation: 2,
  },
  contentContainer: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: '500',
    // marginBottom: 10,
    textAlign: 'center',
    lineHeight: 27,
    color: theme.colors.textPrimary,
  },
  subtitleText: {
    fontSize: 12,
    color: theme.colors.textGray,
    fontWeight: '400',

    // marginBottom: 16,
    // textAlign: 'flex-end',
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
    lineHeight: 15,
    width: '74%',
  },
});

export default PreHypertensionCard;
