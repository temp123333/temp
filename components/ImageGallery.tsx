import React, { useState, useRef } from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StatusBar,
  Animated,
} from 'react-native';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width - 48;
const ITEM_HEIGHT = 220;

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);

  const handlePress = (index: number) => {
    setActiveIndex(index);
    setSelectedImage(images[index]);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / ITEM_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      {selectedImage && <StatusBar hidden={true} />}

      {/* Full Screen Modal */}
      <Modal visible={!!selectedImage} transparent={false} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setSelectedImage(null)}>
          <View style={styles.modalContainer}>
            <Image source={{ uri: selectedImage ?? '' }} style={styles.fullScreenImage} resizeMode="contain" />
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {!selectedImage && (
        <>
          <FlatList
            ref={flatListRef}
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
              <TouchableOpacity onPress={() => setSelectedImage(item)} activeOpacity={0.85}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
                </View>
              </TouchableOpacity>
            )}
          />

          {/* Thumbnails */}
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
        </>
      )}
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
});
