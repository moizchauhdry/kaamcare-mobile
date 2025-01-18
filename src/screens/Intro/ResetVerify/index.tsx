import {
  View,
  Image,
  Platform,
  Keyboard,
  Pressable,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { theme } from 'config/Theme';
import userCircle from 'assets/icons/user-circle.svg';
import chevronLeft from 'assets/icons/chevron-left.svg';
import { Typography } from 'components/UI/Typography/Typography';
import { ResetVerifyForm } from 'components/Forms/ResetVerifyForm';
import type { AuthNavigationParamsList } from 'components/Navigation/AuthNavigation';

import { useSignupStore } from '../Signup/store';
import { useAuthVerifyOtp } from '../Signup/data/auth-verifyOtp';

export const ResetVerifyScreen = () => {
  const userEmail = useSignupStore((store) => store.userEmail);
  const { mutate: authVerifyOtp, isPending } = useAuthVerifyOtp('resetPassword');
  const navigation = useNavigation<StackNavigationProp<AuthNavigationParamsList>>();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          enableOnAndroid
          enableAutomaticScroll
          extraScrollHeight={Platform.select({ ios: 80, android: 120 })}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
          bounces={false}
          extraHeight={50}
          enableResetScrollToCoords
          resetScrollToCoords={{ x: 0, y: 0 }}
        >
          <View style={styles.content}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.chevronWrapper}>
                <SvgXml xml={chevronLeft} width={28} height={28} />
              </TouchableOpacity>
              <Image style={styles.logo} source={require('../../../assets/logo.png')} />
              <View style={styles.placeholder} />
            </View>

            <View style={styles.titleWrapper}>
              <Pressable onPress={() => navigation.navigate('LogIn')}>
                <SvgXml xml={userCircle} width={42} height={42} />
              </Pressable>
              <Typography weight="bolder" size="xl" align="center" style={styles.title}>
                Password Recovery
              </Typography>
              <Typography size="md" align="center" style={styles.subtitle}>
                Please enter the verification code sent to your email to reset your password.
              </Typography>
            </View>

            <ResetVerifyForm onSubmit={(data) => authVerifyOtp({ ...data, email: userEmail })} isPending={isPending} />
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 18,
  },
  chevronWrapper: {
    padding: 8,
  },
  logo: {
    width: 126,
    height: 56,
    resizeMode: 'contain',
  },
  placeholder: {
    width: 28,
  },
  titleWrapper: {
    marginTop: 40,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    marginTop: 14,
    marginBottom: 10,
  },
  subtitle: {
    color: theme.colors.textPrimary,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
