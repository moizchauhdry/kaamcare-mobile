import { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, SafeAreaView, Pressable } from 'react-native';

import { theme } from 'config/Theme';
import { Typography } from 'components/UI/Typography/Typography';
import { SignupForm } from 'components/Forms/SignupForm';

import TermsCheckbox from './modules/TermsCheckbox';

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

export const SignUpScreen = () => {
  const [isChecked, setIsChecked] = useState(false);

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
            Create your account
          </Typography>
        </View>

        <SignupForm
          initialValues={undefined}
          //   onSubmit={(values) => mutate(parseEmergencyContactFormToApiData(values))}
          onSubmit={() => {}}
          //   isPending={isPending}
          isPending={false}
        />

        <View style={styles.line} />

        <View style={styles.haveAccount}>
          <Typography align="center">Already have an account?</Typography>
          <Pressable onPress={() => {}} style={{ marginLeft: 5 }}>
            <Typography align="center" color="secondary">
              Log In
            </Typography>
          </Pressable>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TermsCheckbox checked={isChecked} onToggle={setIsChecked} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
