import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Platform,
  Animated,
  Easing,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { getNearbyAttractions } from '@/services/destinationService';
import { Destination } from '@/types';
import { MapPin, AlertCircle, Compass, Frown, ArrowLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ACCENT_COLOR = '#FF6F61'; // Vibrant coral-orange for accent
const BG_GRADIENT_START = '#4c669f';
const BG_GRADIENT_END = '#3b5998';

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

  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    loadNearbyPlaces();
  }, []);

  useEffect(() => {
    if (!loading) {
      // Animate cards fade in
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }).start();
    }
  }, [loading]);

  const loadNearbyPlaces = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) setLoading(true);
      setError(null);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location access required to find nearby places');
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const nearby = await getNearbyAttractions(location.coords.latitude, location.coords.longitude);
      setDestinations(nearby);
    } catch {
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

  const toRad = (deg: number) => deg * (Math.PI / 180);

  const calculateDistance = (dest: Destination) => {
    if (!userLocation) return 'Calculating...';
    const R = 6371; // km
    const dLat = toRad(dest.coordinates.latitude - userLocation.latitude);
    const dLon = toRad(dest.coordinates.longitude - userLocation.longitude);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(userLocation.latitude)) *
        Math.cos(toRad(dest.coordinates.latitude)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance < 1
      ? `${(distance * 1000).toFixed(0)} m away`
      : `${distance.toFixed(1)} km away`;
  };

  const renderDestination = ({ item, index }: { item: Destination; index: number }) => {
    // Animate each card with slight stagger
    const translateY = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [20 + index * 10, 0],
    });
    const opacity = fadeAnim;

    return (
      <Animated.View
        style={[
          styles.card,
          { borderLeftColor: ACCENT_COLOR, opacity, transform: [{ translateY }] },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push(`/destination/${item.id}`)}
          style={styles.cardTouchable}
        >
          <View style={styles.cardContent}>
            <Text style={styles.title}>{item.name}</Text>
            <View style={styles.locationRow}>
              <MapPin size={16} color="#64748B" />
              <Text style={styles.locationText}>{item.location || 'Unknown location'}</Text>
            </View>
            <Text style={styles.distanceText}>{calculateDistance(item)}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <LinearGradient
      colors={[BG_GRADIENT_START, BG_GRADIENT_END]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Discover Nearby</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.subHeader}>Explore places around your current location</Text>

      {error ? (
        <View style={styles.errorContainer}>
          <AlertCircle size={48} color="#FF6F61" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            onPress={() => loadNearbyPlaces()}
            style={styles.retryButton}
            activeOpacity={0.8}
          >
            <Compass size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.retryText}>Refresh Locations</Text>
          </TouchableOpacity>
        </View>
      ) : loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading nearby places...</Text>
        </View>
      ) : (
        <FlatList
          data={destinations}
          keyExtractor={(item) => item.id}
          renderItem={renderDestination}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#FF6F61"
              colors={['#FF6F61']}
            />
          }
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Frown size={48} color="#FF9A8B" />
              <Text style={styles.emptyText}>No places found nearby</Text>
              <Text style={styles.emptySubText}>
                Try again later or explore other areas
              </Text>
            </View>
          }
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 24 : 70,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,111,97,0.3)',
    shadowColor: '#FF6F61',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,111,97,0.7)',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
  subHeader: {
    fontSize: 16,
    color: '#FFD8D0',
    textAlign: 'center',
    marginHorizontal: 40,
    marginTop: 8,
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderLeftWidth: 6,
    shadowColor: '#FF6F61',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 6,
  },
  cardTouchable: {
    flex: 1,
  },
  cardContent: {},
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C2C2C',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748B',
    fontFamily: 'Poppins-Regular',
  },
  distanceText: {
    fontSize: 14,
    fontWeight: '600',
    color: ACCENT_COLOR,
    fontFamily: 'Poppins-Medium',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 18,
    color: '#FF6F61',
    fontWeight: '700',
    marginTop: 12,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  retryButton: {
    marginTop: 24,
    backgroundColor: ACCENT_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 24,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Poppins-SemiBold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#FFD8D0',
    fontFamily: 'Poppins-Medium',
  },
  emptyContainer: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF9A8B',
    marginTop: 12,
    fontFamily: 'Poppins-SemiBold',
  },
  emptySubText: {
    marginTop: 4,
    fontSize: 14,
    color: '#FF9A8B',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },
});
