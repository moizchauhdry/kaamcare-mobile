import { Dimensions, Platform } from 'react-native';
import { getBottomSpace, getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';

const { width, height } = Dimensions.get('window');

export const isiPhoneX = (iPhoneX: number, regular: number) => (isIphoneX() ? iPhoneX : regular);
export const isiPhone = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const osVersion = Platform.Version?.toString();

const Metrics = {
  screenWidth: width,
  screenHeight: height,
  iPhoneXStatusBarHeight: (safe = false) => getStatusBarHeight(safe),
  iPhoneXBottomSpaceHeight: getBottomSpace(),
  safeMarginTop: (regular: number, safe = false) => {
    if (isIphoneX()) {
      // safe - whether you want for get safe area height or not
      // the height of the status bar: 44 for safe iPhoneX, 30 for unsafe iPhoneX,
      // 20 for other iOS devices and StatusBar.currentHeight for Android.
      return getStatusBarHeight(safe) + regular;
    }
    return regular;
  },
  safeMarginBottom: (regular: number): number => {
    if (isIphoneX()) {
      return getBottomSpace() + regular;
    }
    return regular;
  },
  footerHeight: isiPhoneX(90, 75),
  isiPhoneX,

  // Margins/Padding
  xxSmall: 2,
  xSmall: 4,
  small: 8,
  medium: 12,
  large: 16,
  xLarge: 20,
  xxLarge: 24,
  xxxLarge: 28,
  xxxxLarge: 32,
  xxxxxLarge: 40,
};

export default Metrics;
