import React, { useRef } from 'react';
import { View, StyleSheet, Pressable, Animated } from 'react-native';
import { colors, shadows, borderRadius } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
}

// Create animated versions outside the component (better performance)
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedView = Animated.createAnimatedComponent(View);

export default function Card({ children, onPress, style }: CardProps) {
  // useRef keeps the Animated.Value stable across renders
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!onPress) return;
    Animated.spring(scale, {
      toValue: 0.98,      // scale down a bit when pressed
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };

  const handlePressOut = () => {
    if (!onPress) return;
    Animated.spring(scale, {
      toValue: 1,         // scale back to normal
      useNativeDriver: true,
      speed: 50,
      bounciness: 10,
    }).start();
  };

  // Use animated Pressable if onPress exists, else animated View
  const Container = onPress ? AnimatedPressable : AnimatedView;

  return (
    <Container
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.container,
        { transform: [{ scale }] }, // apply scale animation
        style,
      ]}
      // Disable touch when no onPress, to behave like a View
      pointerEvents={onPress ? 'auto' : 'none'}
    >
      {children}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.lg,
    padding: 16,
    ...shadows.md,
  },
});
