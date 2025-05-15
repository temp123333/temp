import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { router } from 'expo-router';
import { MapPin, Star, Clock, Trash2 } from 'lucide-react-native';
import { Destination } from '@/types';
import { colors, spacing, typography, borderRadius, shadows } from '@/constants/theme';

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
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    router.push(`/destination/${destination.id}`);
  };

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 0.98,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handleRemove = (e: any) => {
    e.stopPropagation();
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => onRemove?.());
  };

  return (
    <Animated.View 
      style={[
        styles.animatedContainer, 
        { 
          transform: [{ scale }],
          opacity 
        }
      ]}
    >
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={styles.container}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {destination.name}
            </Text>
            {showRemoveButton && onRemove && (
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={handleRemove}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Trash2 size={16} color={colors.error.dark} />
              </TouchableOpacity>
            )}
          </View>

          {/* Location */}
          <View style={styles.locationRow}>
            <MapPin size={14} color={colors.gray[500]} />
            <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">
              {destination.region}, Nepal
            </Text>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={[styles.stat, styles.ratingStat]}>
              <Star size={14} color={colors.warning.main} fill={colors.warning.main} />
              <Text style={styles.statText}>{destination.rating}</Text>
            </View>
            <View style={[styles.stat, styles.durationStat]}>
              <Clock size={14} color={colors.primary[600]} />
              <Text style={styles.statText}>{destination.duration}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    marginBottom: spacing.lg,
  },
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.md,
    borderWidth: 1,
    borderColor: colors.gray[100],
    
  },
  content: {
    flexDirection: 'column',
    gap: spacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  marginBottom: spacing.xxs,
  gap: spacing.sm,
  flex: 1,
  width: '100%',
  overflow: 'hidden',
  },
  title: {
    ...typography.subtitle1,
    color: colors.gray[900],
    fontWeight: '700',
    fontSize: 20,
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
   
  },
  location: {

    ...typography.caption,
    color: colors.gray[600],
    marginLeft: spacing.xs,
    flexShrink: 1,
    marginTop: 12,
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.md,
  },
  ratingStat: {
    backgroundColor: colors.warning.light,
  },
  durationStat: {
    backgroundColor: colors.primary[50],
  },
  statText: {
    ...typography.caption,
    color: colors.gray[800],
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
  removeButton: {
    padding: spacing.xxs,
    borderRadius: borderRadius.full,
    backgroundColor: colors.error.light + '20',
  },
});