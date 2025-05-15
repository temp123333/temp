import React, { useState } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Animated } from 'react-native';
import { colors, borderRadius } from '@/constants/theme';
import { ImageProps } from 'expo-image';

interface ImageWithLoadingProps extends Omit<ImageProps, 'source'> {
  source: { uri: string } | number;
  width: number;
  height: number;
}

export default function ImageWithLoading({ source, style, width, height, ...props }: ImageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const opacity = new Animated.Value(0);

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
          {...props}
        />
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