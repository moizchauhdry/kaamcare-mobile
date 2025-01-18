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
import { Typography } from 'components/UI/Typography/Typography';
import { SignupPasswordForm } from 'components/Forms/PasswordForm';
import type { AuthNavigationParamsList } from 'components/Navigation/AuthNavigation';

import { useSignupStore } from './store';
import { useAuthPassword } from './data/auth-password';
import { TermsCheckbox } from './modules/TermsCheckbox';
import { HeaderCounter } from './modules/HeaderCounter';

export const PasswordScreen = () => {
  const { mutate: authPassword, isPending } = useAuthPassword();
  const isTermsChecked = useSignupStore((state) => state.isTermsChecked);
  const setIsTermsChecked = useSignupStore((state) => state.setIsTermsChecked);
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
          extraHeight={260}
          enableResetScrollToCoords
          resetScrollToCoords={{ x: 0, y: 0 }}
        >
          <ScrollView style={{ paddingHorizontal: 16 }} showsVerticalScrollIndicator={false}>
            <View style={{ flex: 0.5, paddingVertical: 18, alignItems: 'center' }}>
              <Image style={{ width: 126, height: 56 }} source={require('../../../assets/logo.png')} />
            </View>
            <HeaderCounter pageCounter="3" />

            <View style={{ marginBottom: 24 }}>
              <SignupPasswordForm onSubmit={authPassword} isPending={isPending} isTermsAccepted={isTermsChecked} />
            </View>

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
