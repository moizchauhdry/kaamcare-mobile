import { View, Text } from 'react-native';
import React from 'react';
import { MedicalDataTile } from 'components/DataDisplay/AddMedicalData/AddMedicalData/components/MedicalDataTile';
import medicalLogs from 'assets/icons/medical-logs.svg';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';
import { MedicalLogs } from './MedicalLogs';

export default function HomeMedicalLogCard({
  navigation,
}: {
  navigation: StackNavigationProp<AddMedicalDataNavigationParamsList>;
}) {
  //   const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();

  return (
    <View>
      <MedicalDataTile
        title={'Medical Logs'}
        onPress={() => {
          //   navigation.navigate('MedicalDataNavigation', { screen: 'MedicalLogs' })
        }}
        icon={medicalLogs}
        isHome={true}
      />
    </View>
  );
}
