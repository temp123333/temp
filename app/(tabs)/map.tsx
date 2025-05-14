import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocalSearchParams } from 'expo-router';
import * as Location from 'expo-location';
import { getAllDestinations } from '@/services/destinationService';
import { Destination } from '@/types';
import { MapPin } from 'lucide-react-native';

export default function MapScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState({
    latitude: 27.6289,
    longitude: 85.2374,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const destinationsData = await getAllDestinations();
        
        if (id) {
          const selected = destinationsData.find(d => d.id === id);
          if (selected) {
            setSelectedDestination(selected);
            setDestinations([selected]);
            setRegion({
              latitude: selected.coordinates.latitude,
              longitude: selected.coordinates.longitude,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            });
          }
        } else {
          setDestinations(destinationsData);
          // Get user location
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({});
            setRegion({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const handleMarkerPress = (destination: Destination) => {
    setSelectedDestination(destination);
    mapRef.current?.animateToRegion({
      latitude: destination.coordinates.latitude,
      longitude: destination.coordinates.longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {destinations.map(destination => (
          <Marker
            key={destination.id}
            coordinate={{
              latitude: destination.coordinates.latitude,
              longitude: destination.coordinates.longitude,
            }}
            onPress={() => handleMarkerPress(destination)}
          >
            <View style={styles.markerContainer}>
              <MapPin size={24} color="#1E40AF" />
            </View>
          </Marker>
        ))}
      </MapView>
      
      {selectedDestination && (
        <View style={styles.destinationCard}>
          <Text style={styles.destinationName}>{selectedDestination.name}</Text>
          <Text style={styles.destinationRegion}>{selectedDestination.region}, Nepal</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {selectedDestination.rating}</Text>
            <Text style={styles.duration}>{selectedDestination.duration}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748B',
    fontFamily: 'Poppins-Medium',
  },
  markerContainer: {
    padding: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  destinationCard: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  destinationName: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#1E293B',
    marginBottom: 4,
  },
  destinationRegion: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#64748B',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#1E293B',
  },
  duration: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#64748B',
  },
});