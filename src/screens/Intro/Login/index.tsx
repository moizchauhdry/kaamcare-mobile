import { View, ScrollView, StyleSheet, Image, SafeAreaView, Pressable } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { theme } from 'config/Theme';
import { Typography } from 'components/UI/Typography/Typography';
import { LoginForm } from 'components/Forms/LoginForm';
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

        <LoginForm
          initialValues={undefined}
          //   onSubmit={(values) => mutate(parseEmergencyContactFormToApiData(values))}
          onSubmit={() => {}}
          //   isPending={isPending}
          isPending={false}
        />

        <Pressable onPress={() => {}} style={styles.forgotPassword}>
          <Typography align="center" color="secondary">
            Forgot Password
          </Typography>
        </Pressable>

        <View style={styles.line} />

        <View style={{ marginTop: 20 }}>
          <Typography align="center">Don't have an account yet?</Typography>

          <Pressable onPress={() => navigation.navigate('SignUp')}>
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
});
