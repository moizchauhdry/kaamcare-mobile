import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export const ITEM_LENGTH = width;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: ITEM_LENGTH,
  },
  itemContent: {
    width: ITEM_LENGTH,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  itemImage: {
    width: ITEM_LENGTH,
    height: ITEM_LENGTH,
    resizeMode: 'cover',
  },
});
