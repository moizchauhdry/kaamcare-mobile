import { View, StyleSheet, Image, SafeAreaView, Dimensions } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { Typography } from 'components/UI/Typography/Typography';
import type { AuthNavigationParamsList } from 'components/Navigation/AuthNavigation';

import { Button } from '../../components/UI/Button/Button';
import { theme } from '../../config/Theme';

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
  link: {
    color: theme.colors.textSecondary,
  },
});

WebBrowser.maybeCompleteAuthSession();

export const AuthMethodScreen = () => {
  const navigation = useNavigation<StackNavigationProp<AuthNavigationParamsList>>();
  const imageWidth = Dimensions.get('window').width - 50;

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, alignContent: 'center', width: '100%' }}>
        <View style={{ flex: 0.5, paddingVertical: 18, alignItems: 'center' }}>
          <Image style={{ width: 126, height: 56 }} source={require('../../assets/logo.png')} />
        </View>
        <View style={{ flex: 4, paddingHorizontal: 16 }}>
          <View style={{ flex: 4, alignItems: 'center' }}>
            <Image
              style={{
                objectFit: 'contain',
                width: imageWidth,
                height: imageWidth,
              }}
              source={require('../../assets/images/Intro.png')}
            />
            <Typography size="lg" weight="semiBold" align="center" style={{ width: '100%', fontSize: 24 }}>
              Manage your medical records with ease
            </Typography>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            marginVertical: 50,
            gap: 8,
            paddingHorizontal: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button weight="semiBold" onPress={() => navigation.navigate('LogIn')}>
            Log In
          </Button>
          <Button weight="semiBold" variant="secondary" onPress={() => navigation.navigate('SignUp')}>
            Sign Up
          </Button>

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
        </View>
      </View>
    </SafeAreaView>
  );
};
