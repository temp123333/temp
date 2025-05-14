import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
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
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<any[]>([]);
  const mapRef = useRef<MapView>(null);

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
            
            // Get user location
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
              const location = await Location.getCurrentPositionAsync({});
              setUserLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              });

              // Fetch route between user location and destination
              const response = await fetch(
                `https://router.project-osrm.org/route/v1/driving/${location.coords.longitude},${location.coords.latitude};${selected.coordinates.longitude},${selected.coordinates.latitude}?overview=full&geometries=geojson`
              );
              const data = await response.json();
              if (data.routes && data.routes[0]) {
                setRouteCoordinates(
                  data.routes[0].geometry.coordinates.map((coord: number[]) => ({
                    latitude: coord[1],
                    longitude: coord[0]
                  }))
                );
              }

              // Animate to show both user location and destination
              mapRef.current?.fitToCoordinates(
                [
                  { latitude: location.coords.latitude, longitude: location.coords.longitude },
                  selected.coordinates
                ],
                {
                  edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                  animated: true
                }
              );
            }
          }
        } else {
          setDestinations(destinationsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

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
        initialRegion={{
          latitude: selectedDestination?.coordinates.latitude || 27.7172,
          longitude: selectedDestination?.coordinates.longitude || 85.3240,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsScale={true}
        showsTraffic={true}
        mapType="terrain"
      >
        {destinations.map(destination => (
          <Marker
            key={destination.id}
            coordinate={destination.coordinates}
            title={destination.name}
            description={destination.region}
          >
            <View style={styles.markerContainer}>
              <MapPin size={24} color="#1E40AF" />
            </View>
          </Marker>
        ))}

        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="#1E40AF"
            strokeWidth={3}
            lineDashPattern={[1]}
          />
        )}
      </MapView>
      
      {selectedDestination && (
        <View style={styles.destinationCard}>
          <Text style={styles.destinationName}>{selectedDestination.name}</Text>
          <Text style={styles.destinationRegion}>{selectedDestination.region}, Nepal</Text>
          {userLocation && (
            <Text style={styles.distance}>
              Distance: {calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                selectedDestination.coordinates.latitude,
                selectedDestination.coordinates.longitude
              ).toFixed(1)} km
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
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
  distance: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#1E40AF',
  },
});