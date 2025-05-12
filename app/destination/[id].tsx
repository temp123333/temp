import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, MapPin, Star, Clock, Banknote, Bookmark, CirclePlay as PlayCircle, ChevronDown, ChevronUp, Map } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getDestinationById } from '@/services/destinationService';
import { useFavorites } from '@/context/FavoritesContext';
import { Destination } from '@/types';
import ImageGallery from '@/components/ImageGallery';
import AudioPlayer from '@/components/AudioPlayer';

const { width } = Dimensions.get('window');

export default function DestinationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  
  const isFavorite = favorites.includes(id);

  useEffect(() => {
    const loadDestination = async () => {
      try {
        setIsLoading(true);
        const data = await getDestinationById(id);
        setDestination(data);
      } catch (error) {
        console.error('Failed to load destination:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadDestination();
    }
  }, [id]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const toggleAudioPlayer = () => {
    setShowAudioPlayer(!showAudioPlayer);
  };

  const viewOnMap = () => {
    if (destination) {
      router.push({
        pathname: '/(tabs)/map',
        params: {
          lat: destination.coordinates.latitude,
          lng: destination.coordinates.longitude,
          zoom: 12
        }
      });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E40AF" />
        <Text style={styles.loadingText}>Loading destination details...</Text>
      </View>
    );
  }

  if (!destination) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Destination not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: destination.images[0] }}
            style={styles.headerImage}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent']}
            style={styles.headerGradient}
          />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
            onPress={toggleFavorite}
          >
            <Bookmark size={24} color={isFavorite ? "#FFFFFF" : "#FFFFFF"} />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.titleSection}>
            <Text style={styles.title}>{destination.name}</Text>
            <View style={styles.locationRow}>
              <MapPin size={16} color="#64748B" />
              <Text style={styles.location}>{destination.region}, Nepal</Text>
              <TouchableOpacity style={styles.mapButton} onPress={viewOnMap}>
                <Map size={16} color="#1E40AF" />
                <Text style={styles.mapButtonText}>View on Map</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Star size={16} color="#F59E0B" />
              <Text style={styles.statValue}>{destination.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Clock size={16} color="#1E40AF" />
              <Text style={styles.statValue}>{destination.duration}</Text>
              <Text style={styles.statLabel}>Duration</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Banknote size={16} color="#047857" />
              <Text style={styles.statValue}>{destination.price}</Text>
              <Text style={styles.statLabel}>Avg Cost</Text>
            </View>
          </View>

          {destination.audioGuide && (
            <TouchableOpacity 
              style={styles.audioGuideButton}
              onPress={toggleAudioPlayer}
            >
              <PlayCircle size={24} color="#FFFFFF" />
              <Text style={styles.audioGuideText}>Listen to Audio Guide</Text>
            </TouchableOpacity>
          )}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description} numberOfLines={showFullDescription ? undefined : 5}>
              {destination.description}
            </Text>
            <TouchableOpacity style={styles.readMoreButton} onPress={toggleDescription}>
              <Text style={styles.readMoreText}>
                {showFullDescription ? 'Read Less' : 'Read More'}
              </Text>
              {showFullDescription ? (
                <ChevronUp size={16} color="#1E40AF" />
              ) : (
                <ChevronDown size={16} color="#1E40AF" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gallery</Text>
            <ImageGallery images={destination.images} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How to Get There</Text>
            <Text style={styles.infoText}>{destination.howToGetThere}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Best Time to Visit</Text>
            <Text style={styles.infoText}>{destination.bestTimeToVisit}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Facilities</Text>
            <View style={styles.facilitiesContainer}>
              {destination.facilities.map((facility, index) => (
                <View key={index} style={styles.facilityItem}>
                  <Text style={styles.facilityText}>{facility}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.spacer} />
        </View>
      </ScrollView>

      {showAudioPlayer && (
        <AudioPlayer 
          title={destination.name}
          audioUrl={destination.audioGuide || ''}
          onClose={toggleAudioPlayer}
        />
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#EF4444',
    marginBottom: 16,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 100,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    top: 48,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: '#B91C1C',
  },
  backButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1E40AF',
  },
  contentContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#F8FAFC',
    marginTop: -24,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  titleSection: {
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1E293B',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
    marginLeft: 4,
    flex: 1,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  mapButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#1E40AF',
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginTop: 4,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 8,
  },
  audioGuideButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B91C1C',
    borderRadius: 8,
    paddingVertical: 12,
    marginBottom: 16,
  },
  audioGuideText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 12,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  readMoreText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1E40AF',
    marginRight: 4,
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#334155',
  },
  facilitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  facilityItem: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  facilityText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1E40AF',
  },
  spacer: {
    height: 40,
  },
});