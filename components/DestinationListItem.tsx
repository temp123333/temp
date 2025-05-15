import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { router } from 'expo-router';
import { MapPin, Star, Clock, Trash2 } from 'lucide-react-native';
import { Destination } from '@/types';
import { colors, spacing, typography, borderRadius, shadows } from '@/constants/theme';
import ImageWithLoading from './ImageWithLoading';

interface DestinationListItemProps {
  destination: Destination;
  showRemoveButton?: boolean;
  onRemove?: () => void;
}

export default function DestinationListItem({ 
  destination, 
  showRemoveButton = false,
  onRemove
}: DestinationListItemProps) {
  const imageScale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(imageScale, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(imageScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const animatedScale = imageScale.interpolate({
    inputRange: [0, 1],
    outputRange: [1.05, 1],
  });

  const handlePress = () => {
    router.push(`/destination/${destination.id}`);
  };

  const AnimatedImageWithLoading = Animated.createAnimatedComponent(ImageWithLoading);

  return (
    <TouchableOpacity 
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.95}
      style={styles.container}
    >
      <View style={styles.imageContainer}>
        <AnimatedImageWithLoading
          source={{ uri: destination.images[0] }}
          width={120}
          height={140}
          style={[
            styles.image,
            {
              transform: [{ scale: animatedScale }],
            },
          ]}
        />
      </View>

      <View style={styles.content}>
        <View>
          <Text style={styles.title} numberOfLines={1}>{destination.name}</Text>
          <View style={styles.locationRow}>
            <MapPin size={14} color={colors.gray[500]} />
            <Text style={styles.location}>{destination.region}, Nepal</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Star size={14} color={colors.warning.main} />
              <Text style={styles.statText}>{destination.rating}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.stat}>
              <Clock size={14} color={colors.primary[600]} />
              <Text style={styles.statText}>{destination.duration}</Text>
            </View>
          </View>

          {showRemoveButton && onRemove && (
            <TouchableOpacity 
              style={styles.removeButton}
              onPress={(e) => {
                e.stopPropagation();
                onRemove();
              }}
            >
              <Trash2 size={20} color={colors.error.main} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.md,
  },
  imageContainer: {
    overflow: 'hidden',
  },
  image: {
    borderTopLeftRadius: borderRadius.xl,
    borderBottomLeftRadius: borderRadius.xl,
  },
  content: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  title: {
    ...typography.subtitle1,
    color: colors.gray[800],
    marginBottom: spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    ...typography.caption,
    color: colors.gray[500],
    marginLeft: spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  statText: {
    ...typography.caption,
    color: colors.gray[800],
    marginLeft: spacing.xs,
    fontWeight: '500',
  },
  statDivider: {
    width: spacing.sm,
  },
  removeButton: {
    padding: spacing.sm,
    backgroundColor: colors.error.light,
    borderRadius: borderRadius.full,
    marginLeft: spacing.sm,
  },
});