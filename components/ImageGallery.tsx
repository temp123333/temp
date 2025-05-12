import React, { useState, useRef } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width - 32;
const ITEM_HEIGHT = 200;

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handlePress = (index: number) => {
    setActiveIndex(index);
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  };

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / ITEM_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        keyExtractor={(_, index) => index.toString()}
        onScroll={handleScroll}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item }} style={styles.image} />
          </View>
        )}
      />
      
      <View style={styles.thumbnailsContainer}>
        <FlatList
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => `thumb-${index}`}
          renderItem={({ item, index }) => (
            <TouchableOpacity 
              onPress={() => handlePress(index)}
              style={[
                styles.thumbnail, 
                activeIndex === index && styles.activeThumbnail
              ]}
            >
              <Image source={{ uri: item }} style={styles.thumbnailImage} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  imageContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  thumbnailsContainer: {
    marginTop: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeThumbnail: {
    borderColor: '#1E40AF',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
});