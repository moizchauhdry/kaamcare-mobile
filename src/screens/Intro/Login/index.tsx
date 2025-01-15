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
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Checkbox } from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as AppleAuthentication from 'expo-apple-authentication';
import type { StackNavigationProp } from '@react-navigation/stack';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { isAndroid } from 'config/Metrics';
import { theme } from 'config/Theme';
import apple from 'assets/icons/apple.svg';
import google from 'assets/icons/google.svg';
import { useAuth } from 'context/AuthContext';
import fingerprint from 'assets/icons/fingerprint.svg';
import { LoginForm } from 'components/Forms/LoginForm';
import { Typography } from 'components/UI/Typography/Typography';
import type { AuthNavigationParamsList } from 'components/Navigation/AuthNavigation';

export const LoginScreen = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState<boolean>(false);
  const navigation = useNavigation<StackNavigationProp<AuthNavigationParamsList>>();

  const { handleLogin } = useAuth();

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      if (user.data?.idToken) {
        handleLogin();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const signInWithApple = async () => {
    try {
      const user = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      console.log('user', user);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleBiometric = async () => {
    if (!isBiometricAvailable) {
      return Alert.alert('Biometrics are not available on this device.');
    }

    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      return Alert.alert(
        'No biometric records found. Please ensure that you have enrolled biometrics in your device settings.',
      );
    }

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
      cancelLabel: 'Cancel',
    });

    if (biometricAuth.success) {
      console.log('Logged In');
    }
  };

  const logout = () => {
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricAvailable(compatible);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ alignContent: 'center', width: '100%', paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 0.5, paddingVertical: 18, alignItems: 'center' }}>
          <Image style={{ width: 126, height: 56 }} source={require('../../../assets/logo.png')} />
        </View>
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Typography weight="bolder" size="xl" align="center">
            Log in
          </Typography>
        </View>

        <LoginForm initialValues={undefined} onSubmit={handleLogin} isPending={false} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, paddingHorizontal: 8 }}>
          <View style={styles.wrapper}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? theme.colors.textSecondary : undefined}
            />
            <Typography size="sm">Remember Me</Typography>
          </View>

          <Pressable onPress={handleBiometric} style={styles.wrapper}>
            <SvgXml xml={fingerprint} height={22} width={22} style={styles.biometric} />
            <Typography size="sm">Use Biometrics</Typography>
          </Pressable>
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
