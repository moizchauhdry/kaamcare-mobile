import type { ListRenderItem } from 'react-native';
import { FlatList, View } from 'react-native';

import type { DataCardProps } from './DataCard';
import { DataCard } from './DataCard';
import { Typography } from '../Typography/Typography';

const DISPLAY_ELEMENT_COUNT = 5;

type HomeDataCardProps<T> = Omit<DataCardProps<T>, 'dataProps'> & {
  renderItem: ListRenderItem<T> | null | undefined;
  dataProps?: {
    isLoading: boolean;
    data: T[];
    isError: boolean;
  };
};

export const HomeDataCard = <T,>({ renderItem, ...props }: HomeDataCardProps<T>) => {
  const { dataProps } = props;
  const data = dataProps?.data ?? [];
  const properData = Array.isArray(data) ? data.slice(0, DISPLAY_ELEMENT_COUNT) : [];

  const renderFooterComponent = () => {
    const calculateMore = data.length - DISPLAY_ELEMENT_COUNT;

    if (data.length <= DISPLAY_ELEMENT_COUNT) {
      return null;
    }

    return (
      <View style={{ paddingTop: 12 }}>
        <Typography size="sm" color="secondary" weight="regular">
          {`+${calculateMore} more`}
        </Typography>
      </View>
    );
  };

  const renderContent = () => (
    <View>
      <FlatList
        scrollEnabled={false}
        data={properData}
        renderItem={renderItem}
        ListFooterComponent={renderFooterComponent}
      />
    </View>
  );

  return <DataCard {...props}>{renderContent()}</DataCard>;
};
