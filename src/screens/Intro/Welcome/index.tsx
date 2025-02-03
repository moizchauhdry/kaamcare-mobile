import { SvgXml } from 'react-native-svg';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Alert,
  Dimensions,
  Pressable,
} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import type { StackNavigationProp } from '@react-navigation/stack';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useNavigation } from '@react-navigation/native';

import { theme } from 'config/Theme';
import apple from 'assets/icons/apple.svg';
import { isAndroid } from 'config/Metrics';
import google from 'assets/icons/google.svg';
import { AuthTypes } from 'constants/enums';
import { Typography } from 'components/UI/Typography/Typography';
import emailCircle from 'assets/icons/user-email-circle.svg';
import type { AuthNavigationParamsList } from 'components/Navigation/AuthNavigation';

import { useAuthSignup } from '../Signup/data/auth-signup';

export const WelcomeScreen = () => {
  const { mutate: authSignup } = useAuthSignup('socialLogin');
  const imageWidth = Dimensions.get('window').width - 50;
  const navigation = useNavigation<StackNavigationProp<AuthNavigationParamsList>>();

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      if (user.data?.idToken) {
        authSignup({
          email: user.data?.user.email,
          type: AuthTypes.GOOGLE,
          token: user.data?.idToken,
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
        authSignup({
          email: response.email,
          type: AuthTypes.APPLE,
          token: response.identityToken ?? '',
        });
      } else {
        Alert.prompt('Email Required', 'We need your email address to continue. Please provide it below.', (email) => {
          if (email) {
            authSignup({
              email,
              type: AuthTypes.APPLE,
              token: response.identityToken ?? '',
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

        <View style={{ flex: 4, alignItems: 'center', marginVertical: 20 }}>
          <Typography size="lg" weight="semiBold" align="center" style={{ width: '100%', fontSize: 24 }}>
            Create a new account
          </Typography>

          <View style={{ flex: 1, gap: 10, marginTop: 45, width: '100%' }}>
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

            <Typography size="md" weight="regular" align="center" style={{ margin: 15 }}>
              OR
            </Typography>

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

            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <View style={{ paddingTop: 20, paddingHorizontal: 20 }}>
                <Typography style={{ textAlign: 'center' }}>
                  By signing up, you agree to the{' '}
                  <Typography style={styles.link} onPress={() => {}}>
                    Terms of Service
                  </Typography>{' '}
                  and{' '}
                  <Typography style={styles.link} onPress={() => {}}>
                    Privacy Policy
                  </Typography>
                </Typography>
              </View>

              <View style={styles.haveAccount}>
                <Typography align="center">Already have an account?</Typography>
                <Pressable onPress={() => navigation.navigate('LogIn')} style={{ marginLeft: 5 }}>
                  <Typography align="center" color="secondary">
                    Log In
                  </Typography>
                </Pressable>
              </View>
            </View>
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
    flexShrink: 1,
  },
  haveAccount: {
    marginVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  link: {
    color: theme.colors.textSecondary,
  },
});
