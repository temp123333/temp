import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { useLocalSearchParams, router } from 'expo-router';
import * as Location from 'expo-location';
import { getAllDestinations } from '@/services/destinationService';
import { Destination } from '@/types';
import { MapPin, Navigation } from 'lucide-react-native';

export default function MapScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user location first
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Location permission is required to show the route');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        });

        const destinationsData = await getAllDestinations();
        
        if (id) {
          const selected = destinationsData.find(d => d.id === id);
          if (selected) {
            setSelectedDestination(selected);
            setDestinations([selected]);

            // Fetch route between user location and destination
            try {
              const response = await fetch(
                `https://router.project-osrm.org/route/v1/driving/${location.coords.longitude},${location.coords.latitude};${selected.coordinates.longitude},${selected.coordinates.latitude}?overview=full&geometries=geojson`
              );
              const data = await response.json();
              
              if (data.routes && data.routes[0]) {
                const coordinates = data.routes[0].geometry.coordinates.map((coord: number[]) => ({
                  latitude: coord[1],
                  longitude: coord[0]
                }));
                setRouteCoordinates(coordinates);

                // Animate to show both user location and destination with route
                mapRef.current?.fitToCoordinates(
                  [
                    { latitude: location.coords.latitude, longitude: location.coords.longitude },
                    selected.coordinates
                  ],
                  {
                    edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                    animated: true
                  }
                );
              }
            } catch (routeError) {
              console.error('Error fetching route:', routeError);
              setError('Failed to load route. Please try again.');
            }
          }
        } else {
          setDestinations(destinationsData);
          // Center map on user location
          mapRef.current?.animateToRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load map data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);

  const openInMaps = () => {
    if (!selectedDestination || !userLocation) return;

    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${selectedDestination.coordinates.latitude},${selectedDestination.coordinates.longitude}`;
    const label = selectedDestination.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });

    Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => router.back()}>
          <Text style={styles.retryText}>Go Back</Text>
        </TouchableOpacity>
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
            <View style={styles.distanceContainer}>
              <Text style={styles.distance}>
                Distance: {calculateDistance(
                  userLocation.latitude,
                  userLocation.longitude,
                  selectedDestination.coordinates.latitude,
                  selectedDestination.coordinates.longitude
                ).toFixed(1)} km
              </Text>
              <TouchableOpacity style={styles.navigateButton} onPress={openInMaps}>
                <Navigation size={20} color="#FFFFFF" />
                <Text style={styles.navigateText}>Navigate</Text>
              </TouchableOpacity>
            </View>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F8FAFC',
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
  distanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  distance: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#1E40AF',
  },
  navigateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E40AF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  navigateText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});