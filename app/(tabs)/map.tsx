import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';
import { router } from 'expo-router';
import { Locate, Layers, Info, ChevronDown, ChevronUp } from 'lucide-react-native';
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
    .custom-marker { background-color: white; padding: 8px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
    .marker-title { font-weight: bold; font-size: 14px; margin-bottom: 4px; }
    .marker-info { font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    const locations = [];
    let activeInfoWindow = null;

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
        
        const contentString = 
          '<div class="custom-marker">' +
          '<div class="marker-title">' + marker.name + '</div>' +
          '<div class="marker-info">' + marker.category + '</div>' +
          '<div class="marker-info">' + marker.duration + ' | ' + marker.rating + '⭐</div>' +
          '</div>';

        const infowindow = new google.maps.InfoWindow({
          content: contentString,
          maxWidth: 200
        });

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
          if (activeInfoWindow) {
            activeInfoWindow.close();
          }
          infowindow.open(map, mapMarker);
          activeInfoWindow = infowindow;
          
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'MARKER_CLICK',
            id: marker.id
          }));
        });

        map.addListener('click', () => {
          if (activeInfoWindow) {
            activeInfoWindow.close();
          }
        });
      });
    }

    window.onerror = function(message, source, lineno, colno, error) {
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'ERROR', message }));
    };
  </script>
  <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap"></script>
</body>
</html>
`;

export default function MapScreen() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLegend, setShowLegend] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
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
        category: dest.category,
        duration: dest.duration,
        rating: dest.rating,
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
    const destination = destinations.find(d => d.id === id);
    setSelectedDestination(destination || null);
    setShowDetails(true);
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

      {selectedDestination && (
        <View style={[styles.detailsContainer, !showDetails && styles.detailsCollapsed]}>
          <TouchableOpacity 
            style={styles.detailsHeader} 
            onPress={() => setShowDetails(!showDetails)}
          >
            <View>
              <Text style={styles.detailsTitle}>{selectedDestination.name}</Text>
              <Text style={styles.detailsSubtitle}>{selectedDestination.region}</Text>
            </View>
            {showDetails ? (
              <ChevronDown size={24} color="#1E293B" />
            ) : (
              <ChevronUp size={24} color="#1E293B" />
            )}
          </TouchableOpacity>
          
          {showDetails && (
            <ScrollView style={styles.detailsContent}>
              <Text style={styles.detailsDescription}>
                {selectedDestination.description}
              </Text>
              
              <View style={styles.detailsSection}>
                <Text style={styles.sectionTitle}>How to Get There</Text>
                <Text style={styles.sectionText}>
                  {selectedDestination.howToGetThere}
                </Text>
              </View>
              
              <View style={styles.detailsSection}>
                <Text style={styles.sectionTitle}>Best Time to Visit</Text>
                <Text style={styles.sectionText}>
                  {selectedDestination.bestTimeToVisit}
                </Text>
              </View>
              
              <TouchableOpacity 
                style={styles.viewMoreButton}
                onPress={() => router.push(`/destination/${selectedDestination.id}`)}
              >
                <Text style={styles.viewMoreButtonText}>View Full Details</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      )}
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
  detailsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '60%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  detailsCollapsed: {
    maxHeight: 80,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
  },
  detailsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E293B',
  },
  detailsSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  detailsContent: {
    marginTop: 8,
  },
  detailsDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
    marginBottom: 16,
  },
  detailsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 8,
  },
  sectionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
  viewMoreButton: {
    backgroundColor: '#1E40AF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  viewMoreButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#ffffff',
  },
});