import { useEffect, useState } from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Checkbox } from 'expo-checkbox';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as AppleAuthentication from 'expo-apple-authentication';
import type { StackNavigationProp } from '@react-navigation/stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { theme } from 'config/Theme';
import apple from 'assets/icons/apple.svg';
import Metrics, { isAndroid } from 'config/Metrics';
import google from 'assets/icons/google.svg';
import faceId from 'assets/icons/face-id.svg';
import { AuthTypes } from 'constants/enums';
import fingerprint from 'assets/icons/fingerprint.svg';
import { LoginForm } from 'components/Forms/LoginForm';
import { Typography } from 'components/UI/Typography/Typography';
import type { AuthNavigationParamsList } from 'components/Navigation/AuthNavigation';

import { useAuthLogin } from './data/auth-login';

export const LoginScreen = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { mutate: authLogin, isPending } = useAuthLogin();
  const [isBiometricAvailable, setIsBiometricAvailable] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<AuthNavigationParamsList>>();

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      if (user.data?.idToken) {
        authLogin({
          email: user.data?.user.email,
          type: AuthTypes.GOOGLE,
          google_token: user.data?.idToken,
        });
      }
    } catch (error) {
      console.log('Google Auth Error', error);
    }
  };

  const signInWithApple = async () => {
    try {
      const response = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (response.email) {
        authLogin({
          email: response.email,
          type: AuthTypes.APPLE,
          apple_token: response.identityToken ?? '',
        });
      } else {
        Alert.prompt('Email Required', 'We need your email address to continue. Please provide it below.', (email) => {
          if (email) {
            authLogin({
              email,
              type: AuthTypes.APPLE,
              apple_token: response.identityToken ?? '',
            });
          } else {
            console.log('User declined to provide email');
          }
        });
      }
    } catch (error) {
      console.log('Apple Auth Error', error);
    }
  };

  const handleBiometric = async () => {
    const userSavedEmail = SecureStore.getItem('user-email');
    if (!isBiometricAvailable) {
      return Alert.alert('Not Found', 'Biometrics are not available on this device.');
    }

    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      return Alert.alert(
        'Not Found',
        'No biometric records found. Please ensure that you have enrolled biometrics in your device settings.',
      );
    }

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
      cancelLabel: 'Cancel',
    });

    if (!userSavedEmail) {
      return Alert.alert('Login Required', 'Please log in at least once to enable biometric authentication.');
    }

    if (biometricAuth.success) {
      authLogin({ email: SecureStore.getItem('user-email') || '', type: AuthTypes.BIOMETRIC });
    }
  };

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricAvailable(compatible);
    })();
  }, []);

  return (
    <TouchableWithoutFeedback>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          enableOnAndroid
          enableAutomaticScroll
          extraScrollHeight={Platform.select({ ios: 80, android: 120 })}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={false}
          bounces={false}
          extraHeight={220}
          enableResetScrollToCoords
          resetScrollToCoords={{ x: 0, y: 0 }}
        >
          <ScrollView
            style={{ paddingHorizontal: 16 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
          >
            <View style={{ flex: 0.5, paddingVertical: 18, alignItems: 'center' }}>
              <Image style={{ width: 126, height: 56 }} source={require('../../../assets/logo.png')} />
            </View>
            <View style={{ marginTop: 20, marginBottom: 20 }}>
              <Typography weight="bolder" size="xl" align="center">
                Log in
              </Typography>
            </View>

            <LoginForm onSubmit={(data) => authLogin({ ...data, type: AuthTypes.NORMAL })} isPending={isPending} />

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, paddingHorizontal: 8 }}
            >
              <View style={styles.wrapper}>
                <Checkbox
                  style={styles.checkbox}
                  value={isChecked}
                  onValueChange={setIsChecked}
                  color={isChecked ? theme.colors.textSecondary : undefined}
                />
                <Typography size="sm">Remember Me</Typography>
              </View>

              {isAndroid ? (
                <Pressable onPress={handleBiometric} style={styles.wrapper}>
                  <SvgXml xml={fingerprint} height={22} width={22} style={styles.biometric} />
                  <Typography size="sm">Use Biometrics</Typography>
                </Pressable>
              ) : (
                <Pressable onPress={handleBiometric} style={styles.wrapper}>
                  <SvgXml xml={faceId} height={22} width={22} style={styles.biometric} />
                  <Typography size="sm">Use Face ID</Typography>
                </Pressable>
              )}
            </View>

            <Pressable onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPassword}>
              <Typography align="center" color="secondary">
                Forgot Password
              </Typography>
            </Pressable>

            <View style={styles.line} />

            <View style={{ display: 'flex', gap: 10, marginTop: 45, marginBottom: 60 }}>
              <TouchableOpacity style={styles.socialButton} activeOpacity={0.8} onPress={signInWithGoogle}>
                <View style={styles.iconContainer}>
                  <SvgXml xml={google} />
                </View>
                <Text style={styles.buttonText}>Continue with Google</Text>
              </TouchableOpacity>

              {!isAndroid && (
                <TouchableOpacity style={styles.socialButton} activeOpacity={0.8} onPress={signInWithApple}>
                  <View style={styles.iconContainer}>
                    <SvgXml xml={apple} />
                  </View>
                  <Text style={styles.buttonText}>Continue with Apple</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={{ marginTop: 20 }}>
              <Typography align="center">Don't have an account yet?</Typography>

              <Pressable onPress={() => navigation.navigate('Welcome')}>
                <Typography align="center" color="secondary" style={{ marginTop: 3 }}>
                  Create an account
                </Typography>
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
  scrollContainer: {
    flexGrow: 1,
    width: Metrics.screenWidth,
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
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 8,
    height: 18,
    width: 18,
    borderWidth: 1,
    borderRadius: 4,
  },
  biometric: {
    marginRight: 4,
  },
});
