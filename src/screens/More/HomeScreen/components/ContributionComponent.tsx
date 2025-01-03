import { Dimensions, Image, Linking, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const ContributionComponent = () => {
  const paymentUrl = process.env.EXPO_PUBLIC_STRIPE_PAYMENT_URL;
  const handleContributionPage = () => {
    Linking.openURL(`${paymentUrl}`);
  };
  const imageWidth = Dimensions.get('window').width - 32;

  return (
    <TouchableOpacity onPress={handleContributionPage}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{
            width: imageWidth,
            height: imageWidth / 5,
          }}
          source={require('../../../../assets/images/Token.png')}
        />
      </View>
    </TouchableOpacity>
  );
};
