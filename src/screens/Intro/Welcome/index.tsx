import { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import { View, ScrollView, StyleSheet, Image, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { theme } from 'config/Theme';
import apple from 'assets/icons/apple.svg';
import google from 'assets/icons/google.svg';
import emailCircle from 'assets/icons/user-email-circle.svg';
import type { AuthNavigationParamsList } from 'components/Navigation/AuthNavigation';

import { TermsCheckbox } from '../Signup/modules/TermsCheckbox';

export const WelcomeScreen = () => {
  const [isChecked, setIsChecked] = useState(false);
  const navigation = useNavigation<StackNavigationProp<AuthNavigationParamsList>>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ alignContent: 'center', width: '100%', paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
      >
        <View style={{ flex: 0.5, paddingVertical: 18, alignItems: 'center' }}>
          <Image style={{ width: 126, height: 56 }} source={require('../../../assets/logo.png')} />
        </View>

        <View style={{ flex: 0.6, width: '100%' }}>
          <View style={{ display: 'flex', gap: 10, marginTop: 45, marginBottom: 80 }}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <View style={styles.iconContainer}>
                <SvgXml xml={google} />
              </View>
              <Text style={styles.buttonText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
              <View style={styles.iconContainer}>
                <SvgXml xml={apple} />
              </View>
              <Text style={styles.buttonText}>Continue with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('SignUp')}
            >
              <View style={styles.iconContainer}>
                <SvgXml xml={emailCircle} />
              </View>
              <Text style={styles.buttonText}>Continue with Email</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TermsCheckbox checked={isChecked} onToggle={setIsChecked} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    overflow: 'scroll',
    backgroundColor: theme.colors.white,
  },
  forgotPassword: {
    marginVertical: 20,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: theme.colors.backgroundDark,
  },
  socialButton: {
    backgroundColor: theme.colors.white,
    padding: 14,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.4,
    color: theme.colors.textPrimary,
  },
});
