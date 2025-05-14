import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { getNearbyAttractions } from '@/services/destinationService';
import { Destination } from '@/types';
import DestinationListItem from '@/components/DestinationListItem';
import { ArrowLeft, MapPin } from 'lucide-react-native';

interface LocationCoords {
  latitude: number;
  longitude: number;
}

export default function NearbyScreen() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<LocationCoords | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    loadNearbyPlaces();
  }, []);

  const loadNearbyPlaces = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission is required to find nearby places');
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
      setError('Failed to load nearby places. Please try again.');
      console.error('Error loading nearby places:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (dest: Destination): string => {
    if (!userLocation) return '';
    
    const R = 6371; // Earth's radius in km
    const dLat = toRad(dest.coordinates.latitude - userLocation.latitude);
    const dLon = toRad(dest.coordinates.longitude - userLocation.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(userLocation.latitude)) *
      Math.cos(toRad(dest.coordinates.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    
    return distance < 1 ? 
      `${(distance * 1000).toFixed(0)}m away` : 
      `${distance.toFixed(1)}km away`;
  };

  const toRad = (degrees: number): number => {
    return degrees * (Math.PI / 180);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E40AF" />
        <Text style={styles.loadingText}>Finding nearby places...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.title}>Nearby Places</Text>
        <View style={{ width: 24 }} />
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadNearbyPlaces}>
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.statsContainer}>
            <MapPin size={20} color="#1E40AF" />
            <Text style={styles.statsText}>
              Found {destinations.length} places near you
            </Text>
          </View>

          <FlatList
            data={destinations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.destinationContainer}>
                <DestinationListItem destination={item} />
                <Text style={styles.distanceText}>{calculateDistance(item)}</Text>
              </View>
            )}
            contentContainerStyle={styles.list}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No nearby places found</Text>
                <Text style={styles.emptySubtext}>Try expanding your search area</Text>
              </View>
            }
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#64748B',
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#1E293B',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#EFF6FF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
  },
  statsText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1E40AF',
    marginLeft: 8,
  },
  list: {
    padding: 16,
  },
  destinationContainer: {
    marginBottom: 16,
  },
  distanceText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#1E40AF',
    textAlign: 'right',
    marginTop: 4,
    marginRight: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 8,
  },
  emptySubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
});