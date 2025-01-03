import type { ViewToken } from 'react-native';
import { Dimensions, FlatList, View } from 'react-native';
import { useRef, useState } from 'react';

import { PaginationDotted } from '../../Pagination/PaginationDotted';
import type { SaturationLogs } from '../../../../model/api/medicalLogs/Saturation';
import type { BloodSugarLogs } from '../../../../model/api/medicalLogs/BloodSugar';
import type { BloodPressureLogs } from '../../../../model/api/medicalLogs/BloodPressure';
import type { WeightLogs } from '../../../../model/api/medicalLogs/Weight';
import type { HeightLogs } from '../../../../model/api/medicalLogs/Height';
import { theme } from '../../../../config/Theme';
import type { AddMedicalDataNavigationParamsList } from '../../../Navigation/AddMedicalDataNavigation';
import { MedicalLogsCarouselCard } from './MedicalLogsCarouselCard';

const { width } = Dimensions.get('window');

type CarouselChartType = 'BloodSugar' | 'BloodPressure' | 'Weight' | 'Height' | 'Saturation';

export type MedicalLogsCarouselData = {
  type: CarouselChartType;
  title: string;
  logs?: SaturationLogs | WeightLogs | HeightLogs | BloodPressureLogs | BloodSugarLogs;
  chart?: string;
  screen: keyof AddMedicalDataNavigationParamsList;
};

type MedicalLogsCarouselProps = {
  data: MedicalLogsCarouselData[];
};

export const MedicalLogsCarousel = ({ data }: MedicalLogsCarouselProps) => {
  const [activeChart, setActiveChart] = useState(1);
  const listRef = useRef<FlatList | null>(null);
  const extractKey = (item: MedicalLogsCarouselData) => item.type + item.chart;
  const handleItemChange = (items: ViewToken[]) => {
    if (items.length === 1 && items[0]?.index !== undefined && items[0]?.index !== null) {
      setActiveChart(items[0].index + 1);
    }
  };
  const handlePaginationDotPress = (index: number) => {
    listRef.current?.scrollToIndex({ index });
    const newIndex = index + 1;

    setActiveChart(newIndex);
  };

  const getItemLayout = (index: number) => ({
    length: width - 32,
    offset: (width - 32 + 8) * index,
    index,
  });

  return (
    <View style={{ gap: 8 }}>
      <FlatList
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
        ref={listRef}
        snapToAlignment="start"
        snapToInterval={width - 32 + 8}
        decelerationRate={0}
        data={data}
        renderItem={(item) => <MedicalLogsCarouselCard item={item.item} />}
        onViewableItemsChanged={({ viewableItems }) => handleItemChange(viewableItems)}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={extractKey}
        getItemLayout={(_, index) => getItemLayout(index)}
      />
      <View>
        <PaginationDotted
          activeStyle={{ backgroundColor: theme.colors.blue }}
          size={data.length}
          active={activeChart}
          onDotPress={handlePaginationDotPress}
        />
      </View>
    </View>
  );
};
