import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { useNavigation } from '@react-navigation/native';
import { ScreenModalLayout } from 'components/Layouts/ScreenModalLayout/ScreenModalLayout';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';
import { useState } from 'react';
import type { AddMedicalDataNavigationParamsList } from '../../../../components/Navigation/AddMedicalDataNavigation';
import { SwitchSelectorControlled } from 'components/UI/Inputs/SwitchSelector/SwitchSelectorControlled';
import { SwitchSelectorComponent } from 'components/UI/Inputs/SwitchSelector/SwitchSelector';
import { theme } from 'config/Theme';
import { Card } from 'components/UI/Card/Card';
import linkIcon from 'assets/icons/link.svg';
import { SvgXml } from 'react-native-svg';
// import SwitchSelector from 'react-native-switch-selector';
// import { SwitchSelectorComponent as SwitchSelector } from '../..//SwitchSelector';

type ConnectDeviceScreenProps = NativeStackScreenProps<AddMedicalDataNavigationParamsList, 'ConnectDeviceScreen'>;
const devices = [
  { name: 'GlucoMen AREO GK' },
  { name: 'GlucoMen AREO GK 1' },
  { name: 'GlucoMen AREO GK 2' },
  { name: 'GlucoMen AREO GK 3' },
  { name: 'GlucoMen AREO GK 4' },
  { name: 'GlucoMen AREO GK 5' },
  { name: 'GlucoMen AREO GK 6' },
  { name: 'GlucoMen AREO GK 7' },
];
export const ConnectDeviceScreen = (props: ConnectDeviceScreenProps) => {
  const navigation = useNavigation();
  const [keyboardHeight] = useState(new Animated.Value(0));
  const [deviceType, setdeviceType] = useState('Glucometers');
  const handleTypeChange = (value: string | number | any) => {
    setdeviceType(value);
  };
  return (
    <View style={{ flex: 1 }}>
      <ScreenModalLayout title="" isScrollable>
        <SwitchSelectorComponent
          value={deviceType}
          onPress={(value) => handleTypeChange(value)}
          options={[
            {
              value: 'ContinuesMonitors',
              label: 'Continues monitors',
            },
            { value: 'Glucometers', label: 'Glucometers' },
            { value: 'Pumps', label: 'Pumps' },
          ]}
          style={{ borderWidth: 0 }}
          textStyle={{ fontSize: 13 }}
          selectedTextStyle={{ fontSize: 14, color: theme.colors.primary }}
        />
        <ScrollView style={{ marginTop: 16 }}>
          <Card style={{ marginBottom: 8 }}>
            {devices.map((device, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 16,
                  borderBottomWidth: 1,
                  borderColor: theme.colors.backgroundDark,
                }}
              >
                <Typography style={{ marginLeft: 16, fontSize: 16 }}>{device.name}</Typography>
                <SvgXml xml={linkIcon} color={theme.colors.primary} />
              </View>
            ))}
          </Card>
        </ScrollView>
      </ScreenModalLayout>
      <Animated.View style={[styles.buttonWrapper, { bottom: keyboardHeight }]}>
        <Button variant="default" onPress={() => navigation.goBack()}>
          Connect
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
});
