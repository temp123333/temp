import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { router } from 'expo-router';
import { Locate, Layers, Info } from 'lucide-react-native';
import { getAllDestinations } from '@/services/destinationService';
import MapLegend from '@/components/MapLegend';
import { Destination } from '@/types';

const HTML_MAP = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <style>
    body, html, #map { height: 100%; margin: 0; padding: 0; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    const locations = [];

    function initMap() {
      const nepal = { lat: 28.3949, lng: 84.124 };
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: nepal,
        mapTypeId: 'terrain',
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'MAP_READY' }));

      window.addEventListener('message', function(event) {
        const data = JSON.parse(event.data);
        if (data.type === 'ADD_MARKERS') {
          addMarkers(map, data.markers);
        } else if (data.type === 'CENTER_MAP') {
          map.setCenter({ lat: data.lat, lng: data.lng });
          map.setZoom(data.zoom || 10);
        }
      });
    }

    function addMarkers(map, markers) {
      markers.forEach(marker => {
        const position = { lat: marker.latitude, lng: marker.longitude };
        const mapMarker = new google.maps.Marker({
          position,
          map,
          title: marker.name,
          icon: {
            url: marker.icon,
            scaledSize: new google.maps.Size(32, 32)
          }
        });

        mapMarker.addListener('click', () => {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'MARKER_CLICK',
            id: marker.id
          }));
        });
      });
    }

    window.onerror = function(message, source, lineno, colno, error) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'ERROR', message }));
    };
  </script>
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDxnn3wxLYRlouBsQ4N_jsMCIJ8Gxa4rc&callback=initMap"></script>
</body>
</html>
`;

export default function MapScreen() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLegend, setShowLegend] = useState(false);
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const destinationsData = await getAllDestinations();
        setDestinations(destinationsData);
      } catch (error) {
        console.error('Failed to load destinations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      switch (data.type) {
        case 'MAP_READY':
          addMarkersToMap();
          break;
        case 'MARKER_CLICK':
          handleMarkerClick(data.id);
          break;
      }
    } catch (error) {
      console.error('Error processing map message:', error);
    }
  };

  const addMarkersToMap = () => {
    if (destinations.length > 0 && webViewRef.current) {
      const markers = destinations.map(dest => ({
        id: dest.id,
        name: dest.name,
        latitude: dest.coordinates.latitude,
        longitude: dest.coordinates.longitude,
        icon: getIconForCategory(dest.category)
      }));

      webViewRef.current.postMessage(JSON.stringify({
        type: 'ADD_MARKERS',
        markers
      }));
    }
  };

  const handleMarkerClick = (id: string) => {
    router.push(`/destination/${id}`);
  };

  const centerMapOnUserLocation = () => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(JSON.stringify({
        type: 'CENTER_MAP',
        lat: 27.7172,
        lng: 85.3240,
        zoom: 12
      }));
    }
  };

  const getIconForCategory = (category: string) => {
    switch (category) {
      case 'trekking':
        return 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
      case 'cultural':
        return 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
      case 'nature':
        return 'https://maps.google.com/mapfiles/ms/icons/pink-dot.png';
      case 'adventure':
        return 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
      default:
        return 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E40AF" />
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <WebView
          ref={webViewRef}
          originWhitelist={['*']}
          source={{ html: HTML_MAP }}
          onMessage={handleMessage}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.webviewLoading}>
              <ActivityIndicator size="large" color="#1E40AF" />
            </View>
          )}
        />
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={centerMapOnUserLocation}>
          <Locate size={24} color="#1E293B" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => setShowLegend(!showLegend)}>
          <Layers size={24} color="#1E293B" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.controlButton} onPress={() => {}}>
          <Info size={24} color="#1E293B" />
        </TouchableOpacity>
      </View>

      {showLegend && <MapLegend onClose={() => setShowLegend(false)} />}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Nepal</Text>
        <Text style={styles.headerSubtitle}>Discover hidden gems on the map</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  mapContainer: {
    flex: 1,
  },
  webviewLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  header: {
    position: 'absolute',
    top: 48,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#1E293B',
  },
  headerSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  controls: {
    position: 'absolute',
    right: 16,
    top: 160,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  controlButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
});
