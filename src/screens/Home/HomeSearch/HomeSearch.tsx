import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import type { NativeStackScreenProps } from 'react-native-screens/native-stack';

import { SearchInput } from '../../../components/UI/Inputs/SearchInput/SearchInput';
import { Typography } from '../../../components/UI/Typography/Typography';
import { theme } from '../../../config/Theme';
import type { HomeNavigatorParamsList } from '../../../components/Navigation/LoggednNavigation';
import { homeSearchData } from '../../../constants/data/homeDataScreen';
import { HomeSearchCard } from '../../../components/DataDisplay/Home/HomeSearchCard/HomeSearchCard';
import { useDebounceValue } from '../../../hooks/useDebounceValue';
import { useSearchFilteredData } from '../../../hooks/useSearchFilteredData';

type HomeSearchProps = NativeStackScreenProps<HomeNavigatorParamsList, 'HomeSearch'>;

export const HomeSearch = ({ navigation }: HomeSearchProps) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedValue = useDebounceValue(searchValue, 1000);
  const filteredData = useSearchFilteredData<{ name: string; screenName: string; mainScreenName?: string }>(
    debouncedValue,
    homeSearchData,
    'name',
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ paddingHorizontal: 16, gap: 16 }}>
        <View
          style={{ width: '100%', flexDirection: 'row', gap: 8, justifyContent: 'space-between', alignItems: 'center' }}
        >
          <View style={{ flex: 1 }}>
            <SearchInput placeholder="Search" value={searchValue} onChangeText={(value) => setSearchValue(value)} />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <Typography color="secondary">Cancel</Typography>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            contentContainerStyle={{ gap: 8, paddingBottom: 112 }}
            showsVerticalScrollIndicator={false}
            data={filteredData}
            renderItem={({ item }) => (
              <HomeSearchCard
                searchValue={debouncedValue}
                name={item.name}
                screenName={item.screenName}
                mainScreenName={item.mainScreenName}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
