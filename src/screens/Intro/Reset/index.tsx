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
import type { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { theme } from 'config/Theme';
import userCircle from 'assets/icons/user-circle.svg';
import chevronLeft from 'assets/icons/chevron-left.svg';
import { Typography } from 'components/UI/Typography/Typography';
import type { AuthNavigationParamsList } from 'components/Navigation/AuthNavigation';
import { ResetPasswordForm } from 'components/Forms/ResetPasswordForm';

export const ResetPasswordScreen = () => {
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
          extraHeight={150}
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
              <Typography weight="bolder" size="xl" align="center" style={{ marginTop: 14, marginBottom: 10 }}>
                Password Recovery
              </Typography>
              <Typography size="md" align="center" style={styles.subtitle}>
                The market places the target of the free weekend market. He will be born.
              </Typography>
            </View>

            <ResetPasswordForm
              initialValues={undefined}
              //   onSubmit={(values) => mutate(parseEmergencyContactFormToApiData(values))}
              onSubmit={() => navigation.navigate('LogIn')}
              //   isPending={isPending}
              isPending={false}
            />
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
  subtitle: {
    color: theme.colors.textPrimary,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});
