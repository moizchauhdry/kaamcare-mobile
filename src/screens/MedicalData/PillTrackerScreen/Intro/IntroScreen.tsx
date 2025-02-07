import { useRef, useState } from 'react';
import type { ViewToken } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import type { AddMedicalDataNavigationParamsList } from 'components/Navigation/AddMedicalDataNavigation';
import { theme } from 'config/Theme';
import { IntroItem } from 'components/DataDisplay/IntroItem/IntroItem';
import { PaginationDotted } from 'components/DataDisplay/Pagination/PaginationDotted';
import { pillTrackerData } from 'constants/data/introScreen';
import { Button } from 'components/UI/Button/Button';

export const IntroScreen = () => {
  const [active, setActive] = useState('1');
  const listRef = useRef<FlatList | null>(null);
  const navigation = useNavigation<StackNavigationProp<AddMedicalDataNavigationParamsList>>();

  const handleItemChange = (items: ViewToken[]) => {
    if (items.length === 1) {
      setActive(items[0]?.item.id);
    }
  };

  const handlePaginationDotPress = (index: number) => {
    if (index < pillTrackerData.length) {
      listRef.current?.scrollToIndex({ index });
    } else if (index === pillTrackerData.length) {
      navigation.navigate('PillTrackerHome');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ alignContent: 'center' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ height: '100%' }}
      >
        <View style={{ flex: 0.5, paddingVertical: 18, alignItems: 'center' }}>
          <Image style={{ width: 126, height: 56 }} source={require('../../../../assets/logo.png')} />
        </View>
        <View style={{ flex: 4, paddingHorizontal: 16 }}>
          <View style={{ flex: 4, alignItems: 'center' }}>
            <FlatList
              ref={listRef}
              style={{ flex: 4 }}
              horizontal
              snapToAlignment="center"
              data={pillTrackerData}
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
          <PaginationDotted onDotPress={handlePaginationDotPress} size={pillTrackerData.length} active={+active} />
        </View>
        <View
          style={{ marginVertical: 16, gap: 8, paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center' }}
        >
          <Button weight="semiBold" onPress={() => handlePaginationDotPress(Number(active))}>
            Next
          </Button>
          <Button weight="semiBold" variant="secondary" onPress={() => navigation.navigate('PillTrackerHome')}>
            Skip Tour
          </Button>
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
  link: {
    color: theme.colors.textSecondary,
  },
});
