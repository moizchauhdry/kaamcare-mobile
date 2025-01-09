import { View, StyleSheet, Image, SafeAreaView, TouchableOpacity, Pressable } from 'react-native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';

import { theme } from 'config/Theme';
import userCircle from 'assets/icons/user-circle.svg';
import chevronLeft from 'assets/icons/chevron-left.svg';
import { Typography } from 'components/UI/Typography/Typography';
import type { AuthNavigationParamsList } from 'components/Navigation/AuthNavigation';
import { ForgotPasswordForm } from 'components/Forms/ForgotPasswordForm';

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AuthNavigationParamsList>>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ paddingHorizontal: 16, flex: 1 }}>
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
          <Typography weight="bolder" size="xl" align="center" style={{ marginTop: 14, marginBottom: 10 }}>
            Password Recovery
          </Typography>
          <Typography size="md" align="center" style={styles.subtitle}>
            Enter your email address that you used to register. We’ll send you an email with a link to reset your
            password.
          </Typography>
        </View>

        <ForgotPasswordForm
          initialValues={undefined}
          //   onSubmit={(values) => mutate(parseEmergencyContactFormToApiData(values))}
          onSubmit={() => navigation.navigate('ResetPassword')}
          //   isPending={isPending}
          isPending={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
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
  subtitle: {
    color: theme.colors.textPrimary,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
