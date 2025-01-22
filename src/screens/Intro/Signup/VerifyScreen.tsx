import { useEffect, useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { theme } from 'config/Theme';
import Metrics from 'config/Metrics';
import { Typography } from 'components/UI/Typography/Typography';
import { VerifyOtpForm } from 'components/Forms/VerifyOtpForm';
import type { AuthNavigationParamsList } from 'components/Navigation/AuthNavigation';

import { HeaderCounter } from './modules/HeaderCounter';
import { useAuthVerifyOtp } from './data/auth-verifyOtp';
import { useAuthResendOtp } from './data/auth-resendOtp';

export const VerifyScreen = () => {
  const { mutate: authVerifyOtp, isPending } = useAuthVerifyOtp();
  const { mutate: authResendOtp, isPending: isOtpPending } = useAuthResendOtp();
  const navigation = useNavigation<StackNavigationProp<AuthNavigationParamsList>>();

  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    let interval: any;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const handleResendOtp = () => {
    authResendOtp();
    setTimer(60);
    setIsTimerActive(true);
  };

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
          extraHeight={260}
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
            <HeaderCounter pageCounter="2" />

            <View style={{ marginBottom: 24 }}>
              <VerifyOtpForm
                onSubmit={(data) => {
                  Keyboard.dismiss();
                  authVerifyOtp(data);
                }}
                isPending={isPending}
              />
            </View>

            <View style={styles.line} />
            {isTimerActive ? (
              <View style={styles.sendCode}>
                <Typography
                  align="center"
                  style={{ color: isOtpPending ? theme.colors.gray200 : theme.colors.textSecondary }}
                >
                  Resend code in {timer}s
                </Typography>
              </View>
            ) : (
              <Pressable onPress={handleResendOtp} disabled={isOtpPending} style={styles.sendCode}>
                <Typography
                  align="center"
                  style={{ color: isOtpPending ? theme.colors.gray200 : theme.colors.textSecondary }}
                >
                  Send new code
                </Typography>
              </Pressable>
            )}
            <View style={styles.line} />

            {/* <View style={styles.haveAccount}>
              <Typography align="center">Already have an account?</Typography>
              <Pressable onPress={() => navigation.navigate('LogIn')} style={{ marginLeft: 5 }}>
                <Typography align="center" color="secondary">
                  Log In
                </Typography>
              </Pressable>
            </View> */}
          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
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
  sendCode: {
    marginVertical: 20,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: theme.colors.backgroundDark,
  },
  haveAccount: {
    marginVertical: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
