import type { ViewToken } from 'react-native';
import { FlatList, View, ScrollView, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useRef, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';

import { data } from 'constants/data/introScreen';

import { IntroItem } from '../../components/DataDisplay/IntroItem/IntroItem';
import { Button } from '../../components/UI/Button/Button';
import { PaginationDotted } from '../../components/DataDisplay/Pagination/PaginationDotted';
import { theme } from '../../config/Theme';
import { useAuth } from '../../context/AuthContext';

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

WebBrowser.maybeCompleteAuthSession();

export const Intro = () => {
  const [active, setActive] = useState('1');
  const listRef = useRef<FlatList | null>(null);
  const { handleRegister, handleLogin } = useAuth();

  const handleItemChange = (items: ViewToken[]) => {
    if (items.length === 1) {
      setActive(items[0]?.item.id);
    }
  };

  const handlePaginationDotPress = (index: number) => {
    listRef.current?.scrollToIndex({ index });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ alignContent: 'center' }} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 0.5, paddingVertical: 18, alignItems: 'center' }}>
          <Image style={{ width: 126, height: 56 }} source={require('../../assets/logo.png')} />
        </View>
        <View style={{ flex: 4, paddingHorizontal: 16 }}>
          <View style={{ flex: 4, alignItems: 'center' }}>
            <FlatList
              ref={listRef}
              style={{ flex: 4 }}
              horizontal
              snapToAlignment="center"
              data={data}
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              decelerationRate="fast"
              keyExtractor={(item) => item.id}
              onViewableItemsChanged={({ viewableItems }) => handleItemChange(viewableItems)}
              renderItem={({ item }) => (
                <IntroItem
                  isActive={active === item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  media={item.media}
                />
              )}
            />
          </View>
          <PaginationDotted onDotPress={handlePaginationDotPress} size={data.length} active={+active} />
        </View>
        <View
          style={{ marginVertical: 16, gap: 8, paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center' }}
        >
          <Button onPress={handleRegister}>Create Account</Button>
          <Button onPress={handleLogin} variant="secondary">
            Log in
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
