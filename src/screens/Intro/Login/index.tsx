import { View, ScrollView, StyleSheet, Image, SafeAreaView, Pressable, TouchableOpacity, Text } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import { theme } from 'config/Theme';
import apple from 'assets/icons/apple.svg';
import google from 'assets/icons/google.svg';
import { LoginForm } from 'components/Forms/LoginForm';
import { Typography } from 'components/UI/Typography/Typography';
import type { AuthNavigationParamsList } from 'components/Navigation/AuthNavigation';

export const LoginScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AuthNavigationParamsList>>();

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

        <LoginForm initialValues={undefined} onSubmit={() => {}} isPending={false} />

        <Pressable onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotPassword}>
          <Typography align="center" color="secondary">
            Forgot Password
          </Typography>
        </Pressable>

        <View style={styles.line} />

        <View style={{ display: 'flex', gap: 10, marginTop: 45, marginBottom: 60 }}>
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
});
