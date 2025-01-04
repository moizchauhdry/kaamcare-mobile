import { View, ScrollView, StyleSheet, Image, SafeAreaView } from 'react-native';

import { theme } from 'config/Theme';
import { Typography } from 'components/UI/Typography/Typography';
import { LoginForm } from 'components/Forms/LoginForm';

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
});

export const LoginScreen = () => {
  const dummy = '';

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
          <Typography weight="bolder" size="xl" style={{ textAlign: 'center' }}>
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
      </ScrollView>
    </SafeAreaView>
  );
};
