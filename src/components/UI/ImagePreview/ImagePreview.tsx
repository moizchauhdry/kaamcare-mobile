import { FlatList, Image, View } from 'react-native';
import { useRef } from 'react';

import { ITEM_LENGTH, styles } from './ImagePreview.styles';

interface ImageCarouselItem {
  id: string;
  uri: string;
}

export type ImagePreviewProps = {
  data: (ImageCarouselItem | null)[];
  initialImage?: string | null;
};

export const ImagePreview = ({ data, initialImage }: ImagePreviewProps) => {
  const listRef = useRef<FlatList | null>(null);
  const index = data.findIndex((elem) => elem?.id === initialImage || elem?.uri === initialImage);

  return (
    <View
      style={styles.container}
      onLayout={index !== -1 ? () => listRef.current?.scrollToIndex({ index }) : undefined}
    >
      <FlatList
        ref={listRef}
        data={data}
        snapToAlignment="center"
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        decelerationRate="normal"
        keyExtractor={(item) => item.id ?? item.uri}
        getItemLayout={(_, itemIndex) => ({ length: ITEM_LENGTH, offset: ITEM_LENGTH * itemIndex, index: itemIndex })}
        renderItem={({ item }) =>
          item ? (
            <View style={{ width: ITEM_LENGTH }}>
              <View style={styles.itemContent}>
                <Image source={{ uri: item.uri }} style={styles.itemImage} />
              </View>
            </View>
          ) : null
        }
      />
    </View>
  );
};
