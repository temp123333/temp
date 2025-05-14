import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet, Dimensions } from 'react-native';
import { getAllDestinations } from '@/services/destinationService';
import { useEffect, useState } from 'react';
import { Destination } from '@/types';

const MapScreen = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    getAllDestinations().then(setDestinations);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 27.7,
          longitude: 85.3,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2
        }}
      >
        {destinations.map((dest) => (
          <Marker
            key={dest.id}
            coordinate={dest.coordinates}
            title={dest.name}
            description={dest.region}
          />
        ))}
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});
