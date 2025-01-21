import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  Keyboard,
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { theme } from 'config/Theme';
import { AuthTypes } from 'constants/enums';
import { SignupForm } from 'components/Forms/SignupForm';
import { Typography } from 'components/UI/Typography/Typography';
import type { AuthNavigationParamsList } from 'components/Navigation/AuthNavigation';

import { useSignupStore } from './store';
import { useAuthSignup } from './data/auth-signup';
import { TermsCheckbox } from './modules/TermsCheckbox';
import { HeaderCounter } from './modules/HeaderCounter';

export const SignUpScreen = () => {
  const { mutate: authSignup, isPending } = useAuthSignup();
  const isTermsChecked = useSignupStore((state) => state.isTermsChecked);
  const setIsTermsChecked = useSignupStore((state) => state.setIsTermsChecked);

  const navigation = useNavigation<StackNavigationProp<AuthNavigationParamsList>>();

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
            <HeaderCounter pageCounter="1" />

            <SignupForm
              onSubmit={(data) => {
                Keyboard.dismiss();
                authSignup({ email: data.email, type: AuthTypes.NORMAL });
              }}
              isPending={isPending}
              isTermsAccepted={isTermsChecked}
            />

            <View style={styles.line} />

            <View style={styles.haveAccount}>
              <Typography align="center">Already have an account?</Typography>
              <Pressable onPress={() => navigation.navigate('LogIn')} style={{ marginLeft: 5 }}>
                <Typography align="center" color="secondary">
                  Log In
                </Typography>
              </Pressable>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <TermsCheckbox checked={isTermsChecked} onToggle={setIsTermsChecked} />
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
  },
  forgotPassword: {
    marginVertical: 20,
  },
  line: {
    height: 1,
    width: '100%',
    marginTop: 28,
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
