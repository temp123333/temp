import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = width - 48;
const ITEM_HEIGHT = 220;

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const galleryRef = useRef<FlatList>(null);
  const modalRef = useRef<FlatList>(null);

  const handlePress = (index: number) => {
    setActiveIndex(index);
    setShowModal(true);
    setTimeout(() => {
      modalRef.current?.scrollToIndex({ index, animated: false });
    }, 0);
  };

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / ITEM_WIDTH);
    setActiveIndex(index);
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.container}>
      {showModal && <StatusBar hidden={true} />}

      {/* Full Screen Swipeable Modal */}
      <Modal visible={showModal} transparent={false} animationType="fade">
        <StatusBar hidden />
        <FlatList
          ref={modalRef}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => `full-${index}`}
          initialScrollIndex={activeIndex}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / width);
            setActiveIndex(index);
          }}
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.fullScreenItem}
              activeOpacity={1}
              onPress={() => setShowModal(false)}
            >
              <Image source={{ uri: item }} style={styles.fullScreenImage} resizeMode="contain" />
            </TouchableOpacity>
          )}
        />
      </Modal>

      {/* Horizontal Image Carousel */}
      <FlatList
        ref={galleryRef}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={ITEM_WIDTH + 16}
        decelerationRate="fast"
        keyExtractor={(_, index) => index.toString()}
        onScroll={handleScroll}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handlePress(index)} activeOpacity={0.85}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Thumbnail Selector */}
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
                activeIndex === index && styles.activeThumbnail,
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
    marginBottom: 24,
    backgroundColor: '#fff',
  },
  flatListContent: {
    paddingHorizontal: 16,
  },
  imageContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#f9fafb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  thumbnailsContainer: {
    marginTop: 12,
    paddingHorizontal: 16,
  },
  thumbnail: {
    width: 58,
    height: 58,
    borderRadius: 12,
    marginRight: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#e5e7eb',
  },
  activeThumbnail: {
    borderColor: '#2563EB',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  fullScreenItem: {
    width: width,
    height: height,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
});
