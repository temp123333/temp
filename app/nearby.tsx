import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { getNearbyAttractions } from '@/services/destinationService';
import { Destination } from '@/types';
import DestinationListItem from '@/components/DestinationListItem';
import { ArrowLeft, MapPin, AlertCircle } from 'lucide-react-native';
import { colors, spacing, typography, shadows, borderRadius } from '@/constants/theme';
import Card from '@/components/Card';
import Skeleton from '@/components/Skeleton';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

export default function NearbyScreen() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userLocation, setUserLocation] = useState<LocationCoords | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const loadNearbyPlaces = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) setLoading(true);
      setError(null);

      console.log('Requesting location permissions...');
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log('Location permission status:', status);

      if (status !== 'granted') {
        setError('Location permission is required to find nearby places');
        setLoading(false);
        setRefreshing(false);
        return;
      }

      console.log('Getting current position...');
      const location = await Location.getCurrentPositionAsync({});
      console.log('Current position:', location.coords);

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      console.log('Fetching nearby attractions...');
      const nearby = await getNearbyAttractions(
        location.coords.latitude,
        location.coords.longitude
      );
      console.log('Nearby attractions found:', nearby.length);
      setDestinations(nearby);
    } catch (error) {
      console.error('Error in loadNearbyPlaces:', error);
      setError('Failed to load nearby places. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadNearbyPlaces(true);
  }, []);

  useEffect(() => {
    loadNearbyPlaces();
  }, []);

  const calculateDistance = (dest: Destination): string => {
    if (!userLocation) return '';

    const R = 6371;
    const dLat = toRad(dest.coordinates.latitude - userLocation.latitude);
    const dLon = toRad(dest.coordinates.longitude - userLocation.longitude);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(userLocation.latitude)) *
      Math.cos(toRad(dest.coordinates.latitude)) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance < 1 ?
      `${(distance * 1000).toFixed(0)}m away` :
      `${distance.toFixed(1)}km away`;
  };

  const toRad = (degrees: number): number => {
    return degrees * (Math.PI / 180);
  };

  const renderLoadingSkeleton = () => (
    <View style={styles.skeletonContainer}>
      {[1, 2, 3].map((key) => (
        <View key={key} style={styles.skeletonItem}>
          <Skeleton width={120} height={120} borderRadius={borderRadius.lg} />
          <View style={styles.skeletonContent}>
            <Skeleton width={200} height={20} style={{ marginBottom: 8 }} />
            <Skeleton width={150} height={16} />
          </View>
        </View>
      ))}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={colors.gray[800]} />
          </TouchableOpacity>
          <Text style={styles.title}>Nearby Places</Text>
          <View style={{ width: 24 }} />
        </View>
        {renderLoadingSkeleton()}
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.gray[800]} />
        </TouchableOpacity>
        <Text style={styles.title}>Nearby Places</Text>
        <View style={{ width: 24 }} />
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <AlertCircle size={48} color={colors.error.main} style={{ marginBottom: spacing.md }} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => loadNearbyPlaces()}>
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Card style={styles.statsCard}>
            <MapPin size={20} color={colors.primary[600]} />
            <Text style={styles.statsText}>
              Found {destinations.length} places near you
            </Text>
          </Card>

          <FlatList
            data={destinations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card style={styles.destinationCard} onPress={() => router.push(`/destination/${item.id}`)}>
                <DestinationListItem destination={item} />
                <Text style={styles.distanceText}>{calculateDistance(item)}</Text>
              </Card>
            )}
            contentContainerStyle={styles.list}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={colors.primary[600]}
                colors={[colors.primary[600]]}
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No nearby places found</Text>
                <Text style={styles.emptySubtext}>Try expanding your search area</Text>
              </View>
            }
          />
        </>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: 60,
    paddingBottom: spacing.md,
    backgroundColor: colors.gray[50],
    ...shadows.sm,
  },
  backButton: {
    padding: spacing.sm,
    marginLeft: -spacing.sm,
  },
  title: {
    ...typography.h3,
    color: colors.gray[800],
  },
  statsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.primary[50],
  },
  statsText: {
    ...typography.subtitle2,
    color: colors.primary[600],
    marginLeft: spacing.sm,
  },
  list: {
    padding: spacing.md,
  },
  destinationCard: {
    marginBottom: spacing.md,
  },
  distanceText: {
    ...typography.caption,
    color: colors.primary[600],
    textAlign: 'right',
    marginTop: spacing.xs,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  errorText: {
    ...typography.subtitle1,
    color: colors.error.main,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  retryButton: {
    backgroundColor: colors.primary[600],
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  retryText: {
    color: colors.gray[50],
    ...typography.button,
  },
  emptyContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.subtitle1,
    color: colors.gray[500],
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    ...typography.caption,
    color: colors.gray[400],
  },
  skeletonContainer: {
    padding: spacing.md,
  },
  skeletonItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  skeletonContent: {
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
});
