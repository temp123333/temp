import React, { useState, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { colors, borderRadius } from '@/constants/theme';
// import { Image } from 'expo-image';  // Uncomment if using expo-image

interface ImageWithLoadingProps {
  source: { uri: string } | number;
  width: number;
  height: number;
  style?: object;
}

export default function ImageWithLoading({ source, style, width, height }: ImageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const opacity = useRef(new Animated.Value(0)).current;

  const onLoad = () => {
    setIsLoading(false);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const onError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <View style={[styles.container, { width, height }]}>
      {isLoading && (
        <View style={[styles.loadingContainer, { width, height }]}>
          <ActivityIndicator size="small" color={colors.primary[600]} />
        </View>
      )}

      {hasError ? (
        <View style={[styles.errorContainer, { width, height }]}>
          <View style={styles.errorBackground} />
        </View>
      ) : (
        <Animated.Image
          source={source}
          style={[
            style,
            {
              width,
              height,
              opacity,
            },
          ]}
          onLoad={onLoad}
          onError={onError}
          resizeMode="cover"
        />
        // If you want to try expo-image for better caching:
        // <Image
        //   source={source}
        //   style={[style, { width, height, opacity }]}
        //   onLoad={onLoad}
        //   onError={onError}
        //   contentFit="cover"
        //   transition={300}
        // />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
  },
  errorContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray[200],
  },
  errorBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.gray[200],
  },
});
