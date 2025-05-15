import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, TouchableOpacity, Animated, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { getNearbyAttractions } from '@/services/destinationService';
import { Destination } from '@/types';
import DestinationListItem from '@/components/DestinationListItem';
import { ArrowLeft, MapPin, AlertCircle, Compass, Frown } from 'lucide-react-native';
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
  const headerScrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const headerOpacity = headerScrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const loadNearbyPlaces = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) setLoading(true);
      setError(null);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location access required to find nearby places');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      const nearby = await getNearbyAttractions(
        location.coords.latitude,
        location.coords.longitude
      );
      setDestinations(nearby);
    } catch (error) {
      console.error('Error loading nearby places:', error);
      setError('Failed to load nearby places');
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
    if (!userLocation) return 'Calculating...';

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
      {[1, 2, 3, 4].map((key) => (
        <Card key={key} style={styles.skeletonCard}>
          <View style={styles.skeletonContent}>
            <Skeleton width={80} height={80} borderRadius={borderRadius.lg} />
            <View style={styles.skeletonTextContainer}>
              <Skeleton width={180} height={18} style={{ marginBottom: 8 }} />
              <Skeleton width={140} height={14} style={{ marginBottom: 6 }} />
              <Skeleton width={100} height={14} />
            </View>
          </View>
        </Card>
      ))}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
            activeOpacity={0.8}
          >
            <ArrowLeft size={24} color={colors.gray[800]} />
          </TouchableOpacity>
          <Text style={styles.title}>Discover Nearby</Text>
          <View style={{ width: 24 }} />
        </View>
        {renderLoadingSkeleton()}
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <StatusBar barStyle="dark-content" />
      
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
          activeOpacity={0.8}
        >
          <ArrowLeft size={24} color={colors.gray[800]} />
        </TouchableOpacity>
        <Text style={styles.title}>Discover Nearby</Text>
        <View style={{ width: 24 }} />
      </Animated.View>

      {error ? (
        <View style={styles.errorContainer}>
          <AlertCircle size={48} color={colors.error.main} style={styles.errorIcon} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={() => loadNearbyPlaces()}
            activeOpacity={0.8}
          >
            <Compass size={18} color={colors.white} style={{ marginRight: 8 }} />
            <Text style={styles.retryText}>Refresh Locations</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Animated.View style={[styles.statsContainer, { 
            transform: [{
              translateY: headerScrollY.interpolate({
                inputRange: [0, 100],
                outputRange: [0, -50],
                extrapolate: 'clamp'
              })
            }]
          }]}>
            <Card style={styles.statsCard}>
              <View style={styles.statsContent}>
                <View style={styles.locationPin}>
                  <MapPin size={20} color={colors.white} />
                </View>
                <Text style={styles.statsText}>
                  {destinations.length} places near you
                </Text>
              </View>
            </Card>
          </Animated.View>

          <FlatList
            data={destinations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card 
                style={styles.destinationCard} 
                onPress={() => router.push(`/destination/${item.id}`)}
              >
                <DestinationListItem destination={item} />
                <View style={styles.distanceBadge}>
                  <Text style={styles.distanceText}>{calculateDistance(item)}</Text>
                </View>
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
                <Frown size={48} color={colors.gray[400]} style={styles.emptyIcon} />
                <Text style={styles.emptyText}>No places found nearby</Text>
                <Text style={styles.emptySubtext}>Try again later or explore other areas</Text>
              </View>
            }
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: headerScrollY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 16 : 60,
    paddingBottom: spacing.lg,
    backgroundColor: colors.gray[50],
  },
  backButton: {
    padding: spacing.xs,
    borderRadius: borderRadius.full,
    backgroundColor: colors.gray[100],
  },
  title: {
    ...typography.h4,
    fontWeight: '700',
    color: colors.gray[900],
  },
  statsContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    zIndex: 5,
    paddingHorizontal: spacing.lg,
  },
  statsCard: {
    backgroundColor: colors.primary[600],
    borderRadius: borderRadius.xl,
    padding: spacing.md,
  },
  statsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationPin: {
    backgroundColor: colors.primary[700],
    padding: spacing.xs,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
  },
  statsText: {
    ...typography.subtitle2,
    color: colors.white,
    fontWeight: '600',
  },
  list: {
    paddingTop: 160,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  destinationCard: {
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray[200],
    position: 'relative',
  },
  distanceBadge: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    backgroundColor: colors.primary[50],
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.primary[100],
  },
  distanceText: {
    ...typography.caption,
    color: colors.primary[700],
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  errorIcon: {
    marginBottom: spacing.lg,
  },
  errorText: {
    ...typography.h5,
    color: colors.gray[800],
    textAlign: 'center',
    marginBottom: spacing.md,
    fontWeight: '600',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[600],
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
  },
  retryText: {
    color: colors.white,
    ...typography.button,
    fontWeight: '600',
  },
  emptyContainer: {
    marginTop: 80,
    alignItems: 'center',
  },
  emptyIcon: {
    marginBottom: spacing.lg,
    opacity: 0.6,
  },
  emptyText: {
    ...typography.h6,
    color: colors.gray[600],
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  emptySubtext: {
    ...typography.caption,
    color: colors.gray[400],
  },
  skeletonContainer: {
    paddingTop: 120,
    paddingHorizontal: spacing.lg,
  },
  skeletonCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  skeletonContent: {
    flexDirection: 'row',
  },
  skeletonTextContainer: {
    marginLeft: spacing.md,
    justifyContent: 'center',
    flex: 1,
  },
});