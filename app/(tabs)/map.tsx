import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRouter } from 'expo-router';
import { getAllDestinations } from '@/services/destinationService';
import { Destination } from '@/types';

export default function MapScreen() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState({
    latitude: 27.6289,
    longitude: 85.2374,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  });
  const router = useRouter();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const destinationsData = await getAllDestinations();
        setDestinations(destinationsData);
        
        // Adjust the map region to show all markers if there are destinations
        if (destinationsData.length > 0) {
          const coordinates = destinationsData.map(d => d.coordinates);
          const minLat = Math.min(...coordinates.map(c => c.latitude));
          const maxLat = Math.max(...coordinates.map(c => c.latitude));
          const minLng = Math.min(...coordinates.map(c => c.longitude));
          const maxLng = Math.max(...coordinates.map(c => c.longitude));
          
          setRegion({
            latitude: (minLat + maxLat) / 2,
            longitude: (minLng + maxLng) / 2,
            latitudeDelta: (maxLat - minLat) * 1.5, // Add some padding
            longitudeDelta: (maxLng - minLng) * 1.5,
          });
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDestinations();
  }, []);

  const handleMarkerPress = (destinationId: string) => {
    router.push(`/destination/${destinationId}`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text>Loading destinations...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        region={region}
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
            title={destination.name}
            description={destination.region}
            onPress={() => handleMarkerPress(destination.id)}
          />
        ))}
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {destinations.length} destinations found. Tap on a marker for details.
        </Text>
      </View>
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
    gap: 10,
  },
  footer: {
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#555',
  },
});